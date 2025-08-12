export default function handler(req, res) {
  res.status(200).json({
    title: 'Kenya Hashtag Rotator',
    description: 'Real-time civic hashtag rotation by region',
    author: 'Peter M. Mutiti',
    remixable: true,
    source: 'meta.js',
  });
}
