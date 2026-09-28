import DodoPayments from 'dodopayments';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, customerId } = req.body || {};

  if (!email && !customerId) {
    return res.status(400).json({ error: 'Email or customerId is required' });
  }

  const apiKey = process.env.DODO_PAYMENTS_API_KEY || process.env.DODO_PAYMENTS_TEST_API_KEY || process.env.DODO_PAYMENTS_PROD_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'DODO_PAYMENTS_API_KEY is not configured on the server' });
  }

  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode';

  try {
    const client = new DodoPayments({
      bearerToken: apiKey,
      environment: environment,
    });

    let targetCustomerId = customerId;

    // If customerId wasn't passed directly, search by email
    if (!targetCustomerId && email) {
      const customersList = await client.customers.list({ email });
      const items = customersList.items || customersList.data || [];
      const match = items.find(c => c.email && c.email.toLowerCase() === email.toLowerCase());
      if (match) {
        targetCustomerId = match.customer_id;
      }
    }

    if (!targetCustomerId) {
      return res.status(404).json({
        error: 'No Dodo Payments customer found for this email. If you recently subscribed, please allow a moment and try again.'
      });
    }

    // Create a time-bound self-service customer portal session
    const returnUrl = req.headers.origin ? `${req.headers.origin}/pro` : 'https://purescan.ai/pro';
    const portalSession = await client.customers.customerPortal.create(targetCustomerId, {
      return_url: returnUrl,
    });

    const portalUrl = portalSession.link || portalSession.url;
    if (!portalUrl) {
      throw new Error('Invalid portal session response from Dodo Payments');
    }

    return res.status(200).json({ url: portalUrl });

  } catch (err) {
    console.error('Dodo Payments Portal API Error:', err);
    return res.status(500).json({
      error: err.message || 'Internal server error while generating billing portal link'
    });
  }
}
