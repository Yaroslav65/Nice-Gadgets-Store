const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = { app, PORT };
