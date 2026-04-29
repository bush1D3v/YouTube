import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../app.js';
import type { CreateTransactionInput, Transaction, TransactionFilters } from '../domain/transaction.js';
import type { ITransactionRepository } from '../repositories/transaction.repository.js';

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

describe('transaction routes', () => {
  let app: ReturnType<typeof createApp>;

  beforeEach(() => {
    app = createApp(new InMemoryTransactionRepository());
  });

  it('runs the full create, list, summary and delete flow', async () => {
    const income = await request(app)
      .post('/transactions')
      .send({ title: 'Salário', amount: 7000, type: 'INCOME', category: 'salário' })
      .expect(201);

    await request(app)
      .post('/transactions')
      .send({ title: 'Mercado', amount: 320.5, type: 'EXPENSE', category: 'alimentação' })
      .expect(201);

    const list = await request(app).get('/transactions?type=EXPENSE&category=alimentação').expect(200);
    expect(list.body.data).toHaveLength(1);
    expect(list.body.data[0]).toMatchObject({ title: 'Mercado', amount: -320.5, type: 'EXPENSE' });

    const summary = await request(app).get('/summary').expect(200);
    expect(summary.body.data).toEqual({ income: 7000, expense: 320.5, balance: 6679.5, count: 2 });

    await request(app).delete(`/transactions/${income.body.data.id}`).expect(204);

    const afterDelete = await request(app).get('/summary').expect(200);
    expect(afterDelete.body.data).toEqual({ income: 0, expense: 320.5, balance: -320.5, count: 1 });
  });

  it('returns validation details for invalid payloads', async () => {
    const response = await request(app)
      .post('/transactions')
      .send({ title: 'x', amount: 0, type: 'INCOME', category: '' })
      .expect(400);

    expect(response.body.error.code).toBe('BAD_REQUEST');
    expect(response.body.error.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'body.title' }),
        expect.objectContaining({ path: 'body.amount' }),
        expect.objectContaining({ path: 'body.category' })
      ])
    );
  });

  it('returns 400 for malformed ids and 404 for unknown valid ids', async () => {
    await request(app).delete('/transactions/not-a-uuid').expect(400);
    await request(app).delete(`/transactions/${randomUUID()}`).expect(404);
  });
});
