import { createClient } from '@supabase/supabase-js';
import DodoPayments from 'dodopayments';

/**
 * POST /api/sync-pro
 *
 * On-demand reconciliation endpoint. Checks BOTH RevenueCat and Dodo Payments
 * to determine if the authenticated user should have Pro status, then heals
 * the Supabase `users.is_pro` column if it's out of sync.
 *
 * Security: Requires a valid Supabase JWT in the Authorization header.
 * The userId is extracted from the token — callers cannot spoof another user.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── 1. Authenticate via Supabase JWT ─────────────────────────────
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('[sync-pro] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.replace('Bearer ', '');

  // Use anon key client to verify the user's JWT
  const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey || supabaseServiceKey);
  const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token);

  if (authError || !user) {
    console.warn('[sync-pro] JWT verification failed:', authError?.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  const userId = user.id;
  const userEmail = user.email;

  console.log(`[sync-pro] Syncing Pro status for userId=${userId}, email=${userEmail}`);

  // Use service role client for DB writes
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // ── 2. Check RevenueCat ──────────────────────────────────────────
    const rcActive = await checkRevenueCatEntitlement(userId);

    // ── 3. Check Dodo Payments ───────────────────────────────────────
    const dodoActive = await checkDodoSubscription(userEmail);

    // ── 4. Determine final Pro status ────────────────────────────────
    const isProActive = rcActive || dodoActive;

    console.log(`[sync-pro] Results: RC=${rcActive}, Dodo=${dodoActive} → is_pro=${isProActive}`);

    // ── 5. Heal Supabase if needed ───────────────────────────────────
    const { data: currentUser } = await supabase
      .from('users')
      .select('is_pro')
      .eq('id', userId)
      .maybeSingle();

    const currentStatus = currentUser?.is_pro || false;

    if (currentStatus !== isProActive) {
      const { error: updateError } = await supabase
        .from('users')
        .update({ is_pro: isProActive })
        .eq('id', userId);

      if (updateError) {
        console.error('[sync-pro] Failed to update is_pro:', updateError);
        return res.status(500).json({ error: 'Failed to update Pro status' });
      }
      console.log(`[sync-pro] ✅ Healed is_pro: ${currentStatus} → ${isProActive} for userId=${userId}`);
    } else {
      console.log(`[sync-pro] No change needed — is_pro already ${currentStatus}`);
    }

    return res.status(200).json({
      synced: true,
      is_pro: isProActive,
      sources: { revenuecat: rcActive, dodo: dodoActive },
    });

  } catch (err) {
    console.error('[sync-pro] Unexpected error:', err.message);
    return res.status(500).json({ error: 'Sync failed' });
  }
}

/**
 * Checks if the user has an active entitlement in RevenueCat.
 * Returns true if any entitlement is currently active.
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

    if (!res.ok) {
      // 404 means subscriber doesn't exist — not an error, just no entitlements
      if (res.status === 404) return false;
      console.warn(`[sync-pro] RevenueCat API returned ${res.status}`);
      return false;
    }

    const data = await res.json();
    const entitlements = data.subscriber?.entitlements || {};

    // Check if any entitlement is currently active
    for (const [id, entitlement] of Object.entries(entitlements)) {
      if (!entitlement.expires_date || new Date(entitlement.expires_date) > new Date()) {
        console.log(`[sync-pro] Active RC entitlement found: ${id}`);
        return true;
      }
    }
    return false;
  } catch (err) {
    console.error('[sync-pro] RevenueCat check error:', err.message);
    // On network error, return false (don't grant Pro on failure)
    return false;
  }
}

/**
 * Checks if the user has an active subscription in Dodo Payments.
 * Looks up the customer by email, then checks subscription status.
 */
async function checkDodoSubscription(userEmail) {
  if (!userEmail) return false;

  const apiKey = process.env.DODO_PAYMENTS_API_KEY || process.env.DODO_PAYMENTS_TEST_API_KEY || process.env.DODO_PAYMENTS_PROD_API_KEY;
  if (!apiKey) return false;

  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode';

  try {
    const client = new DodoPayments({
      bearerToken: apiKey,
      environment: environment,
    });

    // Find customer by email
    const customersList = await client.customers.list({ email: userEmail });
    const items = customersList.items || customersList.data || [];
    const customer = items.find(c => c.email && c.email.toLowerCase() === userEmail.toLowerCase());

    if (!customer) {
      console.log(`[sync-pro] No Dodo customer found for email: ${userEmail}`);
      return false;
    }

    // List subscriptions for this customer
    const subscriptions = await client.subscriptions.list({ customer_id: customer.customer_id });
    const subItems = subscriptions.items || subscriptions.data || subscriptions || [];

    for (const sub of subItems) {
      if (sub.status === 'active' || sub.status === 'trialing') {
        console.log(`[sync-pro] Active Dodo subscription found: ${sub.subscription_id} (status: ${sub.status})`);
        return true;
      }
    }

    return false;
  } catch (err) {
    console.error('[sync-pro] Dodo check error:', err.message);
    // On error, return false (don't grant Pro on failure)
    return false;
  }
}
