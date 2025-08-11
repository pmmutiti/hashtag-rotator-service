import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const region = req.query.region?.toLowerCase() || 'kenya';
  console.log(`[Hashtag Rotator] Region requested: ${region}`);

  const supportedRegions = ['kenya', 'usa', 'uk'];
  if (!supportedRegions.includes(region)) {
    return res.status(400).json({ 
      error: 'Unsupported region', 
      supportedRegions 
    });
  }

  const url = `https://trends24.in/${region}/`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const hashtags = [];

    // Corrected selector to be more resilient to website changes
    // This looks for any link whose URL contains "/hashtag/"
    $('a[href*="/hashtag/"]').each((_, el) => {
      const text = $(el).text().trim();
      // Ensure it's a hashtag and not an empty link text
      if (text.startsWith('#') && text.length > 1) {
        hashtags.push(text);
      }
    });

    if (hashtags.length === 0) {
      throw new Error('No hashtags found. The Trends24 website structure has likely changed again. The scraping selector needs to be updated.');
    }

    // Optional: Return only unique hashtags
    const uniqueHashtags = [...new Set(hashtags)];

    res.status(200).json({
      region,
      hashtags: uniqueHashtags
    });
  } catch (error) {
    console.error('Scraping failed:', error);
    res.status(500).json({ 
      error: 'Function crashed', 
      details: error.message 
    });
  }
}
