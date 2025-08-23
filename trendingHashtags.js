// /api/fetchHashtags.js
import axios from 'axios';
import cheerio from 'cheerio';

const ghostTags = [
  '#FreeLaptopKE',
  '#GovtDelivers',
  '#ScamAlert',
  '#GhostSchool',
  '#FakeTender',
  '#BotTrending'
];

export default async function handler(req, res) {
  const region = req.query.region?.toLowerCase() || 'kenya';
  const url = `https://trends24.in/${region}/`;

  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const tags = [];
    $('.trend-card li a').each((i, el) => {
      const tag = $(el).text().trim();
      if (tag.startsWith('#') && !ghostTags.includes(tag)) {
        tags.push(tag);
      }
    });

    res.status(200).json({
      region,
      timestamp: new Date().toISOString(),
      source: url,
      tags: tags.slice(0, 10)
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch hashtags',
      details: error.message,
      region,
      source: url
    });
  }
}
