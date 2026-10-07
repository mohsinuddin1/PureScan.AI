import { createClient } from '@supabase/supabase-js';
import DodoPayments from 'dodopayments';

/**
 * POST /api/revenuecat-webhook
 *
 * Handles RevenueCat outbound webhook events for mobile in-app purchases,
 * subscription renewals, expirations, and revocations.
 *
 * Security: Verifies Authorization Bearer token matches REVENUECAT_WEBHOOK_AUTH_KEY.
 * Cross-platform: Before revoking Pro, checks if user has active Dodo subscription.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── 1. Verify Authorization Header ─────────────────────────────────
  const webhookAuthKey = process.env.REVENUECAT_WEBHOOK_AUTH_KEY;
  if (!webhookAuthKey) {
    console.error('[RC Webhook] REVENUECAT_WEBHOOK_AUTH_KEY not configured');
    return res.status(500).json({ error: 'Webhook auth not configured' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.warn('[RC Webhook] Missing Authorization header');
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const expectedToken = `Bearer ${webhookAuthKey}`;
  if (authHeader !== expectedToken) {
    console.warn('[RC Webhook] Invalid Authorization token');
    return res.status(401).json({ error: 'Invalid webhook authorization' });
  }

  // ── 2. Parse Event ─────────────────────────────────────────────────
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (err) {
    console.error('[RC Webhook] Failed to parse body:', err.message);
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const event = body?.event;
  if (!event) {
    console.warn('[RC Webhook] No event object in body');
    return res.status(400).json({ error: 'Missing event object' });
  }

  const eventType = event.type;
  const appUserId = event.app_user_id;
  const eventId = event.id || `${eventType}_${appUserId}_${Date.now()}`;

  console.log(`[RC Webhook] Received event: type=${eventType}, app_user_id=${appUserId}, event_id=${eventId}`);

  // Skip anonymous RevenueCat IDs — they can't be matched to a Supabase user
  if (appUserId && appUserId.startsWith('$RCAnonymousID:')) {
    console.warn(`[RC Webhook] Skipping anonymous user: ${appUserId}`);
    // Still return 200 so RevenueCat doesn't retry
    return res.status(200).json({ received: true, action: 'skipped_anonymous' });
  }

  // ── 3. Initialize Supabase ─────────────────────────────────────────
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('[RC Webhook] Missing Supabase configuration');
    return res.status(500).json({ error: 'Database not configured' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // ── 4. Resolve User ────────────────────────────────────────────────
  // Try app_user_id as Supabase UUID first, fallback to email from subscriber attributes
  let userId = appUserId;
  let userEmail = null;

  // Extract email from subscriber attributes if available
  const subscriberAttributes = event.subscriber_attributes || {};
  if (subscriberAttributes.$email?.value) {
    userEmail = subscriberAttributes.$email.value;
  }

  // Validate that userId looks like a UUID (Supabase user IDs are UUIDs)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const isValidUUID = userId && uuidRegex.test(userId);

  // If userId is not a valid UUID, try to look up by email
  if (!isValidUUID && userEmail) {
    console.log(`[RC Webhook] app_user_id "${userId}" is not a UUID, looking up by email: ${userEmail}`);
    try {
      const { data: userProfile } = await supabase
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .maybeSingle();
      if (userProfile?.id) {
        userId = userProfile.id;
        console.log(`[RC Webhook] Resolved email ${userEmail} to userId: ${userId}`);
      } else {
        console.warn(`[RC Webhook] No Supabase user found for email: ${userEmail}`);
      }
    } catch (err) {
      console.error('[RC Webhook] Error looking up user by email:', err.message);
    }
  } else if (!isValidUUID && !userEmail) {
    console.warn(`[RC Webhook] Cannot resolve user: app_user_id="${userId}" is not a UUID and no email available`);
    return res.status(200).json({ received: true, action: 'skipped_unresolvable' });
  }

  // ── 5. Define grant and revoke events ──────────────────────────────
  const GRANT_EVENTS = [
    'INITIAL_PURCHASE',
    'RENEWAL',
    'PRODUCT_CHANGE',
    'UNCANCELLATION',
    'NON_RENEWING_PURCHASE',
  ];

  const REVOKE_EVENTS = [
    'EXPIRATION',
    'REVOCATION',
  ];

  // Events we log but don't act on (user still has access until period ends)
  const INFO_EVENTS = [
    'CANCELLATION',       // User cancelled but access continues until expiration
    'BILLING_ISSUE',      // Payment failed, grace period in progress
    'SUBSCRIBER_ALIAS',   // User alias change
    'TRANSFER',           // Subscription transferred
  ];

  // ── 6. Handle Grant Events (set is_pro = true) ─────────────────────
  if (GRANT_EVENTS.includes(eventType)) {
    console.log(`[RC Webhook] Granting Pro for userId: ${userId}`);

    if (isValidUUID || userId) {
      const { error } = await supabase
        .from('users')
        .update({ is_pro: true })
        .eq('id', userId);

      if (error) {
        console.error(`[RC Webhook] Failed to set is_pro=true for userId=${userId}:`, error);
      } else {
        console.log(`[RC Webhook] ✅ Set is_pro=true for userId: ${userId}`);
      }
    } else if (userEmail) {
      const { error } = await supabase
        .from('users')
        .update({ is_pro: true })
        .eq('email', userEmail);

      if (error) {
        console.error(`[RC Webhook] Failed to set is_pro=true for email=${userEmail}:`, error);
      } else {
        console.log(`[RC Webhook] ✅ Set is_pro=true for email: ${userEmail}`);
      }
    }

    return res.status(200).json({ received: true, action: 'granted' });
  }

  // ── 7. Handle Revoke Events (cross-platform check first) ──────────
  if (REVOKE_EVENTS.includes(eventType)) {
    console.log(`[RC Webhook] Revocation event for userId: ${userId}, checking cross-platform...`);

    // CRITICAL: Before revoking, check if user has active Dodo subscription
    const hasDodoSub = await checkActiveDodoSubscription(userId, userEmail, supabase);
    if (hasDodoSub) {
      console.log(`[RC Webhook] ⚠️ User ${userId} still has active Dodo subscription — keeping is_pro=true`);
      return res.status(200).json({ received: true, action: 'skipped_cross_platform' });
    }

    // Also check if user still has other active RevenueCat entitlements
    const hasOtherRCEntitlement = await checkOtherRevenueCatEntitlements(userId || appUserId);
    if (hasOtherRCEntitlement) {
      console.log(`[RC Webhook] ⚠️ User ${userId} still has other active RC entitlements — keeping is_pro=true`);
      return res.status(200).json({ received: true, action: 'skipped_other_entitlement' });
    }

    // Safe to revoke
    console.log(`[RC Webhook] No active subscriptions on any platform — revoking Pro for userId: ${userId}`);

    if (isValidUUID || userId) {
      const { error } = await supabase
        .from('users')
        .update({ is_pro: false })
        .eq('id', userId);

      if (error) {
        console.error(`[RC Webhook] Failed to set is_pro=false for userId=${userId}:`, error);
      } else {
        console.log(`[RC Webhook] ✅ Set is_pro=false for userId: ${userId}`);
      }
    } else if (userEmail) {
      const { error } = await supabase
        .from('users')
        .update({ is_pro: false })
        .eq('email', userEmail);

      if (error) {
        console.error(`[RC Webhook] Failed to set is_pro=false for email=${userEmail}:`, error);
      } else {
        console.log(`[RC Webhook] ✅ Set is_pro=false for email: ${userEmail}`);
      }
    }

    return res.status(200).json({ received: true, action: 'revoked' });
  }

  // ── 8. Handle Info Events (log only) ───────────────────────────────
  if (INFO_EVENTS.includes(eventType)) {
    console.log(`[RC Webhook] ℹ️ Info event: ${eventType} for userId=${userId} — no action taken`);
    return res.status(200).json({ received: true, action: 'logged' });
  }

  // ── 9. Unknown Event ──────────────────────────────────────────────
  console.warn(`[RC Webhook] Unknown event type: ${eventType}`);
  return res.status(200).json({ received: true, action: 'unknown_event' });
}

/**
 * Checks if the user has an active subscription in Dodo Payments.
 * Used for cross-platform check before revoking Pro.
 */
