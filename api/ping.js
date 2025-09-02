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
      const base = req.headers.host.startsWith('localhost') ? 'http' : 'https';
      const url = `${base}://${req.headers.host}${endpoint}`;
      try {
        const { status } = await axios.get(url);
        return { endpoint, statusCode: status, reachable: true };
      } catch (err) {
        return { endpoint, reachable: false, error: err.message };
      }
    })
  );

  res.status(200).json({
    status: "🟢 Ping OK",
    timestamp,
    diagnostics: results.map(r => r.value || r.reason)
  });
}
