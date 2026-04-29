import type { Request, Response } from 'express';
import type { TransactionFilters } from '../domain/transaction.js';
import type { TransactionService } from '../services/transaction.service.js';

export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  list = async (request: Request, response: Response) => {
    const filters = request.query as TransactionFilters;
    const transactions = await this.service.list(filters);
    response.json({ data: transactions });
  };

  create = async (request: Request, response: Response) => {
    const transaction = await this.service.create(request.body);
    response.status(201).json({ data: transaction });
  };

  remove = async (request: Request, response: Response) => {
    await this.service.remove(request.params.id as string);
    response.status(204).send();
  };

  summary = async (_request: Request, response: Response) => {
    const summary = await this.service.summary();
    response.json({ data: summary });
  };
}
