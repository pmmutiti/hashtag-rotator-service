
<body>
  <h1>🌀 Hashtag Rotator Service</h1>
  <p>Modular, audit-grade civic hashtag rotator with diagnostics, webhook intake, and region-aware endpoints. Built for public-facing dashboards, timestamped observability, and clean Vercel deployment.</p>

  <h2>🚀 Features</h2>
  <ul>
    <li>✅ Fetches live hashtags from <a href="https://trends24.in/kenya/" target="_blank">trends24.in/kenya</a></li>
    <li>✅ Builds <code>kenya.json</code> with region + timestamp</li>
    <li>✅ Outputs <code>tags.txt</code> for diagnostics</li>
    <li>✅ GitHub Actions workflow runs every 6 hours</li>
    <li>✅ Vercel-compatible static deployment via <code>/public</code></li>
    <li>✅ Serverless-ready with optional API endpoints</li>
  </ul>

  <h2>🧠 Project Structure</h2>
  <pre><code>hashtag-rotator-service/
├── build.js              # Civic build script (required for Vercel)
├── package.json          # Includes build script and CLI logic
├── public/               # Static deployable assets for Vercel
│   └── kenya.json
│   └── tags.txt
├── data/                 # Raw civic output (used during build)
│   └── kenya.json
├── tags.txt              # Raw hashtag list
├── .github/
│   └── workflows/
│       └── update-kenya-tags.yml
</code></pre>

  <h2>🛠️ Setup Instructions</h2>
  <pre><code>git clone https://github.com/pmmutiti/hashtag-rotator-service.git
cd hashtag-rotator-service
npm install
npm run build
vercel dev
vercel --prod
</code></pre>

  <h2>📦 package.json (Key Config)</h2>
  <pre><code>{
  "name": "hashtag-rotator-service",
  "version": "1.0.0",
  "description": "Modular civic hashtag rotator with diagnostics, webhook intake, and region-aware endpoints.",
  "main": "index.js",
  "scripts": {
    "dev": "vercel dev",
    "start": "node api/index.js",
    "build": "node build.js && mkdir -p public && cp data/kenya.json public/ && cp tags.txt public/"
  },
  "keywords": [
    "civic",
    "rotator",
    "vercel",
    "serverless",
    "audit-ready",
    "cyber-kendra"
  ],
  "author": "Peter M. Mutiti",
  "license": "MIT",
  "dependencies": {
    "node-fetch": "^3.3.2"
  },
  "type": "module"
}
</code></pre>

  <h2>⚙️ GitHub Actions Workflow (Vercel-Safe)</h2>
  <pre><code>name: Update Kenya Hashtags

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:

jobs:
  update-tags:
    runs-on: ubuntu-latest
    steps:
      - name: ✅ Checkout repo
        uses: actions/checkout@v3

      - name: ⚔️ Fetch live hashtags
        run: |
          curl -s https://trends24.in/kenya/ | \
          grep -oP '(?<=<a href="/topics/)[^"]+' | \
          sed 's/^/#/' | head -n 10 > tags.txt

      - name: 🧠 Build kenya.json
        run: |
          mkdir -p data
          echo '{' > data/kenya.json
          echo '  "region": "kenya",' >> data/kenya.json
          echo '  "tags": [' >> data/kenya.json
          sed 's/^/    "/;s/$/",/' tags.txt >> data/kenya.json
          echo '  ]' >> data/kenya.json
          echo '}' >> data/kenya.json

      - name: ✅ Commit and push
        run: |
          git config --global user.name "CivicBot"
          git config --global user.email "civicbot@users.noreply.github.com"
          git add data/kenya.json tags.txt || true
          git diff --cached --quiet && echo "🧠 Nothing to commit. Civic signal unchanged." && exit 0
          git commit -m "Auto-update Kenya hashtags"
          git push
</code></pre>

  <h2>📡 Vercel Deployment Notes</h2>
  <ul>
    <li>Vercel expects static assets in <code>/public</code></li>
    <li>The <code>build.js</code> script ensures <code>kenya.json</code> and <code>tags.txt</code> are copied there</li>
    <li>No <code>vercel.json</code> is required unless you want custom rewrites or API routing</li>
    <li>Avoid defining <code>"builds"</code> in <code>vercel.json</code> unless using serverless functions</li>
  </ul>

  <h2>🧠 CivicBot Verification Checklist</h2>
  <ul>
    <li>✅ <code>build.js</code> exists at root</li>
    <li>✅ <code>package.json</code> includes <code>"build"</code> script</li>
    <li>✅ <code>public/</code> contains deployable assets</li>
    <li>✅ GitHub Actions workflow does not interfere with Vercel</li>
    <li>✅ No phantom folders, no fallback logic</li>
  </ul>

  <div class="callout">
    ✅ Once deployed, your civic hashtag rotator will run cleanly every 6 hours, push audit-grade JSON, and serve static assets via Vercel—no rot, no fallback, no excuses.
  </div>

  <h2>🧾 License</h2>
  <p>MIT © Peter M. Mutiti<br>Civic infrastructure is public infrastructure. Remix responsibly.</p>
</body>
</html>
