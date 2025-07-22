## 📡 Hashtag Rotator Service

This serverless microservice fetches **real-time trending hashtags** from [Trends24.in](https://trends24.in) based on a region query. It’s designed to power:

- 🏛️ Civic dashboards  
- 📰 Data-driven journalism tools  
- 🎯 Rotating headline widgets that spotlight public conversations  

## 🔧 How It Works

- Fetches and parses live HTML from Trends24  
- Extracts trending hashtags by region  
- Returns structured JSON via a simple REST API

### 🧪 Example Endpoint
GET /api/trends?region=kenya Returns: { "region": "kenya", "hashtags": ["#MaandamanoMondays", "#NairobiProtests", "#DigitalDignity"] 
}

curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_L617KcSia649VrJ1fmAxziaOMqsZ/MDi3TFnUYo

hashtag-rotator-service/ ├── api/ │ ├── trends.js # Region-aware hashtag fetcher │ ├── cron.js # Scheduled civic job │ └── health.js # This file — exposes edge insight ├── vercel.json # Deployment + cron settings ├── package.json # Dependencies like axios, cheerio ├── README.md # Remixable documentation └── LICENSE # MIT license 
