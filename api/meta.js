export default function handler(req, res) {
  res.status(200).json({
    title: 'Kenya Hashtag Rotator',
    description: 'Real-time civic hashtag rotation by region',
    author: 'Peter M. Mutiti',
    remixable: true,
    source: 'meta.js',
    version: '1.0.3',
    updated: new Date().toISOString(),
    regionsSupported: ['kenya', 'usa', 'uk', 'nigeria', 'india'],
    endpointsAvailable: [
      '/api/trends',
      '/api/hashtags',
      '/api/trendingHashtags',
      '/api/trends24-cache',
      '/api/rotator',
      '/api/hashtag-rotator',
      '/api/hashtag-rotator-service',
      '/api/crons',
      '/api/github-webhook',
      '/api/webhook-diagnostics',
      '/api/scrape-trends24',
      '/api/webhook-listener',
      '/api/meta'
    ]
  });
}
