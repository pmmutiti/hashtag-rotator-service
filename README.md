<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>📘 Civic README – Hashtag Rotator Service</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      background: #f9f9f9;
      color: #222;
      padding: 2rem;
      max-width: 900px;
      margin: auto;
    }
    h1, h2 {
      color: #005f73;
    }
    code {
      background: #eee;
      padding: 0.2em 0.4em;
      border-radius: 4px;
    }
    .callout {
      background: #e0f7fa;
      border-left: 6px solid #00bcd4;
      padding: 1rem;
      margin: 1rem 0;
    }
    ul {
      padding-left: 1.5rem;
    }
  </style>
</head>
<body>
  <h1>🌍 Hashtag Rotator Service</h1>
  <p><strong>Author:</strong> Peter M. Mutiti<br />
     <strong>Version:</strong> 1.0.0<br />
     <strong>License:</strong> MIT</p>

  <div class="callout">
    <strong>Purpose:</strong> This service rotates verified civic hashtags in real time, enabling public-facing dashboards, tweet CTAs, and region-aware diagnostics. It is designed to eliminate fallback logic, expose phantom endpoints, and empower citizen oversight.
  </div>

  <h2>📦 Project Structure</h2>
  <ul>
    <li><code>api/index.js</code> – Root civic entry point</li>
    <li><code>api/hashtag-rotator.js</code> – Main rotator endpoint (region-aware)</li>
    <li><code>api/hashtag-rotator-service.js</code> – Legacy or alternate rotator logic</li>
    <li><code>api/diagnostics.js</code> – Endpoint health, fallback detection</li>
    <li><code>api/trends.js</code> – Regional civic trend fetcher (e.g. CyberKendra)</li>
    <li><code>api/github-webhook.js</code> – GitHub payload intake for civic module updates</li>
    <li><code>api/cron.js</code> – Scheduled refresh logic (daily at 10:00)</li>
    <li><code>vercel.json</code> – Deployment config: rewrites, builds, cron jobs</li>
    <li><code>package.json</code> – Dependencies and scripts</li>
    <li><code>.vercelignore</code> – Excludes phantom files from deploy</li>
  </ul>

  <h2>🚀 Endpoints</h2>
  <ul>
    <li><code>/api/hashtag-rotator?region=kenya</code> – Fetch civic hashtags</li>
    <li><code>/api/diagnostics</code> – Check endpoint health</li>
    <li><code>/api/trends?region=kenya</code> – Regional civic trends</li>
    <li><code>/api/github-webhook</code> – GitHub webhook intake</li>
    <li><code>/api/cron</code> – Manual cron trigger</li>
    <li><code>/cyber-kendra/*</code> – Routed civic probes (via vercel.json)</li>
  </ul>

  <h2>🧠 Cyber Kendra Integration</h2>
  <p>Cyber Kendra routes are wired to hit every civic module with <code>source=CyberKendra</code> for traceability. These include:</p>
  <ul>
    <li><code>/cyber-kendra</code> → Index</li>
    <li><code>/cyber-kendra/rotator</code> → Hashtag rotator</li>
    <li><code>/cyber-kendra/diagnostics</code> → Diagnostics</li>
    <li><code>/cyber-kendra/trends</code> → Trends</li>
    <li><code>/cyber-kendra/github</code> → Webhook</li>
    <li><code>/cyber-kendra/cron</code> → Cron trigger</li>
  </ul>

  <h2>🧪 Diagnostics & Observability</h2>
  <p>All endpoints return timestamped responses and support fallback detection. The diagnostics module can be extended to log uptime, commit hashes, and civic signal integrity.</p>

  <h2>📜 Deployment Notes</h2>
  <ul>
    <li>Ensure <code>package.json</code> is valid JSON with no trailing commas</li>
    <li>Use <code>vercel.json</code> to control builds and rewrites</li>
    <li>Ignore phantom files via <code>.vercelignore</code></li>
    <li>Deploy via Vercel CLI or GitHub integration</li>
  </ul>

  <h2>📣 Civic Philosophy</h2>
  <blockquote>
    “Activism isn’t just noise — it’s infrastructure.”<br />
    This project turns trending hashtags into civic signals, empowering citizens to amplify verified, region-specific causes.
  </blockquote>

  <p><strong>Maintainer:</strong> Peter M. Mutiti<br />
     <strong>Contact:</strong> [Insert civic contact or GitHub link]</p>
</body>
</html>
