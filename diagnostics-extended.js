import axios from 'axios';

export default async function handler(req, res) {
  const timestamp = new Date().toISOString();
  const endpoints = [
    '/api/trends24-cashe?region=kenya',
    '/api/rotator?region=kenya',
    '/api/crons'
  ];

  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      try {
        const { data } = await axios.get(`${req.headers.host.startsWith('localhost') ? 'http' : 'https'}://${req.headers.host}${endpoint}`);
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

  const diagnostics = {
    timestamp,
    region: process.env.VERCEL_REGION || 'unknown',
    env: process.env.NODE_ENV || 'development',
    endpoints: results.map(r => r.value || r.reason)
  };

  res.status(200).json({
    status: '🧪 Extended Diagnostics OK',
    diagnostics
  });
}
