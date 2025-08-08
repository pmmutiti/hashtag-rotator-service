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
| 💬 API Endpoints       | `/api/trends`, `/api/cron`, `/api/github-webhook`, `/api/diagnostics`, `/api/index`, `/api/hashtag-rotator-service` |
| ⏰ Cron Scheduling      | Vercel triggers `/api/cron` daily at 10:00 UTC (1PM Nairobi)             |
| 📡 GitHub Webhook      | Verifies HMAC signature and logs events to `/api/diagnostics`           |
| 🌍 Geo Routing          | Kenya visitors rerouted to `/kenya-trends` using IP headers             |
| 🧪 Diagnostics API      | `/api/diagnostics` returns delivery logs, verification status, and timestamps |
| 🛡️ Crash Protection     | All handlers use `try/catch` blocks for resilience                      |
| 🔍 Testing Script       | `test.sh` validates endpoint response and logs headers                  |

---

## 🚀 Quick Start Guide

### 1. Fork + Clone

```bash
git clone https://github.com/pmmutiti/hashtag-rotator-service.git
cd hashtag-rotator-service
