import express, { Express, Request, Response } from 'express';

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = { app, PORT };
