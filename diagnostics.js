import axios from 'axios';

export default async function handler(req, res) {
  const timestamp = new Date().toISOString();
  const regions = ['kenya', 'nigeria', 'ghana', 'southafrica', 'usa', 'uk', 'india'];

  const endpoints = [
    '/api/scrape-trends24?region=kenya',
    '/api/rotator?region=kenya',
    '/api/crons'
  ];

  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      const base = req.headers.host.startsWith('localhost') ? 'http' : 'https';
      const url = `${base}://${req.headers.host}${endpoint}`;
      try {
        const { data } = await axios.get(url);
        return {
          endpoint,
          status: '✅ Reachable',
          fallbackUsed: data.fallbackUsed || false,
          updated: data.updated || data.timestamp || null
        };
      } catch (err) {
        return {
          endpoint,
          status: '❌ Unreachable',
          error: err.message
        };
      }
    })
  );

  res.status(200).json({
    status: '🧪 Diagnostics OK',
    deployed: true,
    timestamp,
    regionsSupported: regions,
    fallbackEnabled: results.some(r => r.value?.fallbackUsed),
    endpoints: results.map(r => r.value || r.reason),
    source: 'diagnostics.js'
  });
}
