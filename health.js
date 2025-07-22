
// File: api/health.js export default async function handler(req, res) { res.status(200).json({ status: "ok", service: "hashtag-rotator-service", timestamp: new Date().toISOString() }); } 


export default async function handler(req, res) { const edgeRegion = req.headers["x-vercel-ip-country-region"] || "unknown"; // ✅ Add edge region header to response res.setHeader("x-edge-region", edgeRegion); res.status(200).json({ status: "ok", edgeRegion: edgeRegion }); } 
