import { getHashtagsForRegion } from './regions';
import { getFallbackHashtags } from './fallback';

export default function handler(req, res) {
  const { region } = req.query;
  const hashtags = getHashtagsForRegion(region) || getFallbackHashtags();

  res.status(200).json({
    region: region || 'fallback',
    hashtags,
    timestamp: new Date().toISOString(),
    source: 'rotator.js',
  });
}
