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
- 🌐 Region toggles: Kenya, Nigeria, USA, UK, India  
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




