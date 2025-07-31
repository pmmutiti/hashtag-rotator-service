
# 📡 hashtag-rotator-service _Modular serverless microservice for rotating regional hashtags, tracking civic events, and listening to GitHub deploy signals. Designed for dashboards, journalism tools, and remixable public infrastructure._ --- ## 🔍 How It Works - Parses live HTML from [Trends24](https://trends24.in) - Extracts trending hashtags per region - Exposes via public JSON API endpoints --- ## 🧪 API Endpoints ### `/api/trends?region=kenya` ```json { "region": "kenya", "hashtags": [ "#MaandamanoMondays", "#NairobiProtests", "#DigitalDignity" ] } 

💡 Valid regions include: kenya, usa, south-africa, india, nigeria

/api/health

Returns service diagnostics:

{ "status": "ok", "service": "hashtag-rotator-service", "edgeRegion": "sfo1", "timestamp": "2025-07-22T13:00:00.000Z" } 

Also responds with HTTP header: x-edge-region: sfo1

⏰ Scheduled Cron Task

Vercel triggers daily refresh via:

{ "crons": [ { "path": "/api/cron", "schedule": "0 10 * * *" } ] } 

Logs:

console.log("Cron triggered at", new Date().toISOString()); 

🚀 Deployment & Webhook Integration

Deploy via Vercel CLI:

vercel deploy 

Optional: Deploy hook:

curl -X POST https://api.vercel.com/v1/integrations/deploy/YOUR_PROJECT_ID/YOUR_HOOK_ID 

GitHub Webhook Listener

Endpoint: /api/github-webhook

Add GITHUB_WEBHOOK_SECRET to Vercel env varsRegister webhook with GitHubPayloads auto-logged to diagnostics/webhook-payloads/ 

📁 Project Structure

hashtag-rotator-service/ ├── api/ │ ├── cron.js │ ├── health.js │ ├── trends.js │ └── github-webhook.js ├── config/ │ └── webhook-events.json ├── diagnostics/ │ ├── delivery-log-*.txt │ ├── webhook-payloads/ │ └── errors/ ├── .gitignore ├── LICENSE ├── README.md ├── CONTRIBUTING.md ├── package.json ├── vercel.json ├── test.sh └── civic-preview.html 

🤝 Contributing

We welcome remixers and civic builders.

# Contribution Flow Fork → Branch → Commit → PR 

All code must follow naming and structure in CONTRIBUTING.md.

🧪 Local Testing

chmod +x test.sh ./test.sh 

Validates /api/cron, /api/health, and /api/trends.

📜 License

Released under MIT — free to remix, deploy, and repurpose for public good.

💬 Feedback or Issues?

Open an issue or contact @petermutiti
