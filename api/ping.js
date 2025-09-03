import axios from 'axios';

export default async function handler(req, res) {
  const timestamp = new Date().toISOString();

  const endpoints = [
    '/api/trends24-cache?region=kenya',   // ✅ Fixed typo
    '/api/rotator?region=kenya',
    '/api/crons',
    '/api/meta',
    '/api/github-webhook',
    '/api/webhook-diagnostics'
  ];

  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      const base = req.headers.host?.startsWith('localhost') ? 'http' : 'https';
      const url = `${base}://${req.headers.host}${endpoint}`;
      try {
        const { status } = await axios.get(url);
        return {
          endpoint,
          statusCode: status,
          reachable: true,
          url
        };
      } catch (err) {
        return {
          endpoint,
          reachable: false,
          error: err.message,
          url
        };
      }
    })
  );

  const unreachable = results.filter(r => r.status === 'rejected');
  const allHealthy = unreachable.length === 0;

  res.status(200).json({
    status: allHealthy ? '🟢 All endpoints reachable' : '⚠️ Some endpoints unreachable',
    timestamp,
    diagnostics: results.map(r => r.value || r.reason)
  });
}
