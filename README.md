## 📡 Hashtag Rotator Service

This serverless microservice fetches **real-time trending hashtags** from [Trends24.in](https://trends24.in) based on a region query. It’s designed to power:

- 🏛️ Civic dashboards  
- 📰 Data-driven journalism tools  
- 🎯 Rotating headline widgets that spotlight public conversations  

---

## 🔧 How It Works

- Fetches and parses live HTML from Trends24
- Extracts trending hashtags by region
- Returns structured JSON via a simple REST API

### 🧪 Example Endpoint

Returns:
```json
{
  "region": "kenya",
  "hashtags": ["#MaandamanoMondays", "#NairobiProtests", "#DigitalDignity"]
}
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_L617KcSia649VrJ1fmAxziaOMqsZ/MDi3TFnUYo
