import { writeFile } from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const timestamp = new Date().toISOString();
  const regions = [
    "kenya", "nigeria", "ghana", "southafrica",
    "usa", "uk", "canada", "france",
    "netherlands", "india", "japan", "israel"
  ];

  // Fallback hashtags per region
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

  // Rotate one hashtag per region
  const rotated = {};
  for (const region of regions) {
    const tags = fallbackMap[region] || [];
    const index = Math.floor(Math.random() * tags.length);
    rotated[region] = tags[index] || "#CivicGlobal";
  }

  // Sync metadata to public cache
  const metadata = {
    rotatedAt: timestamp,
    regions,
    hashtags: rotated,
    diagnostics: {
      status: "✅ Rotation complete",
      totalRegions: regions.length,
      timestamp
    }
  };

  const filePath = path.join(process.cwd(), 'public', 'fallback-rotator.json');
  await writeFile(filePath, JSON.stringify(metadata, null, 2));

  res.status(200).json({
    status: "✅ Cron executed",
    rotated,
    diagnostics: metadata.diagnostics
  });
}
