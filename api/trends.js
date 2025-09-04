// 🗣️ Civic Tech Hashtag Rotator — Region-Aware & Fully Merged
// MIT License — Free to remix, reuse, and improve

import axios from 'axios';
import cheerio from 'cheerio';

const REGION_MAP = {
  ke: ['#KenyaDecides', '#NairobiUpdates', '#BungeWatch'],
  ng: ['#NaijaTrending', '#OpenGovNG', '#LagosBuzz'],
  za: ['#MzansiVoices', '#SAParliament', '#CapeTownToday'],
  default: ['#CivicEngage', '#AccountabilityNow', '#OpenData']
};

const sources = {
  kenya: 'https://trends24.in/kenya/',
  usa: 'https://trends24.in/united-states/',
  uk: 'https://trends24.in/united-kingdom/',
  nigeria: 'https://trends24.in/nigeria/',
  india: 'https://trends24.in/india/'
};

const fallback = {
  kenya: ['#OccupyCBDTuesday', '#WeAreAllKikuyus', '#JusticeforJuliaNjoki'],
  usa: ['#BaddiesMidwest', '#Election2025'],
  uk: ['#BritishGP', '#LondonProtests'],
  nigeria: ['#EndSARS', '#NaijaTech'],
  india: ['#DigitalIndia', '#RightToInternet'],
  default: ['#BuildOverride', '#DashboardSilence']
};

// 🌍 Region detection (frontend)
export function getRegion() {
  try {
    const locale = navigator.language.toLowerCase();
    const code = locale.split('-')[1] || locale;
    return REGION_MAP[code] ? code : 'default';
  } catch (e) {
    console.warn('Region detection failed:', e);
    return 'default';
  }
}

// 🔁 Hashtag rotator (frontend)
export function startHashtagRotation(containerId, interval = 3000) {
  const region = getRegion();
  const hashtags = REGION_MAP[region];
  let index = 0;
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return;
  }
  container.textContent = hashtags[index];
  setInterval(() => {
    index = (index + 1) % hashtags.length;
    container.textContent = hashtags[index];
  }, interval);
}

// 🧵 Live trend injection (frontend)
export async function injectLiveTrends(regionCode) {
  try {
    const response = await fetch(`/api/trends?region=${regionCode}`);
    const data = await response.json();
    if (Array.isArray(data.hashtags)) {
      REGION_MAP[regionCode] = data.hashtags;
    }
  } catch (err) {
    console.error('Live trend fetch failed:', err);
  }
}

// 👟 Auto-init (frontend)
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    startHashtagRotation('hashtag-container');
  });
}

// 🧪 Serverless handler (backend)
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
    console.error(`❌ Scrape failed for ${region}:`, err.message);
    res.status(500).json({
      status: '❌ Scrape failed',
      region,
      source: url || 'unknown',
      hashtags: fallback[region] || fallback.default,
      updated: new Date().toISOString(),
      fallbackUsed: true,
      error: err.message
    });
  }
}
