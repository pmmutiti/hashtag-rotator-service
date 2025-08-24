import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const signature = req.headers['x-hub-signature-256'] || req.headers['X-Hub-Signature-256'];
    const payload = JSON.stringify(req.body);

    if (!signature || !WEBHOOK_SECRET) {
      throw new Error('Missing signature
