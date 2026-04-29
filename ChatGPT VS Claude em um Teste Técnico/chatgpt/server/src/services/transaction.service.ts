import type { CreateTransactionInput, FinancialSummary, Transaction, TransactionFilters } from '../domain/transaction.js';
import { HttpError } from '../errors/HttpError.js';
import type { ITransactionRepository } from '../repositories/transaction.repository.js';

function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

export class TransactionService {
  constructor(private readonly repository: ITransactionRepository) {}

  async list(filters: TransactionFilters = {}): Promise<Transaction[]> {
    return this.repository.list({
      ...filters,
      category: filters.category ? normalizeText(filters.category).toLowerCase() : undefined,
      search: filters.search ? normalizeText(filters.search) : undefined
    });
  }

  async create(input: CreateTransactionInput): Promise<Transaction> {
    const signedAmount = input.type === 'EXPENSE' ? -Math.abs(input.amount) : Math.abs(input.amount);

    return this.repository.create({
      title: normalizeText(input.title),
      amount: roundCurrency(signedAmount),
      type: input.type,
      category: normalizeText(input.category).toLowerCase()
    });
  }

  async remove(id: string): Promise<void> {
    const transaction = await this.repository.findById(id);

    if (!transaction) {
      throw HttpError.notFound('Transaction not found');
    }

    await this.repository.delete(id);
  }

  async summary(): Promise<FinancialSummary> {
    const transactions = await this.repository.list();

    const income = transactions
      .filter((transaction) => transaction.type === 'INCOME')
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

    const expense = transactions
      .filter((transaction) => transaction.type === 'EXPENSE')
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

    return {
      income: roundCurrency(income),
      expense: roundCurrency(expense),
      balance: roundCurrency(income - expense),
      count: transactions.length
    };
  }
}
