import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { TransactionController } from './controllers/transaction.controller.js';
import { env } from './config/env.js';
import { prisma } from './config/prisma.js';
import { HttpError } from './errors/HttpError.js';
import { errorMiddleware } from './middlewares/error.js';
import type { ITransactionRepository } from './repositories/transaction.repository.js';
import { PrismaTransactionRepository } from './repositories/transaction.repository.js';
import { createTransactionRouter } from './routes/transaction.routes.js';
import { TransactionService } from './services/transaction.service.js';

export function createApp(repository: ITransactionRepository = new PrismaTransactionRepository(prisma)) {
  const app = express();
  const service = new TransactionService(repository);
  const controller = new TransactionController(service);

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type']
    })
  );
  app.use(express.json({ limit: '100kb' }));

  if (env.NODE_ENV !== 'test') {
    app.use(morgan('tiny'));
  }

  app.get('/health', (_request, response) => {
    response.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use(createTransactionRouter(controller));

  app.use((_request, _response, next) => {
    next(new HttpError(404, 'NOT_FOUND', 'Route not found'));
  });

  app.use(errorMiddleware);

  return app;
}
