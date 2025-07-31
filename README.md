# 📡 hashtag-rotator-service

_Modular serverless microservice for rotating regional hashtags, tracking civic events, and listening to GitHub deploy signals. Designed for dashboards, journalism tools, and remixable public infrastructure._

---

## 🔍 How It Works

- Parses live HTML from [Trends24](https://trends24.in)
- Extracts trending hashtags per region
- Exposes via public JSON API endpoints

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
