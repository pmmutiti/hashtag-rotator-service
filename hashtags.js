// api/hashtags.js
import axios from 'axios';

let cachedHashtags = [];
let lastFetched = 0;
const TRENDS_URL = 'https://trendshashtags.com/twitter-trends/kenya/';
const ONE_HOUR = 60 * 60 * 1000;

export default async function handler(req, res) {
  const now = Date.now();

  // Refresh if older than 1 hour
  if (now - lastFetched > ONE_HOUR || cachedHashtags.length === 0) {
    try {
      const response = await axios.get(TRENDS_URL);
      cachedHashtags = extractHashtags(response.data); // Replace with real parser
      lastFetched = now;
      console.log(`[✅] Hashtags refreshed at ${new Date().toISOString()}`);
    } catch (err) {
      console.error(`[❌] Failed to fetch hashtags: ${err.message}`);
      return res.status(500).json({ error: 'Failed to fetch hashtags' });
    }
  }

  // Serve current hashtag (rotated)
  const index = Math.floor((now / ONE_HOUR) % cachedHashtags.length);
  const currentHashtag = cachedHashtags[index];

  res.status(200).json({
    timestamp: new Date().toISOString(),
    source: TRENDS_URL,
    hashtag: currentHashtag,
    allHashtags: cachedHashtags
  });
}

// Dummy parser — replace with real HTML parsing logic
function extractHashtags(html) {
  return [
    '#OccupyCBDTuesday',
    '#WeAreAllKikuyus',
    '#DigitalInclusion',
    '#WhyRutoStoppedBBI',
    '#HappyNewMonth'
  ];
}
