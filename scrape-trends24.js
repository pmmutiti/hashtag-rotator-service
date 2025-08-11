// /api/scrape-trends24.js
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const url = 'https://trends24.in/kenya/';
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const hashtags = [];
    $('.trend-card li a').each((_, el) => {
      const tag = $(el).text().trim();
      if (tag.startsWith('#')) hashtags.push(tag);
    });

    const payload = {
      updated: new Date().toISOString(),
      hashtags: { kenya: hashtags }
    };

    const filePath = path.resolve('./public', 'trends24.json');
    fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));

    res.status(200).json({ status: 'Scrape successful', count: hashtags.length });
  } catch (err) {
    res.status(500).json({ error: 'Scrape failed', details: err.message });
  }
}
