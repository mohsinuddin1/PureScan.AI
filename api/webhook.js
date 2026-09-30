import DodoPayments from 'dodopayments';
import { createClient } from '@supabase/supabase-js';

// Disable default Vercel bodyParser to preserve exact bytes for HMAC signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req) {
  if (req.rawBody) return req.rawBody;
  if (typeof req.body === 'string') return req.body;
  if (req.body && typeof req.body === 'object') return JSON.stringify(req.body);
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

/**
 * Ensures a subscriber exists in RevenueCat before granting promotional entitlements.
 * In RevenueCat v1, GET /v1/subscribers/{appUserId} auto-provisions the subscriber if not yet created.
 */
async function ensureRevenueCatSubscriber(appUserId) {
  const rcKey = process.env.REVENUECAT_SECRET_API_KEY;
  if (!rcKey || !appUserId) {
    console.warn('[RevenueCat] Skipping subscriber provisioning — missing key or appUserId', { hasKey: !!rcKey, appUserId });
    return false;
  }
  try {
    const res = await fetch(
      `https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(appUserId)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${rcKey}`,
        },
      }
    );
    const body = await res.text();
    if (res.ok) {
      console.log(`[RevenueCat] Subscriber provisioned/found for: ${appUserId}`);
    } else {
      console.error(`[RevenueCat] Subscriber provisioning failed (${res.status}):`, body);
    }
    return res.ok;
  } catch (err) {
    console.error('[RevenueCat] Network error while provisioning subscriber:', err.message);
    return false;
  }
}

/**
 * Fetches subscriber data from RevenueCat API
 * @param {string} appUserId - Supabase User ID
 */
