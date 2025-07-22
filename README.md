
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

hashtag-rotator-service/      ← 🟢 Root folder
├── api/                      ← 🔧 Vercel serverless functions
│   ├── trends.js             ← Region-aware hashtag fetcher
│   ├── cron.js               ← Daily scheduled task (e.g. timestamp log, refresh)
│   └── health.js             ← Edge region & service status monitor
├── vercel.json               ← Deployment config:
│                             ├─ Cron job scheduler
│                             └─ Geo-routed & proxy rewrites
├── test.sh                   ← 🧪 Endpoint test suite (curl-based + logging)
├── README.md                 ← 📚 Public-facing documentation for remixers
├── package.json              ← 📦 Dependencies: axios, cheerio, etc.
├── LICENSE                   ← 📜 MIT license for open-source reuse
└── .gitignore                ← 🧼 Clean commits: skip logs, node_modules, etc.


📝 License

This project is licensed under the MIT License. You are free to remix, reuse, and redistribute with attribution.

Signed-off-by: Peter M. Mutiti 52533415+pmmutiti@users.noreply.github.com

👥 Contributing

Please commit with --signoff and ensure you have rights to remix or submit codeOpen issues for feature requests, region support, or civic expansion ideasFork the project and amplify civic transparency ✊📊 

🙌 Acknowledgments

Built with 💚 for open-source civic tech by Peter M. Mutiti and remixers everywhere.
Special thanks to Trends24.in for powering hashtag awareness.

