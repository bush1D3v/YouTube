import { Router, type RequestHandler } from 'express';
import type { TransactionController } from '../controllers/transaction.controller.js';
import { validate } from '../middlewares/validate.js';
import { createTransactionSchema, deleteTransactionSchema, transactionFiltersSchema } from '../schemas/transaction.schema.js';

function asyncHandler(handler: RequestHandler): RequestHandler {
  return (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
}

export function createTransactionRouter(controller: TransactionController) {
  const router = Router();

  router.get('/transactions', validate(transactionFiltersSchema), asyncHandler(controller.list));
  router.post('/transactions', validate(createTransactionSchema), asyncHandler(controller.create));
  router.delete('/transactions/:id', validate(deleteTransactionSchema), asyncHandler(controller.remove));
  router.get('/summary', asyncHandler(controller.summary));

  return router;
}
