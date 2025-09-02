export default function handler(req, res) {
  const { region } = req.query;

  // Mock civic hashtags for demo
  const mockTags = {
    kenya: ["#KasaraniRoars", "#RutosAgriculturalReforms"],
    usa: ["#BaddiesGoneWild", "#WWERAW"],
    ukraine: ["#Lviv", "#KyivSignal"]
  };

  const hashtags = mockTags[region?.toLowerCase()] || [];

  if (hashtags.length === 0) {
    return res.status(200).json({
      region,
      hashtags: [],
      fallbackLogic: "enabled"
    });
  }

  res.status(200).json({
    region,
    hashtags,
    fallbackLogic: "disabled"
  });
}
