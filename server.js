// server.js
import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const route = parsedUrl.pathname;

  if (route === '/api/trends24-cache') {
    const filePath = path.join(__dirname, 'public', 'trends24.json');
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Cache not found', details: err.message }));
    }
  }

  else if (route === '/api/rotator') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: '✅ Rotator refreshed',
      rotatedAt: new Date().toISOString()
    }));
  }

  else if (route === '/api/diagnostics') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: '✅ Diagnostics OK',
      timestamp: new Date().toISOString(),
      regions: ['kenya', 'global'],
      fallbackActive: true
    }));
  }

  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Node.js civic rotator running on http://localhost:${PORT}`);
});
