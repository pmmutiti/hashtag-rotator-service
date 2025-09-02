// build.js
import fs from 'fs';
import https from 'https';

// 🔗 Source URL for Kenya trends
const TRENDS_URL = 'https://trends24.in/kenya/';

// 🧠 Fetch HTML from trends24.in
function fetchTrends(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// 🧠 Extract hashtags using regex
function extractHashtags(html) {
  const matches = [...html.matchAll(/<a href="\/topics\/[^"]+">#([^<]+)<\/a>/g)];
  return matches.slice(0, 10).map(m => `#${m[1]}`);
}

// 🧠 Write hashtags to tags.txt
function writeTagsFile(tags) {
  fs.writeFileSync('tags.txt', tags.join('\n'), 'utf8');
}

// 🧠 Build kenya.json
function buildKenyaJson(tags) {
  const json = {
    region: 'kenya',
    tags,
    timestamp: new Date().toISOString()
  };
  fs.mkdirSync('data', { recursive: true });
  fs.writeFileSync('data/kenya.json', JSON.stringify(json, null, 2), 'utf8');
}

// 🧠 Copy files to public/ for Vercel
function copyToPublic() {
  fs.mkdirSync('public', { recursive: true });
  fs.copyFileSync('data/kenya.json', 'public/kenya.json');
  fs.copyFileSync('tags.txt', 'public/tags.txt');
}

// 🧠 Main build routine
(async () => {
  try {
    const html = await fetchTrends(TRENDS_URL);
    const tags = extractHashtags(html);
    writeTagsFile(tags);
    buildKenyaJson(tags);
    copyToPublic();
    console.log('✅ Civic build complete. Assets ready in /public');
  } catch (err) {
    console.error('❌ Build failed:', err.message);
    process.exit(1);
  }
})();