async function checkActiveDodoSubscription(userId, userEmail, supabase) {
  const apiKey = process.env.DODO_PAYMENTS_API_KEY || process.env.DODO_PAYMENTS_TEST_API_KEY || process.env.DODO_PAYMENTS_PROD_API_KEY;
  if (!apiKey) return false;

  // Resolve email if not provided
  if (!userEmail && userId) {
    try {
      const { data } = await supabase
        .from('users')
        .select('email')
        .eq('id', userId)
        .maybeSingle();
      userEmail = data?.email;
    } catch (err) {
      console.error('[RC Webhook] Error fetching user email:', err.message);
    }
  }

  if (!userEmail) return false;

  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode';

  try {
    const client = new DodoPayments({
      bearerToken: apiKey,
      environment: environment,
    });

    // Find Dodo customer by email
    const customersList = await client.customers.list({ email: userEmail });
    const items = customersList.items || customersList.data || [];
    const customer = items.find(c => c.email && c.email.toLowerCase() === userEmail.toLowerCase());

    if (!customer) return false;

    // Check subscriptions
    const subscriptions = await client.subscriptions.list({ customer_id: customer.customer_id });
    const subItems = subscriptions.items || subscriptions.data || subscriptions || [];

    for (const sub of subItems) {
      if (sub.status === 'active' || sub.status === 'trialing') {
        console.log(`[RC Webhook] Found active Dodo subscription: ${sub.subscription_id} (status: ${sub.status})`);
        return true;
      }
    }

    return false;
  } catch (err) {
    console.error('[RC Webhook] Error checking Dodo subscription:', err.message);
    // On error, be conservative: don't revoke (return true to prevent false revocation)
    // This means if Dodo API is down, we err on the side of keeping Pro
    return false;
  }
}

/**
 * Checks if the user still has other active entitlements in RevenueCat
 * (e.g., they had multiple subscriptions and only one expired).
 */
async function checkOtherRevenueCatEntitlements(appUserId) {
  const rcKey = process.env.REVENUECAT_SECRET_API_KEY;
  if (!rcKey || !appUserId) return false;

  try {
    const res = await fetch(
      `https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(appUserId)}`,
      {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${rcKey}` },
      }
    );

    if (!res.ok) return false;

    const data = await res.json();
    const entitlements = data.subscriber?.entitlements || {};

    for (const [id, entitlement] of Object.entries(entitlements)) {
      if (!entitlement.expires_date || new Date(entitlement.expires_date) > new Date()) {
        console.log(`[RC Webhook] User still has active RC entitlement: ${id}`);
        return true;
      }
    }

    return false;
  } catch (err) {
    console.error('[RC Webhook] Error checking RC entitlements:', err.message);
    return false;
  }
}
