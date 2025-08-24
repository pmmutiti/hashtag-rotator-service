import axios from 'axios';
import cheerio from 'cheerio';

const sources = {
  kenya: 'https://trends24.in/kenya/',
  usa: 'https://trends24.in/united-states/',
  uk: 'https://trends24.in/united-kingdom/',
  nigeria: 'https://trends24.in/nigeria/',
  india: 'https://trends24.in/india/'
};

export default async function handler(req, res) {
  const region = req.query.region?.toLowerCase() || 'kenya';
  const url = sources[region];

  try {
    if (!url) throw new Error(`Unsupported region: ${region}`);

    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const hashtags = [];

    $('.trend-card__list li a').each((_, el) => {
      const tag = $(el).text().trim();
      if (tag.startsWith('#')) hashtags.push(tag);
    });

    if (hashtags.length === 0) throw new Error('No hashtags found. Site structure may have changed.');

    res.status(200).json({
      status: '✅ Scrape successful',
      region,
      source: url,
      hashtags: hashtags.slice(0, 10),
      updated: new Date().toISOString(),
      fallbackUsed: false
    });
  } catch (err) {
    console.error('❌ Scrape failed:', err.message);
    res.status(500).json({
      status: '❌ Scrape failed',
      region,
      source: url || 'unknown',
      hashtags: getFallback(region),
      updated: new Date().toISOString(),
      fallbackUsed: true,
      error: err.message
    });
  }
}

function getFallback(region) {
  const fallback = {
    kenya: ['#OccupyCBDTuesday', '#WeAreAllKikuyus', '#JusticeforJuliaNjoki'],
    usa: ['#BaddiesMidwest', '#Election2025'],
    uk: ['#BritishGP', '#LondonProtests'],
    nigeria: ['#EndSARS', '#NaijaTech'],
    india: ['#DigitalIndia', '#RightToInternet']
  };
  return fallback[region] || ['#BuildOverride', '#DashboardSilence'];
}
