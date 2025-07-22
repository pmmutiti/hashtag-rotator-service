
export default async function handler(req, res) { const now = new Date().toISOString(); console.log("Cron triggered at", now); res.status(200).json({ message: "Cron ran successfully", timestamp: now }); } 
