<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Hashtag Rotator Service – Audit-Ready README</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      line-height: 1.6;
      margin: 2rem;
      background: #f9f9f9;
      color: #222;
    }
    h1, h2, h3 {
      color: #0057b7;
    }
    code {
      background: #eee;
      padding: 2px 4px;
      border-radius: 4px;
      font-size: 0.95em;
    }
    pre {
      background: #eee;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 0.5rem;
      text-align: left;
    }
    a {
      color: #0077cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>

  <h1>🌍 Hashtag Rotator Service</h1>
  <p>A public-facing, region-aware microservice that fetches live trending hashtags from verified sources and rotates them in civic dashboards. Built for transparency, diagnostics, and real-time civic engagement.</p>

  <h2>🚀 Live Deployment</h2>
  <p><a href="https://hashtag-rotator-service-1u7ys9zy6-peter-m-mutitis-projects.vercel.app" target="_blank">Production URL</a></p>

  <h2>🧱 Modules Deployed</h2>
  <table>
    <thead>
      <tr><th>Module</th><th>Status</th><th>Timestamp</th><th>Commit ID</th></tr>
    </thead>
    <tbody>
      <tr><td>.gitignore</td><td>✅ Deployed</td><td>2 hours ago</td><td>84284d29</td></tr>
      <tr><td>fallbackHashtags.js</td><td>✅ Deployed</td><td>14 hours ago</td><td>31b106dc</td></tr>
      <tr><td>constants.js</td><td>✅ Deployed</td><td>14 hours ago</td><td>3b46b570</td></tr>
      <tr><td>diagnostics.js</td><td>✅ Deployed</td><td>15 hours ago</td><td>92e809ed</td></tr>
      <tr><td>rotator.js (Kenya)</td><td>✅ Deployed</td><td>15 hours ago</td><td>209e1983</td></tr>
      <tr><td>script.js</td><td>✅ Deployed</td><td>17 hours ago</td><td>517b6d79</td></tr>
      <tr><td>index.html</td><td>✅ Deployed</td><td>18 hours ago</td><td>38b7174f</td></tr>
      <tr><td>server.js</td><td>✅ Deployed</td><td>18 hours ago</td><td>f3fd893e</td></tr>
      <tr><td>scrape-trends24.js</td><td>✅ Deployed</td><td>18 hours ago</td><td>01cff475</td></tr>
      <tr><td>webhook-diagnostics.js</td><td>✅ Deployed</td><td>19 hours ago</td><td>39e15623</td></tr>
      <tr><td>webhook-listener.js</td><td>✅ Deployed</td><td>19 hours ago</td><td>3423140f</td></tr>
      <tr><td>cron.js</td><td>✅ Deployed</td><td>20 hours ago</td><td>2eae4d5a</td></tr>
      <tr><td>trends24-cache.js</td><td>✅ Deployed</td><td>20 hours ago</td><td>4f78c1f3</td></tr>
    </tbody>
  </table>

  <h2>📡 Features</h2>
  <ul>
    <li>✅ Live hashtag scraping from Trends24 and CyberKendra</li>
    <li>🌐 Region toggles: Kenya, Nigeria, USA, UK, India</li>
    <li>🧪 Diagnostics panel with fallback detection</li>
    <li>🐦 Tweet CTA generator with civic messaging</li>
    <li>📊 Rotator module with refresh intervals</li>
    <li>🔁 Webhook listeners for real-time updates</li>
    <li>🧾 Audit-ready fallback logic and timestamping</li>
  </ul>

  <h2>🧠 How It Works</h2>
  <pre><code>// Fetch hashtags from live endpoint
const res = await fetch('/api/rotator?region=kenya');
const data = await res.json();
const hashtags = data.hashtags || [];</code></pre>

  <pre><code>&lt;a href="https://twitter.com/intent/tweet?text=#JusticeforJuliaNjoki%20%23OccupyCBDTuesday%20%23AuditReady" target="_blank"&gt;
  Tweet This Civic Signal 📢
&lt;/a&gt;</code></pre>

  <h2>🛠️ Setup</h2>
  <ol>
    <li>Clone the repo:<br/><code>git clone https://github.com/pmmutiti/hashtag-rotator-service.git</code></li>
    <li>Install dependencies:<br/><code>npm install</code></li>
    <li>Set environment variables:<br/><code>cp .env.example .env</code></li>
    <li>Run locally:<br/><code>npm run dev</code></li>
  </ol>

  <h2>🧪 Diagnostics Endpoint</h2>
  <pre><code>GET /api/diagnostics</code></pre>
  <pre><code>{
  "status": "🧪 Diagnostics OK",
  "fallbackEnabled": false,
  "timestamp": "2025-08-25T11:58:00Z",
  "regionsSupported": ["kenya", "nigeria", "usa", "uk", "india"]
}</code></pre>

  <h2>📁 File Structure</h2>
  <pre><code>├── api/
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
└── README.md</code></pre>

  <h2>📢 Civic Hashtags Used</h2>
  <table>
    <thead>
      <tr><th>Hashtag</th><th>Context</th></tr>
    </thead>
    <tbody>
      <tr><td>#JusticeforJuliaNjoki</td><td>Civic protest signal from Kenya</td></tr>
      <tr><td>#ShootFirstSir</td><td>Police accountability</td></tr>
      <tr><td>#WeAreAllKikuyus</td><td>Anti-tribalism solidarity</td></tr>
      <tr><td>#OccupyCBDTuesday</td><td>Urban protest movement</td></tr>
      <tr><td>#DigitalKenya</td><td>Civic tech and transparency</td></tr>
      <tr><td>#CivicInfra</td><td>Infrastructure for public oversight</td></tr>
      <tr><td>#AuditReady</td><td>Verified, traceable civic modules</td></tr>
    </tbody>
  </table>

  <h2>🧾 License</h2>
  <p>MIT — Built for civic clarity, not corporate opacity.</p>

  <h2>🧠 Author</h2>
  <p><strong>Peter M. Mutiti</strong><br/>
  Civic watchdog, dashboard architect, rotator reformer.<br/>
  📍 Nairobi, Kenya<br/>
  🛠️ <a href="https://hashtag-rotator-service-1u7ys9zy6-peter-m-mutitis-projects.vercel.app" target="_blank">View Live Service</a></p>

</body>
</html>
