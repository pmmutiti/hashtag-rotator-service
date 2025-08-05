
export default async function handler(req, res) { const event = req.headers['x-github-event']; console.log(`[Webhook: hashtag-rotate-service] Event: ${event}`); res.status(200).json({ received: true, event }); } 
