export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>✅ Hashtag Rotator Service</title>
      <style>
        body { font-family: system-ui, sans-serif; padding: 2rem; background: #f9f9f9; color: #222; }
        h1 { color: #0057b7; }
        ul { margin-top: 1rem; }
        li { margin-bottom: 0.5rem; }
        code { background: #eee; padding: 2px 6px; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>✅ Hashtag Rotator Service is Live</h1>
      <p>This civic deployment is active and serving verified endpoints:</p>
      <ul>
        <li><code>/api/trends</code> — Region-aware hashtag trends</li>
        <li><code>/api/cron</code> — Scheduled civic refresh</li>
        <li><code>/api/github-webhook</code> — GitHub integration</li>
        <li><code>/api/diagnostics</code> — System health and fallback status</li>
      </ul>
      <p><strong>Region Rewrite:</strong> <code>/kenya-trends → /api/trends?region=kenya</code></p>
      <p><strong>Last Updated:</strong> ${new Date().toISOString()}</p>
      <p>Visit <a href="/kenya-trends">/kenya-trends</a> to test region-aware routing.</p>
    </body>
    </html>
  `);
}