async function getRevenueCatSubscriberData(appUserId) {
  const rcKey = process.env.REVENUECAT_SECRET_API_KEY;
  if (!rcKey || !appUserId) return null;
  try {
    const res = await fetch(
      `https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(appUserId)}`,
      {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${rcKey}` },
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('[RevenueCat] Network error fetching subscriber:', err.message);
    return null;
  }
}

/**
 * Accurately determines plan duration ('monthly' | 'yearly') from Dodo webhook event data.
 * Protects against blindly defaulting to 'yearly'.
 */
function resolvePlanDuration(eventData) {
  if (!eventData) return 'monthly';

  // 1. Explicit plan_duration in metadata (set by /api/checkout)
  const metaDuration =
    eventData.metadata?.plan_duration ||
    eventData.subscription?.metadata?.plan_duration ||
    eventData.payment?.metadata?.plan_duration ||
    eventData.customer?.metadata?.plan_duration;

  if (metaDuration === 'monthly' || metaDuration === 'yearly') {
    return metaDuration;
  }

  // 2. Billing cycle / payment frequency interval (from Subscription object)
  const interval = (
    eventData.payment_frequency_interval ||
    eventData.subscription_period_interval ||
    eventData.billing_cycle?.interval ||
    eventData.subscription?.payment_frequency_interval ||
    ''
  ).toLowerCase();

  if (interval === 'month' || interval.includes('month')) return 'monthly';
  if (interval === 'year' || interval.includes('year') || interval.includes('annu')) return 'yearly';

  // 3. Product ID check
  const productId =
    eventData.product_id ||
    eventData.metadata?.product_id ||
    eventData.subscription?.product_id ||
    eventData.payment?.product_id;

  const monthlyProductId = process.env.PUBLIC_DODO_PRODUCT_MONTHLY || process.env.VITE_DODO_PRODUCT_MONTHLY || 'pdt_0Noa60DO9XekcWWBOSvlh';
  const annualProductId = process.env.PUBLIC_DODO_PRODUCT_ANNUAL || process.env.VITE_DODO_PRODUCT_ANNUAL || 'pdt_0Noa60FhhT6igBwxvT0Sz';

  if (productId) {
    if (productId === monthlyProductId || productId.toLowerCase().includes('month')) {
      return 'monthly';
    }
    if (productId === annualProductId || productId.toLowerCase().includes('year') || productId.toLowerCase().includes('annu')) {
      return 'yearly';
    }
  }

  // 4. Amount check: monthly is $9.99 (999 cents), annual is $29.99 (2999 cents)
  const amount =
    eventData.total_amount ||
    eventData.recurring_pre_tax_amount ||
    eventData.price ||
    eventData.payment?.total_amount;

  if (typeof amount === 'number' && amount > 0) {
    if (amount < 2000) {
      return 'monthly';
    } else {
      return 'yearly';
    }
  }

  // Safe fallback: default to 'monthly' (never assume yearly!)
  return 'monthly';
}

/**
 * Grants a promotional entitlement to a user in RevenueCat.
 * Checks for existing active promotional grants to prevent duplicate calls,
 * and revokes conflicting promotional grants (e.g. accidental yearly on monthly purchase)
 * so that the user never has both packages in RevenueCat.
 *
 * @param {string} appUserId - Supabase User ID (matches Purchases.logIn in mobile app)
 * @param {'monthly' | 'yearly'} duration - Duration of promotional entitlement
 */
async function grantRevenueCatEntitlement(appUserId, duration = 'monthly') {
  const rcKey = process.env.REVENUECAT_SECRET_API_KEY;
  const entitlementId = process.env.REVENUECAT_ENTITLEMENT_ID || 'pro';
  if (!rcKey || !appUserId) {
    console.warn('[RevenueCat] Skipping entitlement grant — missing key or appUserId', { hasKey: !!rcKey, appUserId });
    return false;
  }

  const targetDuration = duration === 'yearly' ? 'yearly' : 'monthly';
  console.log(`[RevenueCat] Evaluating promotional grant '${entitlementId}' (${targetDuration}) for: ${appUserId}`);

  // 1. Ensure subscriber exists (provisions new subscriber if first time)
  await ensureRevenueCatSubscriber(appUserId);

  // 2. Fetch current subscriber state to check for existing active promotional grants
  const subscriberData = await getRevenueCatSubscriberData(appUserId);
  const subscriber = subscriberData?.subscriber;
  const subscriptions = subscriber?.subscriptions || {};

  const now = new Date();

  // Inspect active promotional grants
  let hasMatchingPromo = false;
  let hasConflictingPromo = false;
  let hasActivePromo = false;

  for (const [key, sub] of Object.entries(subscriptions)) {
    const isPromo = sub.ownership_type === 'PROMOTIONAL' || sub.store === 'promotional' || key.startsWith('rc_promo_');
    const isUnexpired = !sub.expires_date || new Date(sub.expires_date) > now;

    if (isPromo && isUnexpired) {
      hasActivePromo = true;
      const expiresMs = sub.expires_date ? new Date(sub.expires_date).getTime() : Infinity;
      const purchaseMs = sub.purchase_date ? new Date(sub.purchase_date).getTime() : now.getTime();
      const durationDays = (expiresMs - purchaseMs) / (1000 * 60 * 60 * 24);
      const remainingDays = (expiresMs - now.getTime()) / (1000 * 60 * 60 * 24);

      const isSubMonthly = key.toLowerCase().includes('month') || (durationDays > 0 && durationDays <= 45);
      const isSubYearly = key.toLowerCase().includes('year') || key.toLowerCase().includes('annu') || durationDays > 100;

      if (targetDuration === 'monthly') {
        if (isSubMonthly && remainingDays > 3) {
          hasMatchingPromo = true;
        }
        if (isSubYearly) {
          hasConflictingPromo = true;
        }
      } else if (targetDuration === 'yearly') {
        if (isSubYearly && remainingDays > 15) {
          hasMatchingPromo = true;
        }
        if (isSubMonthly) {
          hasConflictingPromo = true;
        }
      }
    }
  }

  // 3. Deduplication: If subscriber already has the exact matching promotional active with ample time remaining
  // and no conflicting grants, skip redundant API call
  if (hasMatchingPromo && !hasConflictingPromo) {
    console.log(`[RevenueCat] Subscriber ${appUserId} already has active matching '${targetDuration}' promotional entitlement. Skipping redundant grant.`);
    return true;
  }

  // 4. If conflicting promotional grant exists (e.g. has yearly when target is monthly, or has both),
  // or if we need a fresh grant, revoke existing promotional grants first to avoid package stacking
  if (hasConflictingPromo || hasActivePromo) {
    console.log(`[RevenueCat] Cleaning up existing promotional entitlements for ${appUserId} before granting '${targetDuration}' (conflicting: ${hasConflictingPromo})...`);
    await revokeRevenueCatEntitlement(appUserId);
  }

  // 5. Grant promotional entitlement (with 1 retry)
  const maxAttempts = 2;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const url = `https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(appUserId)}/entitlements/${encodeURIComponent(entitlementId)}/promotional`;
      console.log(`[RevenueCat] Grant attempt ${attempt}/${maxAttempts} — POST ${url} with duration=${targetDuration}`);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${rcKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          duration: targetDuration,
        }),
      });

      const resBody = await res.text();
      if (!res.ok) {
        console.error(`[RevenueCat] Grant entitlement failed (${res.status}, attempt ${attempt}):`, resBody);
        if (attempt < maxAttempts) {
          console.log('[RevenueCat] Retrying after 1s...');
          await new Promise(r => setTimeout(r, 1000));
          continue;
        }
        return false;
      } else {
        console.log(`[RevenueCat] ✅ Successfully granted '${entitlementId}' (${targetDuration}) to subscriber: ${appUserId}`);
        return true;
      }
    } catch (err) {
      console.error(`[RevenueCat] Network error granting entitlement (attempt ${attempt}):`, err.message);
      if (attempt < maxAttempts) {
        await new Promise(r => setTimeout(r, 1000));
        continue;
      }
      return false;
    }
  }
  return false;
}

/**
 * Revokes all promotional entitlements from a user in RevenueCat
 * @param {string} appUserId - Supabase User ID
 */
async function revokeRevenueCatEntitlement(appUserId) {
  const rcKey = process.env.REVENUECAT_SECRET_API_KEY;
  const entitlementId = process.env.REVENUECAT_ENTITLEMENT_ID || 'pro';
  if (!rcKey || !appUserId) return false;

  try {
    const res = await fetch(
      `https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(appUserId)}/entitlements/${encodeURIComponent(entitlementId)}/revoke_promotionals`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${rcKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[RevenueCat] Failed to revoke promotional entitlements (${res.status}):`, errText);
      return false;
    } else {
      console.log(`[RevenueCat] Successfully revoked promotional '${entitlementId}' from subscriber: ${appUserId}`);
      return true;
    }
  } catch (err) {
    console.error('[RevenueCat] Network error revoking promotional entitlement:', err.message);
    return false;
  }
}

