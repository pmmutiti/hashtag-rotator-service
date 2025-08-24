export default async function handler(req, res) {
  const timestamp = new Date().toISOString();
  const regions = [
    "kenya", "nigeria", "ghana", "southafrica",
    "usa", "uk", "canada", "france",
    "netherlands", "india", "japan", "israel"
  ];

  const fallbackMap = {
    kenya: ["#JusticeKE", "#OpenNairobi", "#NairobiWatch"],
    nigeria: ["#NaijaTech", "#EndSARS", "#CivicNaija"],
    ghana: ["#AccraCivic", "#OpenGhana", "#GhanaPulse"],
    southafrica: ["#YouthVoteSA", "#OpenSA", "#SAWatch"],
    usa: ["#VoteReady", "#DigitalRights", "#CivicPulse"],
    uk: ["#AIRegulation", "#ClimateActionUK", "#OpenGovUK"],
    canada: ["#OpenCanada", "#CivicNorth", "#TorontoPulse"],
    france: ["#JusticeFrance", "#OpenFR", "#ParisWatch"],
    netherlands: ["#OpenDataNL", "#CivicNL", "#AmsterdamPulse"],
    india: ["#DigitalIndia", "#OpenIndia", "#CivicBharat"],
    japan: ["#TokyoPulse", "#OpenJP", "#CivicJapan"],
    israel: ["#CyberPolicyIL", "#TelAvivProtests", "#OpenIsrael"]
  };

  const rotated = {};
  for (const region of regions) {
    const tags = fallbackMap[region];
    rotated[region] = tags?.[Math.floor(Math.random() * tags.length)] || "#CivicGlobal";
  }

  const payload = {
    rotatedAt: timestamp,
    hashtags: rotated,
    diagnostics: {
      status: "✅ Rotation complete",
      totalRegions: regions.length,
      timestamp,
      fallbackUsed: true,
      source: "fallbackMap"
    }
  };

  // Instead of writing to disk, return JSON for webhook or dashboard fetch
  res.status(200).json(payload);
}
