import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { buildTransactionRouter } from './routes/transaction.routes';
import { errorHandler, notFoundHandler } from './middlewares/error';

/**
 * App factory. Returning an Express instance (instead of starting the server)
 * makes the app trivially testable with Supertest.
 */
export const createApp = (router = buildTransactionRouter()): Express => {
  const app = express();

  // Security & operational middlewares.
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: false }));
  app.use(express.json({ limit: '100kb' }));
  if (env.NODE_ENV !== 'test') app.use(morgan('dev'));

  // Liveness probe — useful for Docker/Kubernetes healthchecks.
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/', router);

  // 404 + central error handler must come last.
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
