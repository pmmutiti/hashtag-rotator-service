// trendingHashtagsAPI.js
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
const PORT = process.env.PORT || 3000;
const cache = new NodeCache({ stdTTL: 3600 }); // 1 hour TTL

const TRENDS_URL = 'https://trendshashtags.com/twitter-trends/kenya/'; // Replace with a real API if available

// Fetch and cache trending hashtags
async function fetchTrendingHashtags() {
  try {
    const response = await axios.get(TRENDS_URL);
    const hashtags = parseHashtags(response.data); // Custom parser based on site structure
    cache.set('trendingHashtags', hashtags);
    console.log(`[Hashtag Fetcher] Updated at ${new Date().toISOString()}`);
  } catch (err) {
    console.error('Failed to fetch hashtags:', err.message);
  }
}

// Dummy parser (replace with real logic based on HTML or API response)
function parseHashtags(html) {
  // Example: extract hashtags from HTML or JSON
  return [
    '#OccupyCBDTuesday',
    '#WeAreAllKikuyus',
    '#DigitalInclusion',
    '#WhyRutoStoppedBBI',
    '#HappyNewMonth'
  ];
}

// Endpoint: Get current trending hashtags
app.get('/api/hashtags/trending', (req, res) => {
  const hashtags = cache.get('trendingHashtags');
  if (!hashtags) return res.status(503).json({ error: 'Hashtags not available yet' });

  res.json({
    timestamp: new Date().toISOString(),
    source: TRENDS_URL,
    hashtags
  });
});

// Health check
app.get('/api/hashtags/health', (req, res) => {
  const loaded = cache.has('trendingHashtags');
  res.json({ status: loaded ? 'ok' : 'pending', lastUpdated: cache.getTtl('trendingHashtags') });
});

// Start server and schedule hourly fetch
app.listen(PORT, () => {
  console.log(`🚀 Trending Hashtag API running on port ${PORT}`);
  fetchTrendingHashtags(); // Initial fetch
  setInterval(fetchTrendingHashtags, 3600000); // Every hour
});
