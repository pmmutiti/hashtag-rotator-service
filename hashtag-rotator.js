// /api/hashtag-rotator.js

export default async function handler(req, res) {
  const region = req.query.region?.toLowerCase() || "kenya";

  // 🔍 Replace this with a real civic hashtag fetcher (e.g. CyberKendra scraper)
  const civicHashtags = await getLiveHashtags(region);

  if (!civicHashtags || civicHashtags.length === 0) {
    return res.status(200).json({
      timestamp: new Date().toISOString(),
      region,
      hashtags: [],
      error: "No civic hashtags found for this region"
    });
  }

  res.status(200).json({
    timestamp: new Date().toISOString(),
    region,
    hashtags: civicHashtags
  });
}

// 🧪 Stub: Replace with verified civic source
async function getLiveHashtags(region) {
  const verified = {
    kenya: [
      "#AuditTheGhostProjects",
      "#FertilizerScamWatch",
      "#CivicSignalKE",
      "#PublicFundsTracker"
    ],
    usa: [
      "#InfrastructureWatch",
      "#CivicOversightUSA",
      "#BudgetTransparency",
      "#NoMorePhantomSpending"
    ],
    uk: [
      "#AuditTheCouncil",
      "#CivicSignalUK",
      "#PublicFundsWatch",
      "#NoGhostContracts"
    ],
    nigeria: [
      "#TrackTheScamsNG",
      "#CivicSignalNigeria",
      "#GhostProjectsAlert",
      "#BudgetWatchNG"
    ],
    india: [
      "#AuditYojana",
      "#CivicSignalIndia",
      "#PublicFundsIndia",
      "#NoGhostSchemes"
    ]
  };

  return verified[region] || [];
}
