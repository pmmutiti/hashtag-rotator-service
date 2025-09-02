import fs from 'fs';
import path from 'path';
import axios from 'axios';
import cheerio from 'cheerio';

const sources = {
  kenya: 'https://trends24.in/kenya/',
  usa: 'https://trends24.in/united-states/',
  uk: 'https://trends24.in/united-kingdom/',
  nigeria: 'https://trends24.in/nigeria/',
  india: 'https://trends24.in/india/'
};

const fallback = {
  kenya: ['#OccupyCBDTuesday', '#WeAreAllKikuyus', '#JusticeForJuliaNjoki'],
  usa: ['#BaddiesMidwest', '#Election2025'],
  uk: ['#BritishGP', '#LondonProtests'],
  nigeria: ['#EndSARS', '#NaijaTech'],
  india: ['#DigitalIndia', '#RightToInternet']
};

async function scrape(region) {
  const url = sources[region];
  if (!url) return { region, hashtags: fallback[region] || [], fallbackUsed: true };

  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const hashtags = [];

    $('.trend-card__list li a').each((_, el) => {
      const tag = $(el).text().trim();
      if (tag.startsWith('#')) hashtags.push(tag);
    });

    if (hashtags.length === 0) throw new Error('No hashtags found');

    return {
      region,
      hashtags: hashtags.slice(0, 10),
      fallbackUsed: false
    };
  } catch (err) {
    console.warn(`⚠️ Scrape failed for ${region}: ${err.message}`);
    return {
      region,
      hashtags: fallback[region] || [],
      fallbackUsed: true
    };
  }
}

(async () => {
  const timestamp = new Date().toISOString();
  const output = {};

  for (const region of Object.keys(sources)) {
    const result = await scrape(region);
    output[region] = {
      ...result,
      updated: timestamp,
      source: sources[region]
    };
  }

  const filePath = path.join(process.cwd(), 'data', 'hashtags.json');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(output, null, 2));

  console.log(`✅ Civic hashtags built at ${filePath}`);
})();
