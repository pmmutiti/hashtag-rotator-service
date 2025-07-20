
// File: api/health.js export default async function handler(req, res) { res.status(200).json({ status: "ok", service: "hashtag-rotator-service", timestamp: new Date().toISOString() }); } 
