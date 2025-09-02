export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;
    const headers = req.headers;

    // Optional: log headers for observability
    console.log('📡 Headers:', headers);

    // Optional: verify signature here (e.g., GitHub, Stripe, etc.)

    // ✅ Emit diagnostics
    console.log('📦 Payload received:', payload);

    // TODO: Trigger downstream logic, store payload, or forward to dashboard

    res.status(200).json({
      status: '✅ Webhook received',
      receivedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
