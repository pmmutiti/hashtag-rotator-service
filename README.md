
# 📡 hashtag-rotator-service

_Modular civic microservice for rotating regional hashtags, tracking GitHub deploy events, and powering public dashboards. Designed for journalists, technologists, and remixers focused on public transparency and engagement._

---

## 🔍 Overview

Fetches trending hashtags from [Trends24.in](https://trends24.in) based on region input, and exposes them via edge-ready API endpoints. Logs GitHub webhook deliveries, includes scheduled cron refresh, and supports geo-aware routing — deployable via Vercel.

---

## 🧪 API Endpoints

### `/api/trends?region=kenya`

```json
{
  "region": "kenya",
  "hashtags": [
    "#MaandamanoMondays",
    "#NairobiProtests",
    "#DigitalDignity"
  ]
}
```

💡 Valid regions: `kenya`, `usa`, `south-africa`, `india`, `nigeria`, etc.

---

### `/api/health`

Returns status + edge metadata:

```json
{
  "status": "ok",
  "service": "hashtag-rotator-service",
  "edgeRegion": "sfo1",
  "timestamp": "2025-07-31T06:00:00.000Z"
}
```

Responds with HTTP header: `x-edge-region: sfo1`

---

## ⏰ Scheduled Cron

Configured in `vercel.json` to trigger at 10:00 UTC (1PM Nairobi):

```json
{
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "0 10 * * *"
    }
  ]
}
```

Logs timestamp:
```js
console.log("Cron triggered at", new Date().toISOString());
```

---

## 📡 GitHub Webhook Listener

Endpoint: `/api/github-webhook`

- HMAC-verified using `GITHUB_WEBHOOK_SECRET`
- Incoming payloads logged in `diagnostics/webhook-payloads/`
- Delivery logs timestamped to `diagnostics/delivery-log-*.txt`

Example log:
```json
{
  "event": "push",
  "repo": "hashtag-rotator-service",
  "timestamp": "2025-07-31T07:20:00Z"
}
```

---

## 🗂️ Project Structure

```plaintext
hashtag-rotator-service/
├── api/
│   ├── cron.js               ← Daily timestamped auto-refresh
│   ├── health.js             ← Region-aware diagnostics
│   ├── trends.js             ← Hashtag scraper from Trends24.in
│   └── github-webhook.js     ← GitHub deploy event logger
├── config/
│   └── webhook-events.json   ← Event routing map
├── diagnostics/
│   ├── delivery-log-*.txt    ← GitHub delivery metadata
│   ├── webhook-payloads/     ← JSON payload snapshots
│   └── errors/               ← Signature mismatch traces
├── .gitignore                ← Clean secrets, logs, and builds
├── LICENSE                   ← MIT — free to remix
├── README.md                 ← This file
├── CONTRIBUTING.md           ← Remix guidelines + standards
├── package.json              ← Dependencies: axios, cheerio, crypto, etc.
├── vercel.json               ← Builds, crons, rewrites, webhook routes
├── test.sh                   ← Endpoint testing script (`curl` based)
└── civic-preview.html        ← Visual dashboard template (optional)
```

---

## 🚀 Deployment

```bash
vercel deploy
```

Or trigger via deploy hook:

```bash
curl -X POST https://api.vercel.com/v1/integrations/deploy/YOUR_PROJECT_ID/YOUR_HOOK_ID
```

---

## 🌍 Geo-Aware Routing

Visitors from Kenya are redirected to:

```json
{
  "source": "/kenya-trends",
  "has": [
    {
      "type": "header",
      "key": "x-vercel-ip-country",
      "value": "KE"
    }
  ],
  "destination": "/api/trends?region=kenya"
}
```

Fallback:
```json
{
  "source": "/kenya-trends",
  "destination": "/api/trends?region=global"
}
```

---

## 🔍 Local Testing

Make `test.sh` executable:

```bash
chmod +x test.sh
./test.sh
```

Tests:
- `/api/health`
- `/api/trends`
- `/api/cron`
- Logs response status + headers

---

## 🤝 Contribution Workflow

We welcome civic-minded remixers.

```bash
# Steps to contribute:
Fork → Branch → Commit → Pull Request
```

Use semantic commits (`fix:`, `feat:`, `docs:`) and follow style rules in `CONTRIBUTING.md`.

---

## 📜 License

MIT — free to remix, fork, and deploy. Attribution encouraged.

---

## 💬 Support

Open an issue or contact [@petermutiti](https://github.com/petermutiti).  
For civic dashboard integration, deployment issues, or webhook tracing — we respond.

```
