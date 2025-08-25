import axios from 'axios';
import cheerio from 'cheerio';

const sources = {
  kenya: 'https://trends.cyberkendra.com/kenya/',
  usa: 'https://trends.cyberkendra.com/united-states/',
  uk: 'https://trends.cyberkendra.com/united-kingdom/',
  nigeria: 'https://trends.cyberkendra.com/nigeria/',
  india: 'https://trends.cyberkendra.com/india/'
};

export default async function handler(req, res) {
  const region = req.query.region?.toLowerCase() || 'kenya';
  const url = sources[region];

  try {
    if (!url) throw new Error('Unsupported region');

    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const hashtags = [];

    $('.trend-card li a').each((i, el) => {
      const tag = $(el).text().trim();
      if (tag.startsWith('#')) hashtags.push(tag);
    });

    if (hashtags.length === 0) throw new Error('No hashtags parsed');

    res.status(200).json({
      region,
      hashtags: hashtags.slice(0, 10),
      timestamp: new Date().toISOString(),
      source: url,
      fallbackUsed: false
    });
  } catch (err) {
    res.status(500).json({
      region,
      hashtags: getFallbackHashtags(region),
      timestamp: new Date().toISOString(),
      source: 'fallback',
      fallbackUsed: true,
      error: err.message
    });
  }
}

function getFallbackHashtags(region) {
  const fallback = {
    kenya: ['#JusticeforJuliaNjoki', '#OccupyCBDTuesday', '#WeAreAllKikuyus'],
    usa: ['#BaddiesMidwest', '#Election2025', '#IndictmentWatch'],
    uk: ['#BritishGP', '#LondonProtests', '#NHSStrike'],
    nigeria: ['#EndSARS', '#NaijaVotes', '#LagosFloods'],
    india: ['#DigitalIndia', '#BharatBandh', '#Chandrayaan3']
  };
  return fallback[region] || ['#BuildOverride', '#DashboardSilence'];
}
