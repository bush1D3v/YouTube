import { randomUUID } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import type { CreateTransactionInput, Transaction, TransactionFilters } from '../domain/transaction.js';
import type { ITransactionRepository } from '../repositories/transaction.repository.js';
import { TransactionService } from '../services/transaction.service.js';

class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];

  async list(filters: TransactionFilters = {}): Promise<Transaction[]> {
    return this.transactions.filter((transaction) => {
      const matchesType = filters.type ? transaction.type === filters.type : true;
      const matchesCategory = filters.category ? transaction.category === filters.category : true;
      const matchesSearch = filters.search ? transaction.title.toLowerCase().includes(filters.search.toLowerCase()) : true;
      return matchesType && matchesCategory && matchesSearch;
    });
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.transactions.find((transaction) => transaction.id === id) ?? null;
  }

  async create(input: CreateTransactionInput): Promise<Transaction> {
    const transaction = { ...input, id: randomUUID(), createdAt: new Date() };
    this.transactions.unshift(transaction);
    return transaction;
  }

  async delete(id: string): Promise<void> {
    this.transactions = this.transactions.filter((transaction) => transaction.id !== id);
  }
}

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    service = new TransactionService(new InMemoryTransactionRepository());
  });

  it('normalizes input and stores expenses as negative amounts', async () => {
    const expense = await service.create({ title: '  Mercado   semanal ', amount: 125.789, type: 'EXPENSE', category: ' Alimentação ' });

    expect(expense.title).toBe('Mercado semanal');
    expect(expense.category).toBe('alimentação');
    expect(expense.amount).toBe(-125.79);
  });

  it('calculates income, expense and balance correctly', async () => {
    await service.create({ title: 'Salário', amount: 5000, type: 'INCOME', category: 'salário' });
    await service.create({ title: 'Aluguel', amount: 1500, type: 'EXPENSE', category: 'moradia' });
    await service.create({ title: 'Freela', amount: 800, type: 'INCOME', category: 'freela' });

    await expect(service.summary()).resolves.toEqual({ income: 5800, expense: 1500, balance: 4300, count: 3 });
  });

  it('throws a not found error before deleting unknown transactions', async () => {
    await expect(service.remove(randomUUID())).rejects.toMatchObject({ statusCode: 404, code: 'NOT_FOUND' });
  });
});
