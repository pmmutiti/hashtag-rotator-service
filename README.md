# 📡 Civic Hashtag Rotator

A modular, region-aware, auto-updating hashtag rotator built for public dashboards, remixers, and civic technologists. Powered by serverless functions, Trends24 scraping, and diagnostics endpoints.

---

## 🚀 Features

- ✅ Rotates hashtags from 12+ regions in real time  
- ✅ Scrapes Trends24 hourly via Vercel cron  
- ✅ Fallback logic for offline or failed fetches  
- ✅ Public diagnostics endpoint for auditability  
- ✅ Region-aware routing via IP headers  
- ✅ Tweet CTA with auto-generated links  
- ✅ Headline rotator for civic engagement themes

---

## 🧱 Architecture

| Component                  | Path                          | Description                                      |
|---------------------------|-------------------------------|--------------------------------------------------|
| Rotator frontend          | `/public/index.html`          | Displays rotating hashtags + tweet CTA          |
| Trends API                | `/api/trends.js`              | Serves hashtags by region                       |
| Trends24 scraper          | `/api/scrape-trends24.js`     | Scrapes Trends24 HTML hourly                    |
| Cached trends endpoint    | `/api/trends24-cache.js`      | Serves latest scraped hashtags                  |
| Diagnostics               | `/api/diagnostics.js`         | Shows region fetch status + fallback info       |
| Cron job (daily)          | `/api/cron.js`                | Rotates fallback hashtags + syncs metadata      |
| GitHub webhook            | `/api/github-webhook.js`      | Optional: triggers redeploys or syncs           |

---

## ⏰ Cron Jobs

Configured in `vercel.json`:

```json
"crons": [
  {
    "path": "/api/scrape-trends24",
    "schedule": "0 * * * *"
  },
  {
    "path": "/api/cron",
    "schedule": "0 10 * * *"
  }
]
```

---

## 🌍 Region Routing

```json
"rewrites": [
  {
    "source": "/kenya-trends",
    "has": [{ "type": "header", "key": "x-vercel-ip-country", "value": "KE" }],
    "destination": "/api/trends?region=kenya"
  },
  {
    "source": "/kenya-trends",
    "destination": "/api/trends?region=global"
  },
  {
    "source": "/trends/:region",
    "destination": "/api/trends?region=:region"
  },
  {
    "source": "/trends24",
    "destination": "/api/trends24-cache"
  },
  {
    "source": "/diagnostics",
    "destination": "/api/diagnostics"
  }
]
```

---

## 🧪 Diagnostics

Access via:

```
/diagnostics
```

Returns:

- Region-by-region fetch status  
- Total hashtags loaded  
- Fallback status  
- Timestamp of last scrape

---

## 📦 Deployment

1. Clone the repo  
2. Add your `vercel.json` to the root  
3. Deploy to Vercel  
4. Cron jobs and rewrites activate automatically  
5. Visit `/` to see the rotator live

---

## 🛠️ Remix Ideas

- Add region selector to frontend  
- Visualize diagnostics with heatmap  
- Log webhook payloads for public observability  
- Export hashtags to CSV or JSON for civic researchers
