export const REGIONS = {
  kenya: {
    name: 'Kenya 🇰🇪',
    source: 'https://trends.cyberkendra.com/kenya/',
    fallback: ['#JusticeforJuliaNjoki', '#OccupyCBDTuesday', '#WeAreAllKikuyus']
  },
  nigeria: {
    name: 'Nigeria 🇳🇬',
    source: 'https://trends.cyberkendra.com/nigeria/',
    fallback: ['#EndSARS', '#NaijaTech']
  },
  usa: {
    name: 'USA 🇺🇸',
    source: 'https://trends.cyberkendra.com/united-states/',
    fallback: ['#Election2025', '#BaddiesMidwest']
  },
  uk: {
    name: 'UK 🇬🇧',
    source: 'https://trends.cyberkendra.com/united-kingdom/',
    fallback: ['#BritishGP', '#LondonProtests']
  },
  india: {
    name: 'India 🇮🇳',
    source: 'https://trends.cyberkendra.com/india/',
    fallback: ['#DigitalIndia', '#RightToInternet']
  }
};

export const SELECTOR = 'ol.trend-card__list li a'; // For cheerio scraping

export const MAX_HASHTAGS = 10;

export const DIAGNOSTICS = {
  fallbackSignal: ['#BuildOverride', '#DashboardSilence'],
  timestampFormat: 'iso',
  emitSource: true
};
