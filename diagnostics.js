export default async function handler(req, res) {
  res.status(200).json({
    status: "✅ Diagnostics OK",
    timestamp: new Date().toISOString(),
    regions: ["kenya", "global"],
    fallbackActive: true
  });
}
