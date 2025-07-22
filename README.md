
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

hashtag-rotator-service/          ← ✅ Root folder (public-facing civic microservice)
├── api/                          ← 🔧 Serverless functions (Vercel Edge)
│   ├── cron.js                   ← Timestamp job for automation (now error-handled)
│   ├── health.js                 ← Service check + edge region awareness
│   └── trends.js                 ← Region-aware hashtag fetcher from Trends24
├── .gitignore                    ← 🧼 Filters out logs, builds, secrets (repo hygiene)
├── LICENSE                       ← 📜 MIT license for open-source freedom
├── README.md                     ← 📚 Project intro + usage + remix guidance
├── CONTRIBUTING.md               ← 🤝 Collaboration rules for remixers and maintainers
├── package.json                  ← 📦 Dependencies: axios, cheerio, etc.
├── test.sh                       ← 🧪 Endpoint tester with curl + logging + headers
├── vercel.json                   ← ⚙️ Deploy config:
│                                 ├── Cron job scheduler
│                                 ├── Geo-routing via rewrites (`/kenya-trends`)
│                                 └── Proxy config (`/data/:slug`)
└── test-log-*.txt                ← 🗒️ Timestamped test results (auto-created by `test.sh`)

Deployment Capabilities

- 💬 Endpoints: `/api/trends`, `/api/health`, `/api/cron`
- ⏰ Scheduled tasks: Vercel cron every morning
- 🌍 Geo-aware routing: `/kenya-trends` rewrite based on visitor country
- 🔍 Testing tool: `test.sh` to validate live health, trends, cron responses
- 🛡️ Built-in crash protection: try/catch guards in API handlers
- 📚 Open collaboration: Git-optimized layout + clear contributing flow

---

