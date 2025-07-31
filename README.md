
# 📡 Hashtag Rotator Service This serverless microservice fetches **real-time trending hashtags** from [Trends24.in](https://trends24.in) based on a region query. It's designed to power: - 🏛️ Civic dashboards - 📰 Data-driven journalism tools - 🎯 Rotating headline widgets that spotlight public conversations --- ## 🔧 How It Works - Fetches and parses live HTML from [Trends24](https://trends24.in) - Extracts trending hashtags by region - Returns structured JSON via a simple REST API --- ## 🧪 Example Endpoint ```http GET /api/trends?region=kenya 

Returns:

{ "region": "kenya", "hashtags": [ "#MaandamanoMondays", "#NairobiProtests", "#DigitalDignity" ] } 

💡 Valid regions include: kenya, usa, south-africa, india, nigeria (see trends24.in for full list)

🩺 Health Check

GET /api/health 

Returns:

{ "status": "ok", "service": "hashtag-rotator-service", "edgeRegion": "sfo1", // Vercel edge location "timestamp": "2025-07-22T13:00:00.000Z" } 

Also responds with HTTP header:

x-edge-region: sfo1 

⏰ Scheduled Cron Task

// vercel.json { "crons": [ { "path": "/api/cron", "schedule": "0 10 * * *" } ] } 

This pings /api/cron daily at 10:00 UTC (1PM Nairobi) to refresh hashtags or trigger updates.
You can trace execution in Vercel logs via:

console.log("Cron triggered at", new Date().toISOString()); 

🔥 Deployment

Manual Trigger via Vercel CLI

vercel deploy 

Optional: Deploy Hook

curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_L617KcSia649VrJ1fmAxziaOMqsZ/MDi3TFnUYo 

🗂️ Project Structure

hashtag-rotator-service/
├── api/
│   ├── cron.js               ← Timestamped auto-refresh (daily)
│   ├── health.js             ← Region-aware service diagnostics
│   ├── trends.js             ← Region-specific hashtag scraper
│   └── github-webhook.js     ← GitHub deployment event listener
├── config/
│   └── webhook-events.json   ← Deployment event map
├── diagnostics/
│   ├── delivery-log-*.txt    ← GitHub event metadata snapshots
│   ├── webhook-payloads/     ← Logged JSON payloads
│   └── errors/               ← Signature failures + endpoint issues
├── .gitignore                ← Repo hygiene + secret filtering
├── LICENSE                   ← MIT License
├── README.md                 ← This file
├── CONTRIBUTING.md           ← Guidelines for remixers and maintainers
├── package.json              ← Dependencies + type declarations
├── vercel.json               ← Route + build config for serverless deploy
├── test.sh                   ← Endpoint validation script (`curl` based)
└── civic-preview.html        ← Visual dashboard prototype (optional)

Deployment Capabilities

- 💬 Endpoints: `/api/trends`, `/api/health`, `/api/cron`
- ⏰ Scheduled tasks: Vercel cron every morning
- 🌍 Geo-aware routing: `/kenya-trends` rewrite based on visitor country
- 🔍 Testing tool: `test.sh` to validate live health, trends, cron responses
- 🛡️ Built-in crash protection: try/catch guards in API handlers
- 📚 Open collaboration: Git-optimized layout + clear contributing flow

---

