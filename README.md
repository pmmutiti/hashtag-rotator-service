# 📡 hashtag-rotator-service

_Modular civic microservice for rotating regional hashtags, logging GitHub deploy events, and powering public dashboards. Built for journalists, civic technologists, and remixers._

Fetches trending hashtags from [Trends24.in](https://trends24.in) by region and exposes them via edge-ready API endpoints. Designed for transparency, accessibility, and region-aware engagement.

Key Features:
- `/api/trends?region=kenya` — fetch real-time hashtags for a location
- `/api/cron` — auto-refresh task triggered daily via Vercel cron
- `/api/health` — live service status with edge region diagnostics
- `/api/github-webhook` — GitHub event logger with HMAC verification

✅ Deployable on [Vercel](https://vercel.com)  
✅ Logs incoming webhook payloads for observability  
✅ Remixable layout with MIT License + clear contribution guide
