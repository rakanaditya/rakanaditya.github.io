// server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

app.get('/api/data', async (req, res) => {
  try {
    const ytLive = req.query.ytLive;
    const placeIds = req.query.placeIds;
    const url = `${scriptUrl}?${ytLive ? `ytLive=1` : `placeIds=${placeIds}`}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(3000, () => console.log('Proxy server running at http://localhost:3000'));
