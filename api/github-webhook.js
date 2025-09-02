
import getRawBody from 'raw-body';
import { writeFile } from 'fs/promises';
import path from 'path';
import { verifyGitHubSignature } from '../lib/verifyGitHubSignature';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  const rawBody = await getRawBody(req);
  const verified = verifyGitHubSignature(req, secret, rawBody);

  if (!verified) {
    return res.status(401).json({ status: '❌ Invalid signature' });
  }

  const event = req.headers['x-github-event'] || 'unknown';
  const delivery = req.headers['x-github-delivery'] || 'unknown';
  const payload = JSON.parse(rawBody.toString());

  const timestamp = new Date().toISOString();
  const diagnostics = {
    status: '✅ Webhook received',
    event,
    delivery,
    timestamp,
    repository: payload.repository?.full_name || 'unknown',
    sender: payload.sender?.login || 'unknown',
  };

  const filePath = path.join(process.cwd(), 'public', 'webhook-diagnostics.json');
  await writeFile(filePath, JSON.stringify(diagnostics, null, 2));

  console.log(`[${timestamp}] Event: ${event} | Repo: ${diagnostics.repository}`);
  res.status(200).json(diagnostics);
}
