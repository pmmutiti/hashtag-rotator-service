import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Public access

  const timestamp = new Date().toISOString();
  const commitHash = process.env.VERCEL_GIT_COMMIT_SHA || 'unknown';
  const regions = ['kenya', 'nigeria', 'ghana', 'southafrica', 'usa', 'uk', 'india'];

  const endpoints = regions.flatMap(region => [
    `/api/scrape-trends24?region=${region}`,
    `/api/rotator?region=${region}`
  ]).concat(['/api/crons']);

  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      const base = req.headers.host.startsWith('localhost') ? 'http' : 'https';
      const url = `${base}://${req.headers.host}${endpoint}`;
      try {
        const response = await axios.get(url);
        const data = response.data;
        return {
          endpoint,
          status: '✅ Reachable',
          statusCode: response.status,
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

  const fallbackEnabled = results.some(r =>
    r.status === 'fulfilled' && r.value?.fallbackUsed
  );

  res.status(200).json({
    status: '🧪 Diagnostics OK',
    deployed: true,
    timestamp,
    commitHash,
    regionsSupported: regions,
    fallbackEnabled,
    endpoints: results.map(r => r.value || r.reason),
    source: 'diagnostics.js'
  });
}
