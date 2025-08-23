// api/hashtags.js
import axios from 'axios';
import cheerio from 'cheerio';

let cachedHashtags = [];
let lastFetched = 0;
const TRENDS_URL = 'https://trendshashtags.com/twitter-trends/kenya/';
const ONE_HOUR = 60 * 60 * 1000;

export default async function handler(req, res) {
  const now = Date.now();

  if (now - lastFetched > ONE_HOUR || cachedHashtags.length === 0) {
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

      cachedHashtags = hashtags;
      lastFetched = now;
      console.log(`[✅] Hashtags refreshed at ${new Date().toISOString()}`);
    } catch (err) {
      console.error(`[❌] Failed to fetch hashtags: ${err.message}`);
      return res.status(500).json({ error: 'Failed to fetch hashtags', details: err.message });
    }
  }

  const index = Math.floor((now / ONE_HOUR) % cachedHashtags.length);
  const currentHashtag = cachedHashtags[index];

  res.status(200).json({
    timestamp: new Date().toISOString(),
    source: TRENDS_URL,
    hashtag: currentHashtag,
    allHashtags: cachedHashtags
  });
}
