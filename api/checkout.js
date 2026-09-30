import DodoPayments from 'dodopayments';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.DODO_PAYMENTS_API_KEY || process.env.DODO_PAYMENTS_TEST_API_KEY || process.env.DODO_PAYMENTS_PROD_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'DODO_PAYMENTS_API_KEY is not configured on the server' });
  }

  const { productId, email, userId, returnUrl } = req.body || {};

  if (!productId) {
    return res.status(400).json({ error: 'productId is required' });
  }

  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode';

  try {
    const client = new DodoPayments({
      bearerToken: apiKey,
      environment: environment,
    });

    const monthlyProductId = process.env.PUBLIC_DODO_PRODUCT_MONTHLY || process.env.VITE_DODO_PRODUCT_MONTHLY || 'pdt_0Noa60DO9XekcWWBOSvlh';
    const isMonthly = productId === monthlyProductId || productId?.toLowerCase().includes('monthly');
    const planDuration = isMonthly ? 'monthly' : 'yearly';

    const metadata = {
      ...(userId ? { user_id: userId, app_user_id: userId } : {}),
      product_id: productId,
      plan_duration: planDuration,
    };

    const sessionPayload = {
      product_cart: [
        { product_id: productId, quantity: 1 }
      ],
      return_url: returnUrl || 'https://purescan.ai/pro?success=true',
      metadata,
    };

    if (email) {
      sessionPayload.customer = {
        email,
        metadata,
      };
    }

    const session = await client.checkoutSessions.create(sessionPayload);

    return res.status(200).json({
      checkout_url: session.checkout_url,
      session_id: session.session_id,
    });

  } catch (err) {
    console.error('Dodo Payments Checkout Error:', err);
    return res.status(500).json({
      error: err.message || 'Internal server error while creating checkout session'
    });
  }
}
