export default async function handler(req, res) {
  const regions = ["kenya", "usa", "uk"];
  const scraped = {};

  await Promise.all(regions.map(async (region) => {
    try {
      const html = await fetch(`https://trends24.in/${region}/`).then(r => r.text());
      const matches = html.match(/#\w+/g);
      scraped[region] = matches ? matches.slice(0, 5) : [];
    } catch (err) {
      scraped[region] = [];
    }
  }));

  const timestamp = new Date().toISOString();
  res.status(200).json({ updated: timestamp, hashtags: scraped });
}

