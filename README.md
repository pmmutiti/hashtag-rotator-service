
```md
# 📡 hashtag-rotator-service

_Modular serverless microservice for rotating region-aware hashtags, logging GitHub events, and powering public dashboards. Ideal for civic technologists, journalists, and remixers._

---

## 🧠 About This Project

This project fetches real-time trending hashtags from [Trends24](https://trends24.in) and serves them via region-specific API endpoints. It includes scheduled cron tasks, GitHub webhook logging, and geo-aware routing — all deployed seamlessly on [Vercel](https://vercel.com).

Key use cases:
- 🏛️ Civic dashboards
- 📰 Media headline rotators
- 🧩 Remixable region-aware tools

---

## 🛠️ Features

| Capability             | Details                                                                 |
|------------------------|-------------------------------------------------------------------------|
| 💬 API Endpoints       | `/api/trends`, `/api/health`, `/api/cron`, `/api/github-webhook`        |
| ⏰ Cron Scheduling      | Vercel triggers `/api/cron` daily at 10:00 UTC (1PM Nairobi)             |
| 📡 GitHub Webhook      | Endpoint logs event payloads to `diagnostics/` with HMAC verification   |
| 🌍 Geo Routing          | Kenya visitors rerouted to `/kenya-trends` using IP headers             |
| 🛡️ Crash Protection     | All handlers use `try/catch` blocks for resilience                      |
| 🔍 Testing Script       | `test.sh` validates endpoint response and logs headers                  |

---

## 🚀 Quick Start Guide

### 1. Fork + Clone

```bash
git clone https://github.com/petermutiti/hashtag-rotator-service.git
cd hashtag-rotator-service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Endpoint Tests

```bash
chmod +x test.sh
./test.sh
```

---

## 🔁 GitHub Webhook Setup

1. Add a secret `GITHUB_WEBHOOK_SECRET` in Vercel env variables  
2. Configure webhook to post to:

```
https://your-vercel-domain/api/github-webhook
```

3. Payloads will auto-log to:

```
diagnostics/webhook-payloads/
diagnostics/delivery-log-*.txt
```

---

## 🌐 Project Structure

```plaintext
hashtag-rotator-service/
├── api/
│   ├── cron.js               ← Timestamped auto-refresh (daily)
│   ├── health.js             ← Region-aware diagnostics
│   ├── trends.js             ← Hashtag scraper
│   └── github-webhook.js     ← GitHub deploy event listener
├── config/
│   └── webhook-events.json   ← Event routing map
├── diagnostics/
│   ├── delivery-log-*.txt    ← GitHub delivery logs
│   ├── webhook-payloads/     ← Event JSON snapshots
│   └── errors/               ← Signature errors + tracebacks
├── civic-preview.html        ← Dashboard preview template
├── test.sh                   ← Endpoint validation script
├── CONTRIBUTING.md           ← Contribution guide
├── LICENSE                   ← MIT License
├── README.md                 ← This file
├── package.json              ← Dependencies
└── vercel.json               ← Builds, crons, rewrites, and routes
```

---

## 🤝 Contributing

We welcome civic remixers and public infrastructure collaborators.  
Please follow these steps:

1. Fork this repo  
2. Create your feature branch (`feat:region-routing`)  
3. Commit changes with semantic tags (`fix:`, `feat:`, `docs:`)  
4. Submit a Pull Request

See `CONTRIBUTING.md` for standards and best practices.

---

## 📜 License

Licensed under MIT. You are free to remix, fork, extend, and redeploy.  
Attribution encouraged, civic transparency expected.

---

## 💬 Support

For deployment help or remix integration, contact [@pmmutiti](https://github.com/pmmutiti).  
You may also open an issue or start a discussion thread.

```

