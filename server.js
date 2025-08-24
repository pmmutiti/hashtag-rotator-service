import express from 'express';
import scrapeTrends24 from './api/scrape-trends24.js';
import rotator from './api/rotator.js';
import diagnostics from './api/diagnostics.js';

const app = express();
app.use(express.json());

app.get('/api/scrape-trends24', scrapeTrends24);
app.get('/api/rotator', rotator);
app.get('/api/diagnostics', diagnostics);

app.listen(3000, () => {
  console.log('🧪 Local civic API running on http://localhost:3000');
});
