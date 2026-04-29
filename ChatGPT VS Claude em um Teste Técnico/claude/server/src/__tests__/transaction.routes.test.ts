import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { randomUUID } from 'node:crypto';
import { createApp } from '../app';
import { TransactionController } from '../controllers/transaction.controller';
import { TransactionService } from '../services/transaction.service';
import { buildTransactionRouter } from '../routes/transaction.routes';
import type { ITransactionRepository } from '../repositories/transaction.repository';
import type { Summary, Transaction } from '../domain/transaction';

class InMemoryRepo implements ITransactionRepository {
  store = new Map<string, Transaction>();
  async findAll(filter: { type?: string; category?: string; search?: string }) {
    return [...this.store.values()]
      .filter((t) => (filter.type ? t.type === filter.type : true))
      .filter((t) => (filter.category ? t.category === filter.category : true))
      .filter((t) =>
        filter.search ? t.title.toLowerCase().includes(filter.search.toLowerCase()) : true,
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async findById(id: string) {
    return this.store.get(id) ?? null;
  }
  async create(data: Omit<Transaction, 'id' | 'createdAt'>) {
    const tx: Transaction = { ...data, id: randomUUID(), createdAt: new Date() };
    this.store.set(tx.id, tx);
    return tx;
  }
  async delete(id: string) {
    this.store.delete(id);
  }
  async summary(): Promise<Summary> {
    let income = 0;
    let expense = 0;
    for (const t of this.store.values()) {
      if (t.type === 'INCOME') income += t.amount;
      else expense += t.amount;
    }
    return { income, expense, balance: income - expense, count: this.store.size };
  }
}

const buildTestApp = () => {
  const repo = new InMemoryRepo();
  const service = new TransactionService(repo);
  const controller = new TransactionController(service);
  return { app: createApp(buildTransactionRouter(controller)), repo };
};

describe('Transaction routes (HTTP)', () => {
  it('GET /transactions returns empty list initially', async () => {
    const { app } = buildTestApp();
    const res = await request(app).get('/transactions');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it('POST /transactions validates body', async () => {
    const { app } = buildTestApp();
    const res = await request(app)
      .post('/transactions')
      .send({ title: '', amount: -1, type: 'INVALID', category: '' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('BAD_REQUEST');
    expect(Array.isArray(res.body.error.details)).toBe(true);
  });

  it('full flow: create → list → summary → delete', async () => {
    const { app } = buildTestApp();

    const created = await request(app)
      .post('/transactions')
      .send({ title: 'Salary', amount: 5000, type: 'INCOME', category: 'work' });
    expect(created.status).toBe(201);
    expect(created.body.data.id).toBeDefined();

    await request(app)
      .post('/transactions')
      .send({ title: 'Groceries', amount: 200, type: 'EXPENSE', category: 'food' });

    const list = await request(app).get('/transactions');
    expect(list.body.data).toHaveLength(2);

    const summary = await request(app).get('/summary');
    expect(summary.body.data).toMatchObject({
      income: 5000,
      expense: 200,
      balance: 4800,
      count: 2,
    });

    const filtered = await request(app).get('/transactions?type=EXPENSE');
    expect(filtered.body.data).toHaveLength(1);
    expect(filtered.body.data[0].type).toBe('EXPENSE');

    const del = await request(app).delete(`/transactions/${created.body.data.id}`);
    expect(del.status).toBe(204);

    const afterDelete = await request(app).delete(`/transactions/${created.body.data.id}`);
    expect(afterDelete.status).toBe(404);
  });

  it('rejects malformed UUID on delete', async () => {
    const { app } = buildTestApp();
    const res = await request(app).delete('/transactions/not-a-uuid');
    expect(res.status).toBe(400);
  });
});
