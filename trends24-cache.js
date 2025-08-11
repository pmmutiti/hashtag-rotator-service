// /api/trends24-cache.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.resolve('./public', 'trends24.json');

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(data);
    res.status(200).json(json);
  } catch (err) {
    res.status(500).json({ error: 'Cache not found or unreadable', details: err.message });
  }
}
