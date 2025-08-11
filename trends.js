export default async function handler(req, res) {
  const region = req.query.region === 'auto'
    ? req.headers['x-vercel-ip-country'] === 'KE' ? 'kenya' : 'global'
    : req.query.region;

  const fallback = {
    kenya: ["#JusticeforJuliaNjoki", "#ShootFirstSir"],
    global: ["#ClimateAction", "#DigitalRights"]
  };

  res.status(200).json({
    region,
    hashtags: fallback[region] || fallback.global,
    updated: new Date().toISOString()
  });
}
