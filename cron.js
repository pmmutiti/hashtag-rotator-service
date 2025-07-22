
{ "crons": [ { "path": "/api/cron", "schedule": "0 10 * * *" } ] } 

export default async function handler(req, res) { const now = new Date().toISOString(); // 🔁 Log to Vercel's serverless function log output console.log("Cron triggered at", now); res.status(200).json({ message: "Cron ran successfully", timestamp: now }); } 
