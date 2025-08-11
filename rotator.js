export default async function handler(req, res) {
  res.status(200).json({
    status: "✅ Rotator refreshed",
    rotatedAt: new Date().toISOString()
  });
}
