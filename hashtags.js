// /api/hashtags.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const region = req.query.region || 'kenya';
  const filePath = path.resolve('./data', `${region}.json`);

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: `No cached hashtags found for region: ${region}` });
  }
}
