

---

```markdown
# 🌍 Hashtag Rotator Service

A public-facing, region-aware microservice that fetches live trending hashtags from verified sources and rotates them in civic dashboards. Built for transparency, diagnostics, and real-time civic engagement.

---

## 🚀 Live Deployment

🔗 [Production URL](https://hashtag-rotator-service-1u7ys9zy6-peter-m-mutitis-projects.vercel.app)

---

## 🧱 Modules Deployed

| Module                  | Status   | Commit ID     |
|------------------------|----------|---------------|
| `rotator.js`           | ✅ Live   | `ce4c1a13…`    |
| `fallbackHashtags.js`  | ✅ Live   | `31b106dc…`    |
| `diagnostics.js`       | ✅ Live   | `92e809ed…`    |
| `constants.js`         | ✅ Live   | `3b46b570…`    |
| `index.html`           | ✅ Live   | `38b7174f…`    |
| `script.js`            | ✅ Live   | `517b6d79…`    |
| `webhook-listener.js`  | ✅ Live   | `3423140f…`    |
| `cron.js`              | ✅ Live   | `2eae4d5a…`    |

---

## 📡 Features

- ✅ Live hashtag scraping from CyberKendra
- 🌐 Region toggles: Kenya, Nigeria, USA, UK, India
- 🧪 Diagnostics panel with fallback detection
- 🐦 Tweet CTA generator with civic messaging
- 🔁 Rotator module with refresh intervals
- 🧾 Audit-ready fallback logic and timestamping
- ⚙️ GitHub Actions for auto-refresh every 6 hours

---

## 🧠 How It Works

```js
// Fetch hashtags from live endpoint
const res = await fetch('/api/rotator?region=kenya');
const data = await res.json();
const hashtags = data.hashtags || [];
```

```html
<!-- Tweet CTA -->
<a href="https://twitter.com/intent/tweet?text=#JusticeforJuliaNjoki%20%23OccupyCBDTuesday%20%23AuditReady" target="_blank">
  Tweet This Civic Signal 📢
</a>
```

---

## 🛠️ Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/pmmutiti/hashtag-rotator-service.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set environment variables:
   ```bash
   cp .env.example .env
   ```

4. Run locally:
   ```bash
   npm run dev
   ```

---

## 🧪 Diagnostics Endpoint

```http
GET /api/diagnostics
```

Returns:
```json
{
  "status": "🧪 Diagnostics OK",
  "fallbackUsed": false,
  "timestamp": "2025-08-27T09:58:00Z",
  "regionsSupported": ["kenya", "nigeria", "usa", "uk", "india"]
}
```

---

## 📁 File Structure

```plaintext
├── api/
│   ├── rotator.js
│   ├── diagnostics.js
│   ├── webhook-listener.js
│   └── cron.js
├── public/
│   └── index.html
├── utils/
│   ├── constants.js
│   ├── fallbackHashtags.js
├── .vercelignore
├── .gitignore
├── vercel.json
└── README.md
```

---

## 📢 Civic Hashtags Used

| Hashtag                 | Context                            |
|------------------------|-------------------------------------|
| `#JusticeforJuliaNjoki` | Civic protest signal from Kenya     |
| `#ShootFirstSir`        | Police accountability               |
| `#WeAreAllKikuyus`      | Anti-tribalism solidarity           |
| `#OccupyCBDTuesday`     | Urban protest movement              |
| `#DigitalKenya`         | Civic tech and transparency         |
| `#CivicInfra`           | Infrastructure for public oversight |
| `#AuditReady`           | Verified, traceable civic modules   |

---

## 🧾 License

MIT — Built for civic clarity, not corporate opacity.

---

## 🧠 Author

**Peter M. Mutiti**  
Civic watchdog, dashboard architect, rotator reformer.  
📍 Nairobi, Kenya  
🛠️ [View Live Service](https://hashtag-rotator-service-1u7ys9zy6-peter-m-mutitis-projects.vercel.app)
```

---

