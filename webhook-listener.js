import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const signature = req.headers['x-hub-signature-256'] || req.headers['X-Hub-Signature-256'];
    const payload = JSON.stringify(req.body);

    if (!signature || !WEBHOOK_SECRET) {
      throw new Error('Missing signature or secret key');
    }

    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    const digest = 'sha256=' + hmac.update(payload).digest('hex');

    if (digest !== signature) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Signature validation failed', details: error.message });
  }

  try {
    const payload = req.body;
    console.log('✅ Webhook received:', payload);
    res.status(200).json({ status: 'success', message: 'Webhook processed.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
