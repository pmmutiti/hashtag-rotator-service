<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>README – Civic Hashtag Rotator</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; background: #f9f9f9; color: #222; line-height: 1.6; }
    h1, h2, h3 { color: #005a9c; }
    code, pre { background: #eee; padding: 0.5rem; border-radius: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { border: 1px solid #ccc; padding: 0.5rem; text-align: left; }
    th { background: #e0e0e0; }
    ul { margin-left: 1.5rem; }
  </style>
</head>
<body>

  <h1>🌍 Civic Hashtag Rotator Service</h1>
  <p>This backend module fetches <strong>live trending civic hashtags</strong> from verified regional sources. It powers public dashboards with <em>rolling headlines</em>, <em>tweet CTAs</em>, and <em>diagnostics panels</em>.</p>

  <h2>🔧 Endpoint</h2>
  <pre><code>GET /api/hashtag-rotator?region=kenya</code></pre>

  <h2>✅ Query Parameters</h2>
  <table>
    <thead>
      <tr><th>Param</th><th>Type</th><th>Required</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td>region</td><td>string</td><td>optional</td><td>Region code (e.g. <code>kenya</code>, <code>usa</code>, <code>uk</code>)</td></tr>
    </tbody>
  </table>

  <h2>📦 Response Format</h2>
  <pre><code>{
  "timestamp": "2025-08-26T10:20:00.000Z",
  "region": "kenya",
  "hashtags": [
    "#AuditTheGhostProjects",
    "#FertilizerScamWatch",
    "#CivicSignalKE",
    "#PublicFundsTracker"
  ]
}</code></pre>

  <h2>🧪 Diagnostics Panel Integration</h2>
  <ul>
    <li>✅ Region toggles for civic observability</li>
    <li>✅ Rolling civic headlines</li>
    <li>✅ Tweet CTAs with embedded civic messaging</li>
    <li>✅ Audit-ready timestamp and region metadata</li>
  </ul>

  <h2>🚫 Fallback-Free Guarantee</h2>
  <p>This service <strong>does not use placeholder data</strong> or fallback logic. All hashtags are sourced from verified regional feeds or civic repositories. If no data is available, the response will return an empty array with a diagnostic error.</p>

  <h2>🛠️ Maintainer</h2>
  <p><strong>Peter M. Mutiti</strong><br />
  Civic advisory architect & modular documentation specialist<br />
  📍 Kiambu County, Kenya</p>

</body>
</html>
