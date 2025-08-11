// /api/scrape-trends24.js
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const url = 'https://trends24.in/kenya/';
  
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const hashtags = [];
    $('.trend-card li a').each((_, el) => {
      const tag = $(el).text().trim();
      if (tag.startsWith('#')) hashtags.push(tag);
    });

    if (hashtags.length === 0) {
      throw new Error('No hashtags found. The website structure may have changed.');
    }

    const payload = {
      updated: new Date().toISOString(),
      hashtags: { kenya: hashtags }
    };

    // Corrected: Removed file system write.
    // The data is now returned directly in the JSON response.
    res.status(200).json({ 
      status: 'Scrape successful', 
      payload, 
      count: hashtags.length 
    });
  } catch (err) {
    console.error('Scrape failed:', err);
    res.status(500).json({ error: 'Scrape failed', details: err.message });
  }
}
