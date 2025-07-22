
export default async function handler(req, res) { const edgeRegion = req.headers["x-vercel-ip-country-region"] || "unknown"; const timestamp = new Date().toISOString(); // ✅ Add edge region header to HTTP response res.setHeader("x-edge-region", edgeRegion); res.status(200).json({ status: "ok", service: "hashtag-rotator-service", edgeRegion: edgeRegion, timestamp: timestamp }); } 
