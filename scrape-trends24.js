import fetch from 'node-fetch';

export default async function handler(req, res) {
  const regions = ["kenya", "usa", "uk"];
  const scrapedHashtags = {};
  const regex = /#\w+/g;

  try {
    const promises = regions.map(async (region) => {
      const response = await fetch(`https://trends24.in/${region}/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch trends for region: ${region}`);
      }
      const html = await response.text();
      const hashtags = (html.match(regex) || []).slice(0, 5);
      return { region, hashtags };
    });

    const results = await Promise.all(promises);

    results.forEach(result => {
      scrapedHashtags[result.region] = result.hashtags;
    });

  } catch (error) {
    console.error("Scraping error:", error.message);
    regions.forEach(region => {
      scrapedHashtags[region] = [];
    });
  }

  res.status(200).json({
    timestamp: new Date().toISOString(),
    scrapedHashtags
  });
}