/**
 * Checks if a user has any active entitlement in RevenueCat.
 * Used for cross-platform safety check before revoking Pro.
 * @param {string} appUserId - Supabase User ID or email
 * @returns {Promise<boolean>} true if user has at least one active entitlement
 */
async function checkRevenueCatEntitlement(appUserId) {
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
        console.log(`[Dodo Webhook] User has active RC entitlement: ${id}`);
        return true;
      }
    }
    return false;
  } catch (err) {
    console.error('[Dodo Webhook] Error checking RC entitlement:', err.message);
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY || process.env.DODO_WEBHOOK_SECRET;
  const apiKey = process.env.DODO_PAYMENTS_API_KEY || process.env.DODO_PAYMENTS_TEST_API_KEY || process.env.DODO_PAYMENTS_PROD_API_KEY;
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode';

  if (!apiKey) {
    console.error('Missing DODO_PAYMENTS_API_KEY on server');
    return res.status(500).json({ error: 'DODO_PAYMENTS_API_KEY not configured' });
  }

  try {
    const rawBody = await getRawBody(req);

    const client = new DodoPayments({
      bearerToken: apiKey,
      environment: environment,
      webhookKey: webhookKey,
    });

    let event;

    // Verify signature if webhook key is configured
    if (webhookKey) {
      try {
        event = client.webhooks.unwrap(rawBody, {
          headers: {
            'webhook-id': req.headers['webhook-id'],
            'webhook-signature': req.headers['webhook-signature'],
            'webhook-timestamp': req.headers['webhook-timestamp'],
          },
        });
      } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(401).json({ error: 'Invalid webhook signature' });
      }
    } else {
      console.warn('⚠️ Warning: DODO_PAYMENTS_WEBHOOK_KEY is not set. Parsing webhook without signature verification.');
      event = JSON.parse(rawBody);
    }

    console.log(`[Dodo Webhook] Received event: ${event.type}`);
    console.log(`[Dodo Webhook] Event data keys:`, Object.keys(event.data || {}));
    console.log(`[Dodo Webhook] Event metadata:`, JSON.stringify(event.data?.metadata || {}));
    console.log(`[Dodo Webhook] Customer info:`, JSON.stringify(event.data?.customer || {}));

    // Initialize Supabase admin client
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const eventData = event.data || {};
      const metadata = eventData.metadata || {};
      const customer = eventData.customer || {};
      const userEmail = customer.email;
      let userId =
        metadata.user_id ||
        metadata.app_user_id ||
        metadata.userId ||
        customer.metadata?.user_id ||
        customer.metadata?.app_user_id ||
        eventData.subscription?.metadata?.user_id ||
        eventData.payment?.metadata?.user_id;

      // If user_id wasn't in metadata, lookup from Supabase via email
      if (!userId && userEmail) {
        try {
          const { data: userProfile } = await supabase
            .from('users')
            .select('id')
            .eq('email', userEmail)
            .maybeSingle();
          if (userProfile?.id) {
            userId = userProfile.id;
          }
        } catch (dbErr) {
          console.error('[Supabase] Error finding user by email:', dbErr.message);
        }
      }

      // Determine subscription plan duration (monthly or yearly) using multi-tier resolver
      const duration = resolvePlanDuration(eventData);

      // 1. Handle successful subscription or payment events
      if (
        event.type === 'payment.succeeded' ||
        event.type === 'subscription.active' ||
        event.type === 'subscription.renewed' ||
        event.type === 'subscription.plan_changed'
      ) {
        console.log(`[Dodo Webhook] Upgrading/renewing user Pro (${event.type}): userId=${userId}, email=${userEmail}, duration=${duration}`);
        
        // Update Supabase Database
        if (userId) {
          const { error } = await supabase
            .from('users')
            .update({ is_pro: true })
            .eq('id', userId);
          if (error) console.error('[Supabase] Failed to update is_pro by userId:', error);
          else console.log(`[Supabase] ✅ Updated is_pro=true for userId: ${userId}`);
        } else if (userEmail) {
          const { error } = await supabase
            .from('users')
            .update({ is_pro: true })
            .eq('email', userEmail);
          if (error) console.error('[Supabase] Failed to update is_pro by email:', error);
          else console.log(`[Supabase] ✅ Updated is_pro=true for email: ${userEmail}`);
        } else {
          console.warn('[Dodo Webhook] ⚠️ No userId or email found — cannot update Supabase');
        }

        // Grant Entitlement in RevenueCat (enables premium in mobile app)
        // We grant to userId (Supabase UUID) which matches Purchases.logIn in mobile app.
        // Fallback to email only if userId is not found.
        const rcTargetId = userId || userEmail;
        if (rcTargetId) {
          const ok = await grantRevenueCatEntitlement(rcTargetId, duration);
          console.log(`[RevenueCat] Grant result for ${rcTargetId} (${duration}): ${ok ? 'SUCCESS' : 'FAILED'}`);
        } else {
          console.warn('[Dodo Webhook] ⚠️ No userId or email found — cannot grant RevenueCat entitlement');
        }
      }

      // 2. Handle failed, expired, or cancelled subscriptions (with cross-platform safety check)
      if (
        event.type === 'subscription.failed' ||
        event.type === 'subscription.expired' ||
        event.type === 'subscription.cancelled'
      ) {
        console.log(`[Dodo Webhook] Revocation event for user: userId=${userId}, email=${userEmail}`);

        // CROSS-PLATFORM CHECK: Before revoking Pro, check if user still has
        // an active entitlement in RevenueCat (mobile subscription).
        const rcIdentifier = userId || userEmail;
        let hasActiveRCEntitlement = false;
        if (rcIdentifier) {
          hasActiveRCEntitlement = await checkRevenueCatEntitlement(rcIdentifier);
        }

        if (hasActiveRCEntitlement) {
          console.log(`[Dodo Webhook] ⚠️ User ${rcIdentifier} still has active RevenueCat entitlement — keeping is_pro=true`);
        } else {
          // Safe to revoke — no active subscription on any platform
          console.log(`[Dodo Webhook] No active RC entitlement — revoking Pro`);

          // Update Supabase Database
          if (userId) {
            await supabase.from('users').update({ is_pro: false }).eq('id', userId);
          } else if (userEmail) {
            await supabase.from('users').update({ is_pro: false }).eq('email', userEmail);
          }

          // Revoke Entitlement in RevenueCat
          if (userId) {
            await revokeRevenueCatEntitlement(userId);
          } else if (userEmail) {
            await revokeRevenueCatEntitlement(userEmail);
          }
        }
      }

      // 3. Handle payment failures (prevents ghost Pro from client-side optimistic writes)
      if (event.type === 'payment.failed') {
        console.log(`[Dodo Webhook] Payment failed for user: userId=${userId}, email=${userEmail}`);

        // Check if user has an active RevenueCat entitlement before revoking
        const rcId = userId || userEmail;
        let hasRCEntitlement = false;
        if (rcId) {
          hasRCEntitlement = await checkRevenueCatEntitlement(rcId);
        }

        if (!hasRCEntitlement) {
          if (userId) {
            await supabase.from('users').update({ is_pro: false }).eq('id', userId);
            console.log(`[Dodo Webhook] ✅ Reverted is_pro=false after payment failure for userId: ${userId}`);
          } else if (userEmail) {
            await supabase.from('users').update({ is_pro: false }).eq('email', userEmail);
            console.log(`[Dodo Webhook] ✅ Reverted is_pro=false after payment failure for email: ${userEmail}`);
          }
        } else {
          console.log(`[Dodo Webhook] Payment failed but user has active RC entitlement — keeping is_pro=true`);
        }
      }
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('Error processing Dodo Payments webhook:', error);
    return res.status(500).json({ error: 'Webhook processing error' });
  }
}
