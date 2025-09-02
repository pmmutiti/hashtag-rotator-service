import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Public diagnostics

  const timestamp = new Date().toISOString();
  const commitHash = process.env.VERCEL_GIT_COMMIT_SHA || 'unknown';
  const regions = ['kenya', 'nigeria', 'ghana', 'southafrica', 'usa', 'uk', 'india'];

  const endpoints = regions.flatMap(region => [
    `/api/scrape-trends24?region=${region}`,
    `/api/rotator?region=${region}`
  ]).concat(['/api/crons']);

  const host = req.headers.host || process.env.VERCEL_URL || 'localhost';
  const base = host.startsWith('localhost') ? 'http' : 'https';

  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      const url = `${base}://${host}${endpoint}`;
      try {
        const response = await axios.get(url);
        const data = response.data;
        return {
          endpoint,
          status: '✅ Reachable',
          statusCode: response.status,
          fallbackUsed: data.fallbackUsed || false,
          updated: data.updated || data.timestamp || null,
          source: 'diagnostics.js'
        };
      } catch (err) {
        return {
          endpoint,
          status: '❌ Unreachable',
          error: err.message,
          source: 'diagnostics.js'
        };
      }
    })
  );

  const fallbackEnabled = results.some(r =>
    r.status === 'fulfilled' && r.value?.fallbackUsed
  );

  const endpointsReport = results.map(r =>
    r.status === 'fulfilled' ? r.value : {
      endpoint: 'unknown',
      status: '❌ Unreachable',
      error: r.reason?.message || 'Unknown error',
      source: 'diagnostics.js'
    }
  );

  res.status(200).json({
    status: '🧪 Diagnostics OK',
    deployed: true,
    timestamp,
    commitHash,
    regionsSupported: regions,
    fallbackEnabled,
    endpoints: endpointsReport,
    runtime: 'nodejs22.x'
  });
}
