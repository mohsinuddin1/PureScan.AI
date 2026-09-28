export default function handler(req, res) {
  if (req.method === 'POST') {
    return res.status(200).json({
      status: 'success',
      message: 'Agent registration received',
      client_id: 'agent_' + Math.random().toString(36).substring(2, 10),
      token_type: 'Bearer',
      expires_in: 86400
    });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
