// api/hashtag-rotator.js
import axios from 'axios';
import cheerio from 'cheerio';

export const config = {
  runtime: 'nodejs'
};

export default async function handler(req, res) {
  const { region = 'kenya' } = req.query;

  const mockTags = {
    usa: ["#BaddiesGoneWild", "#WWERAW"],
    ukraine: ["#Lviv", "#KyivSignal"],
    nigeria: ["#TrackTheScamsNG", "#GhostProjectsAlert"],
    india: ["#AuditYojana", "#NoGhostSchemes"],
    uk: ["#AuditTheCouncil", "#NoGhostContracts"]
  };

  // Live scrape for Kenya only
  if (region.toLowerCase() === 'kenya') {
    const TRENDS_URL = 'https://trendshashtags.com/twitter-trends/kenya/';
    try {
      const response = await axios.get(TRENDS_URL);
      const $ = cheerio.load(response.data);
      const hashtags = [];

      $('h2:contains("Kenya")')
        .next('ul')
        .find('li')
        .each((i, el) => {
          const tag = $(el).text().trim();
          if (tag.startsWith('#')) hashtags.push(tag);
        });

      if (hashtags.length === 0) throw new Error('No hashtags parsed');

      return res.status(200).json({
        region: 'kenya',
        fallbackLogic: 'disabled',
        hashtags,
        timestamp: new Date().toISOString(),
        source: TRENDS_URL
      });
    } catch (err) {
      console.error(`[❌] Kenya scrape failed: ${err.message}`);
      return res.status(500).json({
        region: 'kenya',
        fallbackLogic: 'enabled',
        hashtags: [],
        error: err.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Fallback for other regions
  const fallback = mockTags[region.toLowerCase()] || [];
  return res.status(200).json({
    region,
    fallbackLogic: fallback.length ? 'disabled' : 'enabled',
    hashtags: fallback,
    timestamp: new Date().toISOString()
  });
}
