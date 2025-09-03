<body>

  <h1>🌀 Hashtag Rotator Service</h1>
  <p>A civic-grade, region-aware hashtag rotator built for transparency, remixability, and public observability. Powered by serverless endpoints, timestamped diagnostics, and Trends24 scraping.</p>

  <div class="section">
    <h2>🚀 Live Deployment</h2>
    <ul>
      <li><strong>Base URL:</strong> <code>https://hashtag-rotator-service.vercel.app</code></li>
      <li><strong>Ping:</strong> <code>/api/ping</code></li>
      <li><strong>Meta:</strong> <code>/api/meta</code></li>
      <li><strong>Kenya Trends:</strong> <code>/api/trends?region=kenya</code></li>
      <li><strong>Webhook Listener:</strong> <code>/api/webhook-listener</code></li>
    </ul>
  </div>

  <div class="section">
    <h2>📦 Endpoints Overview</h2>
    <table>
      <thead>
        <tr><th>Endpoint</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td><code>/api/trends</code></td><td>Region-aware civic hashtag trends</td></tr>
        <tr><td><code>/api/rotator</code></td><td>Rotates hashtags for dashboards</td></tr>
        <tr><td><code>/api/scrape-trends24</code></td><td>Scrapes live hashtags from Trends24</td></tr>
        <tr><td><code>/api/webhook-listener</code></td><td>Verifies incoming webhooks via HMAC</td></tr>
        <tr><td><code>/api/diagnostics</code></td><td>Emits webhook diagnostics</td></tr>
        <tr><td><code>/api/meta</code></td><td>Returns civic metadata and endpoint manifest</td></tr>
        <tr><td><code>/api/ping</code></td><td>Pings internal endpoints for health checks</td></tr>
        <tr><td><code>/api/crons</code></td><td>Scheduled civic sync via Vercel cron</td></tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>🧪 Local Testing</h2>
    <p>Run endpoint tests with:</p>
    <pre><code>bash test.sh</code></pre>
    <p>Logs saved to <code>test-log-YYYYMMDD-HHMMSS.txt</code></p>
  </div>

  <div class="section">
    <h2>🔐 Environment Variables</h2>
    <table>
      <thead>
        <tr><th>Name</th><th>Purpose</th></tr>
      </thead>
      <tbody>
        <tr><td><code>WEBHOOK_SECRET</code></td><td>HMAC verification for webhooks</td></tr>
        <tr><td><code>GITHUB_WEBHOOK_SECRET</code></td><td>GitHub webhook signature check</td></tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>🛠️ Build Process</h2>
    <p>Civic hashtags are scraped and emitted to <code>data/hashtags.json</code> via:</p>
    <pre><code>npm run build</code></pre>
    <p>This runs <code>build.js</code> and populates fallback-aware, timestamped JSON.</p>
  </div>

  <div class="section">
    <h2>🧭 Rewrite Routes</h2>
    <table>
      <thead>
        <tr><th>Route</th><th>Destination</th></tr>
      </thead>
      <tbody>
        <tr><td><code>/kenya-trends</code></td><td><code>/api/trends?region=kenya</code></td></tr>
        <tr><td><code>/trends/:region</code></td><td><code>/api/trends?region=:region</code></td></tr>
        <tr><td><code>/cyber-kendra</code></td><td><code>/api/index?source=CyberKendra</code></td></tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>🧑‍💻 Maintainer</h2>
    <p><strong>Peter M. Mutiti</strong><br/>
    Civic advisory architect & modular documentation specialist<br/>
    📍 Kiambu County, Kenya</p>
  </div>

  <div class="section">
    <h2>📜 License</h2>
    <p>MIT — Remix, audit, and deploy freely.</p>
  </div>

</body>
</html>
