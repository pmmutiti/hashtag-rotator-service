export default async function handler(req, res) {
  const diagnostics = {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    region: process.env.VERCEL_REGION || "unknown",
    env: process.env.NODE_ENV || "development"
  };

  res.status(200).json({
    status: "🩺 Diagnostics OK",
    diagnostics
  });
}
