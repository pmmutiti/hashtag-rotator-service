export default async function handler(req, res) {
  // Enforce POST method for webhook intake
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Extract GitHub event type and payload
  const event = req.headers['x-github-event'] || 'unknown';
  const payload = req.body || {};

  // Semantic logging for diagnostics and civic traceability
  console.log(`[Webhook: hashtag-rotator-service] 🧠 Event: ${event}`);
  console.log('Payload:', JSON.stringify(payload, null, 2));

  // Respond with audit-grade metadata
  res.status(200).json({
    received: true,
    event,
    endpoint: '/api/hashtag-rotator-service',
    timestamp: new Date().toISOString()
  });
}
