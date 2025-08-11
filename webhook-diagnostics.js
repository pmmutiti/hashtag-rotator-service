import fs from "fs";
import path from "path";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const secret = process.env.WEBHOOK_SECRET;
  const signature = req.headers["x-signature"];
  const payload = JSON.stringify(req.body);

  // ✅ Signature verification
  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  const verified = signature === expectedSig;

  // 🧠 Construct delivery object
  const delivery = {
    id: `deliv-${Date.now()}`,
    verified,
    timestamp: new Date().toISOString(),
    source: req.body.source || "unknown",
    event: req.body.event || "unknown",
    endpoint: req.url,
    ...(verified ? {} : { error: "Signature verification failed" }),
  };

  // 📦 Load existing diagnostics
  const filePath = path.join(process.cwd(), "public", "webhook-diagnostics.json");
  let diagnostics = { status: "✅ Webhook diagnostics active", deliveries: [], total: 0 };

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    diagnostics = JSON.parse(raw);
  } catch (err) {
    console.warn("No existing diagnostics file found. Creating new one.");
  }

  // 🧮 Append new delivery
  diagnostics.deliveries.unshift(delivery);
  diagnostics.total = diagnostics.deliveries.length;
  diagnostics.lastUpdated = new Date().toISOString();

  // 💾 Write updated diagnostics
  fs.writeFileSync(filePath, JSON.stringify(diagnostics, null, 2));

  return res.status(200).json({ success: true, delivery });
}
