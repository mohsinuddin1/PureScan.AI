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
 * Grants a promotional entitlement to a user in RevenueCat
 * @param {string} appUserId - Supabase User ID (matches Purchases.logIn in mobile app)
 * @param {'monthly' | 'yearly'} duration - Duration of promotional entitlement
 */
async function grantRevenueCatEntitlement(appUserId, duration = 'yearly') {
  const rcKey = process.env.REVENUECAT_SECRET_API_KEY;
  const entitlementId = process.env.REVENUECAT_ENTITLEMENT_ID || 'pro';
  if (!rcKey || !appUserId) {
    console.warn('[RevenueCat] Skipping entitlement grant — missing key or appUserId', { hasKey: !!rcKey, appUserId });
    return false;
  }

  console.log(`[RevenueCat] Attempting to grant '${entitlementId}' (${duration}) to: ${appUserId}`);

  // 1. Ensure subscriber exists (provisions new subscriber if first time)
  const provisioned = await ensureRevenueCatSubscriber(appUserId);
  if (!provisioned) {
    console.error(`[RevenueCat] Cannot grant entitlement — subscriber provisioning failed for: ${appUserId}`);
  }

  // 2. Grant promotional entitlement (with 1 retry)
  const maxAttempts = 2;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const url = `https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(appUserId)}/entitlements/${encodeURIComponent(entitlementId)}/promotional`;
      console.log(`[RevenueCat] Grant attempt ${attempt}/${maxAttempts} — POST ${url}`);

        // RevenueCat accepts: 'daily', 'three_day', 'weekly', 'monthly', 'two_month', 'three_month', 'six_month', 'yearly', 'lifetime'
        const rcDuration = duration === 'monthly' ? 'monthly' : 'yearly';
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${rcKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            duration: rcDuration,
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
        console.log(`[RevenueCat] ✅ Successfully granted '${entitlementId}' (${duration}) to subscriber: ${appUserId}`);
        console.log(`[RevenueCat] Response:`, resBody);
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
 * Revokes a promotional entitlement from a user in RevenueCat
 * @param {string} appUserId - Supabase User ID
 */
async function revokeRevenueCatEntitlement(appUserId) {
  const rcKey = process.env.REVENUECAT_SECRET_API_KEY;
  const entitlementId = process.env.REVENUECAT_ENTITLEMENT_ID || 'pro';
  if (!rcKey || !appUserId) return;

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
      console.error(`[RevenueCat] Failed to revoke entitlement (${res.status}):`, errText);
    } else {
      console.log(`[RevenueCat] Successfully revoked '${entitlementId}' from subscriber: ${appUserId}`);
    }
  } catch (err) {
    console.error('[RevenueCat] Network error revoking entitlement:', err.message);
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

      // Determine subscription plan duration (monthly or yearly)
      const productId = eventData.product_id;
      const billingInterval = eventData.payment_frequency_interval || eventData.billing_cycle?.interval;
      const isMonthly = billingInterval === 'Month' || productId?.includes('monthly') || productId === process.env.PUBLIC_DODO_PRODUCT_MONTHLY;
      const duration = isMonthly ? 'monthly' : 'yearly';

      // 1. Handle successful subscription or payment events
      if (
        event.type === 'payment.succeeded' ||
        event.type === 'subscription.active' ||
        event.type === 'subscription.renewed'
      ) {
        console.log(`[Dodo Webhook] Upgrading user to Pro: userId=${userId}, email=${userEmail}, duration=${duration}`);
        
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
        // We grant to userId (Supabase UUID) which should match Purchases.logIn in mobile app
        // Also grant to email as fallback to guarantee coverage
        const rcResults = [];
        if (userId) {
          const ok = await grantRevenueCatEntitlement(userId, duration);
          rcResults.push({ identifier: userId, type: 'userId', success: ok });
        }
        if (userEmail && userEmail !== userId) {
          const ok = await grantRevenueCatEntitlement(userEmail, duration);
          rcResults.push({ identifier: userEmail, type: 'email', success: ok });
        }
        if (rcResults.length === 0) {
          console.warn('[Dodo Webhook] ⚠️ No userId or email — cannot grant RevenueCat entitlement');
        } else {
          console.log('[RevenueCat] Grant results:', JSON.stringify(rcResults));
        }
      }

      // 2. Handle failed or expired subscriptions
      if (
        event.type === 'subscription.failed' ||
        event.type === 'subscription.expired'
      ) {
        console.log(`[Dodo Webhook] Revoking Pro for user: userId=${userId}, email=${userEmail}`);
        
        // Update Supabase Database
        if (userId) {
          await supabase.from('users').update({ is_pro: false }).eq('id', userId);
        } else if (userEmail) {
          await supabase.from('users').update({ is_pro: false }).eq('email', userEmail);
        }

        // Revoke Entitlement in RevenueCat
        if (userId) {
          await revokeRevenueCatEntitlement(userId);
        }
        if (userEmail && userEmail !== userId) {
          await revokeRevenueCatEntitlement(userEmail);
        }
      }
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('Error processing Dodo Payments webhook:', error);
    return res.status(500).json({ error: 'Webhook processing error' });
  }
}
