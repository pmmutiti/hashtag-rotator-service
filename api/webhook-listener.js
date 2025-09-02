import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const signature =
      req.headers['x-hub-signature-256'] || req.headers['X-Hub-Signature-256'];
    const payload = JSON.stringify(req.body);

    if (!signature || !WEBHOOK_SECRET) {
      throw new Error('Missing signature or secret');
    }

    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    hmac.update(payload);
    const expectedSignature = `sha256=${hmac.digest('hex')}`;

    if (signature !== expectedSignature) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const event = req.headers['x-github-event'] || 'unknown';
    const delivery = req.headers['x-github-delivery'] || 'unknown';
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ✅ Webhook received: ${event} | Delivery: ${delivery}`);
    res.status(200).json({
      status: '✅ Verified webhook received',
      event,
      delivery,
      timestamp,
    });
  } catch (err) {
    console.error(`❌ Webhook error: ${err.message}`);
    res.status(500).json({
      status: '❌ Webhook failed',
      error: err.message,
    });
  }
}
