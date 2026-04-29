import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { TransactionRepository } from '../repositories/transaction.repository';
import { TransactionService } from '../services/transaction.service';
import { validate } from '../middlewares/validate';
import {
  createTransactionSchema,
  idParamSchema,
  listTransactionsQuerySchema,
} from '../schemas/transaction.schema';

/**
 * Build the transaction router. Dependency injection keeps the module
 * testable — tests can inject a fake repository.
 */
export const buildTransactionRouter = (
  controller = new TransactionController(new TransactionService(new TransactionRepository())),
): Router => {
  const router = Router();

  router.get('/transactions', validate(listTransactionsQuerySchema, 'query'), controller.list);
  router.post('/transactions', validate(createTransactionSchema, 'body'), controller.create);
  router.delete('/transactions/:id', validate(idParamSchema, 'params'), controller.remove);
  router.get('/summary', controller.summary);

  return router;
};
