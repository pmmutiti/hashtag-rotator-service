export default async function handler(req, res) {
  const region = req.query.region || "kenya";

  const hashtags = {
    kenya: ["#AuditTheGhostProjects", "#FertilizerScamWatch", "#CivicSignalKE", "#PublicFundsTracker"],
    nigeria: ["#TrackTheScamsNG", "#GhostProjectsAlert", "#BudgetWatchNG"],
    india: ["#AuditYojana", "#NoGhostSchemes", "#CivicSignalIndia"],
    usa: ["#InfrastructureWatch", "#BudgetTransparency"],
    uk: ["#AuditTheCouncil", "#NoGhostContracts"]
  };

  const fallbackLogic = hashtags[region] ? "disabled" : "enabled";

  res.status(200).json({
    region,
    fallbackLogic,
    hashtags: hashtags[region] || [],
    timestamp: new Date().toISOString()
  });
}
