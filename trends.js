// /api/trends.js
import fetch from 'node-fetch';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const region = req.query.region || 'kenya';
  const url = `https://trends24.in/${region}/`;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const hashtags = [];
    $('ol.trend-card li a').each((i, el) => {
      const tag = $(el).text().trim();
      if (tag.startsWith('#')) hashtags.push(tag);
    });

    res.status(200).json({ region, hashtags: hashtags.slice(0, 10), timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hashtags', fallback: [`#${region}Trending`] });
  }
}
