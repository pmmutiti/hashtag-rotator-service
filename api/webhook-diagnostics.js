import crypto from "crypto";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const signature = req.headers["x-signature"];
    const payload = JSON.stringify(req.body);

    if (!signature || !WEBHOOK_SECRET) {
      throw new Error("Missing signature or secret");
    }

    const expectedSig = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(payload)
      .digest("hex");

    const verified = signature === expectedSig;

    const delivery = {
      id: `deliv-${Date.now()}`,
      verified,
      timestamp: new Date().toISOString(),
      source: req.body.source || "unknown",
      event: req.body.event || "unknown",
      endpoint: req.url,
      fallbackUsed: false,
      region: req.body.region || "KE",
      ...(verified ? {} : { error: "Signature verification failed" })
    };

    // ✅ Emit diagnostics directly
    return res.status(200).json({
      status: "✅ Webhook diagnostics emitted",
      delivery
    });
  } catch (err) {
    console.error("❌ Webhook diagnostics failed:", err.message);
    return res.status(500).json({
      status: "❌ Diagnostics error",
      error: err.message
    });
  }
}
