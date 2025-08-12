export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    deployed: true,
    timestamp: new Date().toISOString(),
    regionsSupported: ['nairobi', 'rift', 'coast', 'western'],
    fallbackEnabled: true,
    source: 'diagnostics.js',
  });
}
