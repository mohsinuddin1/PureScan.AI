export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, isSandbox } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Use the correct API key based on environment
  const apiKey = isSandbox ? process.env.sandbox_paddle : process.env.paddle_key;
  const baseUrl = isSandbox ? 'https://sandbox-api.paddle.com' : 'https://api.paddle.com';

  if (!apiKey) {
    return res.status(500).json({ error: 'Paddle API key not configured on server' });
  }

  try {
    // Step 1: Look up the customer by email
    const customerResponse = await fetch(`${baseUrl}/customers?search=${encodeURIComponent(email)}&status=active,archived`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!customerResponse.ok) {
      throw new Error(`Failed to fetch customer: ${customerResponse.statusText}`);
    }

    const customerData = await customerResponse.json();
    
    // Check if we found a customer
    if (!customerData.data || customerData.data.length === 0) {
      return res.status(404).json({ error: 'No Paddle customer found for this email. If you just purchased, please wait a moment.' });
    }

    // Get the first matching customer ID
    const customerId = customerData.data[0].id;

    // Step 2: Mint a portal session for this customer
    const portalResponse = await fetch(`${baseUrl}/customer-portal-sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer_id: customerId
      })
    });

    if (!portalResponse.ok) {
      throw new Error(`Failed to create portal session: ${portalResponse.statusText}`);
    }

    const portalData = await portalResponse.json();

    if (!portalData.data || !portalData.data.urls || !portalData.data.urls.general) {
      throw new Error('Invalid portal session response from Paddle');
    }

    // Return the secure portal URL to the frontend
    return res.status(200).json({ url: portalData.data.urls.general.overview });

  } catch (err) {
    console.error('Paddle Portal API Error:', err);
    return res.status(500).json({ error: 'Internal server error while generating portal link' });
  }
}
