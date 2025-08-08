export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const event = req.headers['x-github-event'] || 'unknown';
  const payload = req.body || {};

  console.log(`[Webhook: hashtag-rotate-service] Event: ${event}`);
  console.log('Payload:', JSON.stringify(payload, null, 2));

  res.status(200).json({
    received: true,
    event,
    timestamp: new Date().toISOString()
  });
}
