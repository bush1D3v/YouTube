import { HttpError } from '../errors/HttpError';
import type { ITransactionRepository } from '../repositories/transaction.repository';
import type { CreateTransactionInput } from '../schemas/transaction.schema';
import type { Summary, Transaction, TransactionFilter } from '../domain/transaction';

/**
 * Application service. Holds business rules and orchestrates the repository.
 * Controllers should never talk to the repository directly.
 */
export class TransactionService {
  constructor(private readonly repo: ITransactionRepository) {}

  list(filter: TransactionFilter): Promise<Transaction[]> {
    return this.repo.findAll(filter);
  }

  async create(input: CreateTransactionInput): Promise<Transaction> {
    // Normalize free-form fields to keep stored data clean and consistent.
    const normalized = {
      title: input.title.trim(),
      amount: Number(input.amount.toFixed(2)),
      type: input.type,
      category: input.category.trim().toLowerCase(),
    };
    return this.repo.create(normalized);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.repo.findById(id);
    if (!existing) throw HttpError.notFound('Transaction not found');
    await this.repo.delete(id);
  }

  summary(): Promise<Summary> {
    return this.repo.summary();
  }
}
