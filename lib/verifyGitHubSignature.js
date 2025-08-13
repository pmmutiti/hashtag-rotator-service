import crypto from 'crypto';

export function verifyGitHubSignature(req, secret, rawBody) {
  const signature = req.headers['x-hub-signature-256'];
  if (!signature || !rawBody) return false;

  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(rawBody).digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(digest)
    );
  } catch {
    return false;
  }
}
