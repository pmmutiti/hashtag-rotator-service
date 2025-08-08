export default function handler(req, res) {
  res.status(200).json({
    status: "✅ Hashtag Rotator Service is Live",
    endpoints: [
      "/api/trends",
      "/api/cron",
      "/api/github-webhook",
      "/api/diagnostics"
    ],
    regionRewrite: "/kenya-trends → /api/trends?region=kenya",
    lastUpdated: new Date().toISOString()
  });
}

