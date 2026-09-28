export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.status(200).json({
    status: 'ok',
    service: 'PureScan AI API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
}
