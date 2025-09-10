import express from 'express';
import authRoutes from './routes/auth.routes';
import dashboardRoutes from './routes/dashboard.routes';
import { env } from './config/env';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => res.json({ status: 'ok' }));
app.use(authRoutes);
app.use(dashboardRoutes);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(env.port, () => console.log(`Server running on http://localhost:${env.port}`));
