import { describe, it, expect, beforeEach } from 'vitest';
import { randomUUID } from 'node:crypto';
import { TransactionService } from '../services/transaction.service';
import type { ITransactionRepository } from '../repositories/transaction.repository';
import type { Summary, Transaction } from '../domain/transaction';
import { HttpError } from '../errors/HttpError';

class InMemoryRepo implements ITransactionRepository {
  public store = new Map<string, Transaction>();

  async findAll() {
    return [...this.store.values()].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
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

describe('TransactionService', () => {
  let repo: InMemoryRepo;
  let service: TransactionService;

  beforeEach(() => {
    repo = new InMemoryRepo();
    service = new TransactionService(repo);
  });

  it('normalizes title and category on create', async () => {
    const tx = await service.create({
      title: '  Salary  ',
      amount: 1000.126,
      type: 'INCOME',
      category: ' Salary ',
    });
    expect(tx.title).toBe('Salary');
    expect(tx.category).toBe('salary');
    expect(tx.amount).toBeCloseTo(1000.13, 2);
  });

  it('computes summary correctly', async () => {
    await service.create({ title: 'A', amount: 100, type: 'INCOME', category: 'x' });
    await service.create({ title: 'B', amount: 30, type: 'EXPENSE', category: 'x' });
    const summary = await service.summary();
    expect(summary.income).toBe(100);
    expect(summary.expense).toBe(30);
    expect(summary.balance).toBe(70);
    expect(summary.count).toBe(2);
  });

  it('throws 404 when removing a missing transaction', async () => {
    await expect(service.remove(randomUUID())).rejects.toBeInstanceOf(HttpError);
  });

  it('removes an existing transaction', async () => {
    const tx = await service.create({ title: 'A', amount: 10, type: 'INCOME', category: 'x' });
    await service.remove(tx.id);
    expect(await repo.findById(tx.id)).toBeNull();
  });
});
