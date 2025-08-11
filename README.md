# 🌍 Hashtag Rotator Service

A modular, serverless civic tech system that rotates trending hashtags across regions, verifies webhook events, and exposes public diagnostics. Built for remixers, auditors, and civic dashboards in Kenya and beyond.

---

## 🚀 Features

- 🔁 Auto-rotating civic hashtags per region
- 📡 Webhook listener with signature verification
- 🛠️ Public diagnostics and fallback logic
- 🧩 Modular API endpoints for trends, rotation, and logging
- ⏰ Vercel cron support for hourly scraping and periodic rotation
- 📜 Public JSON logs for observability and auditability

---

## 📦 Installation

```bash
git clone https://github.com/pmmutiti/hashtag-rotator-service.git
cd hashtag-rotator-service
npm install
```

---

## ⚙️ Usage

### Local Development

```bash
node server.js
```

### Serverless Deployment (Vercel)

```bash
vercel deploy
```

Ensure your environment variables are set:

```env
WEBHOOK_SECRET=your-secure-hmac-key
```

---

## 📁 File Structure

```
hashtag-rotator-service/
├── api/                          # Serverless API endpoints
│   ├── scrape-trends24.js        # Scrapes hashtags from Trends24
│   ├── trends24-cache.js         # Serves cached hashtags
│   ├── rotator.js                # Rotates hashtags every 15 min
│   ├── diagnostics.js            # System diagnostics
│   ├── webhook-listener.js       # Verifies and logs webhook events
│   ├── webhook-diagnostics.js    # Exposes webhook delivery logs
│   ├── trends.js                 # Region-aware fallback hashtags
│   └── index.js                  # Optional root endpoint
│
├── public/                       # Static assets and JSON logs
│   ├── index.html                # Frontend dashboard shell
│   ├── script.js                 # Rotator logic + diagnostics
│   ├── styles.css                # Optional styling
│   ├── trends24.json             # Cached hashtags
│   └── webhook-diagnostics.json  # Logged webhook deliveries
│
├── vercel.json                   # Vercel config: builds, rewrites, crons
├── README.md                     # Markdown readme for GitHub
├── README.html                   # HTML readme for dashboards
├── .env                          # Environment variables (e.g. WEBHOOK_SECRET)
└── package.json                  # Optional for local dev or dependencies
```

---

## 📡 API Endpoints

| Endpoint                     | Description                                      |
|-----------------------------|--------------------------------------------------|
| `/api/scrape-trends24`      | Scrapes hashtags from Trends24 (cron: hourly)   |
| `/api/trends24-cache`       | Serves cached hashtags                          |
| `/api/rotator`              | Rotates hashtags every 15 minutes               |
| `/api/trends`               | Returns fallback hashtags by region             |
| `/api/diagnostics`          | Returns system diagnostics                      |
| `/api/webhook-listener`     | Verifies and logs webhook events                |
| `/api/webhook-diagnostics`  | Exposes delivery logs for public observability  |

---

## 🔐 Webhook Verification

Set your secret key in `.env` or Vercel dashboard:

```env
WEBHOOK_SECRET=your-secure-hmac-key
```

Incoming requests must include:

```
x-hub-signature-256: sha256=your-digest
```

---

## 🧪 Testing

Use Postman or curl:

```bash
curl -X POST https://your-project.vercel.app/api/webhook-listener \
  -H "Content-Type: application/json" \
  -H "x-hub-signature-256: sha256=your-digest" \
  -d '{"event":"push","region":"kenya"}'
```

---

## 📊 Diagnostics Example

```json
{
  "status": "✅ Diagnostics OK",
  "timestamp": "2025-08-12T01:13:00Z",
  "regions": ["kenya", "global"],
  "fallbackActive": true
}
```

---

## 📚 Remix Notes

- All endpoints are documented and modular
- Fallback logic ensures public reliability
- Designed for remixers, auditors, and civic technologists
- Semantic HTML and accessible dashboards encouraged

---

## 🛡️ License

MIT — Remix, audit, and deploy freely. Attribution appreciated.
