import type { Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/transaction.service';
import type {
  CreateTransactionInput,
  ListTransactionsQuery,
} from '../schemas/transaction.schema';

export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as ListTransactionsQuery;
      const data = await this.service.list(query);
      res.json({ data });
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as CreateTransactionInput;
      const transaction = await this.service.create(body);
      res.status(201).json({ data: transaction });
    } catch (err) {
      next(err);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      await this.service.remove(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  summary = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.summary();
      res.json({ data });
    } catch (err) {
      next(err);
    }
  };
}
