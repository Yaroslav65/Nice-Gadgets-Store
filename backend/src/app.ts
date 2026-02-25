import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [/^http:\/\/localhost:\d+$/, /^http:\/\/127\.0\.0\.1:\d+$/],
  }),
);

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api', router);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

export { app, PORT };
