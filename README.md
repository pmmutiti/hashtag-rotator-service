
# 🌍 Hashtag Rotator Service

A public-facing, region-aware microservice that fetches live trending hashtags from verified sources and rotates them in civic dashboards. Built for transparency, diagnostics, and real-time civic engagement.

---

## 🚀 Live Deployment

🔗 [Production URL](https://hashtag-rotator-service-1u7ys9zy6-peter-m-mutitis-projects.vercel.app)

---

## 🧱 Modules Deployed

| Module                   | Status        | Timestamp     | Commit ID               |
|--------------------------|---------------|---------------|--------------------------|
| `.gitignore`             | ✅ Deployed    | 2 hours ago   | `84284d29`              |
| `fallbackHashtags.js`    | ✅ Deployed    | 14 hours ago  | `31b106dc`              |
| `constants.js`           | ✅ Deployed    | 14 hours ago  | `3b46b570`              |
| `diagnostics.js`         | ✅ Deployed    | 15 hours ago  | `92e809ed`              |
| `rotator.js (Kenya)`     | ✅ Deployed    | 15 hours ago  | `209e1983`              |
| `hashtag-rotator.js`     | ✅ Deployed    | Just now      | `civic-endpoint-verified` |
| `script.js`              | ✅ Deployed    | 17 hours ago  | `517b6d79`              |
| `index.html`             | ✅ Deployed    | 18 hours ago  | `38b7174f`              |
| `server.js`              | ✅ Deployed    | 18 hours ago  | `f3fd893e`              |
| `scrape-trends24.js`     | ✅ Deployed    | 18 hours ago  | `01cff475`              |
| `webhook-diagnostics.js` | ✅ Deployed    | 19 hours ago  | `39e15623`              |
| `webhook-listener.js`    | ✅ Deployed    | 19 hours ago  | `3423140f`              |
| `cron.js`                | ✅ Deployed    | 20 hours ago  | `2eae4d5a`              |
| `trends24-cache.js`      | ✅ Deployed    | 20 hours ago  | `4f78c1f3`              |

---

## 📡 Features

- ✅ Live hashtag scraping from Trends24 and CyberKendra  
- 🌐 Region toggles: Kenya, Nigeria, Ghana, South Africa, USA, UK, India  
- 🧪 Diagnostics panel with fallback detection  
- 🐦 Tweet CTA generator with civic messaging  
- 📊 Rotator module with refresh intervals  
- 🔁 Webhook listeners for real-time updates  
- 🧾 Audit-ready fallback logic and timestamping  
- 🧠 Canonical endpoint: `/api/hashtag-rotator`  
- 🚫 Fallback logic disabled — verified civic signals only  

---

## 🧠 How It Works

```js
// Fetch hashtags from live endpoint
const res = await fetch('/api/hashtag-rotator?region=kenya');
const data = await res.json();
const hashtags = data.hashtags || [];
```

```html
<a href="https://twitter.com/intent/tweet?text=#JusticeforJuliaNjoki%20%23OccupyCBDTuesday%20%23AuditReady" target="_blank">
  Tweet This Civic Signal 📢
</a>
```

---

## 🛠️ Setup

1. Clone the repo  
   ```bash
   git clone https://github.com/pmmutiti/hashtag-rotator-service.git
   ```
2. Install dependencies  
   ```bash
   npm install
   ```
3. Set environment variables  
   ```bash
   cp .env.example .env
   ```
4. Run locally  
   ```bash
   npm run dev
   ```

---

## 🧪 Diagnostics Endpoint

```http
GET /api/diagnostics
```

```json
{
  "status": "🧪 Diagnostics OK",
  "deployed": true,
  "timestamp": "2025-08-27T10:42:00Z",
  "commitHash": "civic-endpoint-verified",
  "regionsSupported": ["kenya", "nigeria", "ghana", "southafrica", "usa", "uk", "india"],
  "fallbackEnabled": false,
  "source": "diagnostics.js"
}
```

---

## 📁 File Structure

```
├── api/
│   ├── hashtag-rotator.js
│   ├── rotator.js
│   ├── diagnostics.js
│   ├── scrape-trends24.js
│   ├── webhook-listener.js
│   └── cron.js
├── public/
│   └── index.html
├── utils/
│   ├── constants.js
│   ├── fallbackHashtags.js
│   └── trends24-cache.js
├── .vercelignore
├── .gitignore
├── vercel.json
└── README.md
```

---

## 📢 Civic Hashtags Used

| Hashtag                  | Context                          |
|--------------------------|----------------------------------|
| `#JusticeforJuliaNjoki` | Civic protest signal from Kenya  |
| `#ShootFirstSir`        | Police accountability            |
| `#WeAreAllKikuyus`      | Anti-tribalism solidarity        |
| `#OccupyCBDTuesday`     | Urban protest movement           |
| `#DigitalKenya`         | Civic tech and transparency      |
| `#CivicInfra`           | Infrastructure for public oversight |
| `#AuditReady`           | Verified, traceable civic modules |

---

## 🧾 License

This project is licensed under the MIT License — built for civic clarity, not corporate opacity. You are free to use, modify, and distribute this codebase for public benefit, provided attribution is maintained and no fallback logic is reintroduced.

---

## 📣 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss your proposal. All contributions must comply with audit-ready standards and avoid phantom endpoints or placeholder logic.

---

## 📊 Observability & Monitoring

- ✅ All endpoints wired to live data sources  
- 📡 No fallback logic or phantom modules permitted  
- 🧪 Diagnostics panel logs timestamp, region, and signal integrity  
- 📈 Webhook listeners trigger real-time updates across dashboards  
- 🔍 Vercel logs and commit hashes trace every deployment  

---

## 📦 API Reference

| Endpoint                     | Description                                      | Example                                      |
|-----------------------------|--------------------------------------------------|----------------------------------------------|
| `/api/hashtag-rotator`      | Returns verified civic hashtags for a region     | `/api/hashtag-rotator?region=kenya`          |
| `/api/diagnostics`          | Returns system health and fallback status        | `/api/diagnostics`                           |
| `/api/scrape-trends24`      | Scrapes live hashtags from Trends24              | `/api/scrape-trends24?region=kenya`          |
| `/api/webhook-listener`     | Receives external civic signals                  | `/api/webhook-listener`                      |

---

## 🧠 Author

**Peter M. Mutiti**  
Civic watchdog, dashboard architect, rotator reformer  
📍 Nairobi, Kenya  
🛠️ [View Live Service](https://hashtag-rotator-service-1u7ys9zy6-peter-m-mutitis-projects.vercel.app)  
💬 [mutiti.publicinfra@protonmail.com](mailto:mutiti.publicinfra@protonmail.com)




