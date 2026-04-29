import type { Prisma, PrismaClient } from '@prisma/client';
import { prisma as defaultPrisma } from '../config/prisma';
import type {
  Summary,
  Transaction,
  TransactionFilter,
  TransactionType,
} from '../domain/transaction';

/**
 * Repository abstracts persistence. Keeping it isolated lets us:
 *  - swap the storage engine (SQLite → Postgres → in-memory) with no impact;
 *  - mock it cleanly in unit tests.
 */
export interface ITransactionRepository {
  findAll(filter: TransactionFilter): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
  create(data: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction>;
  delete(id: string): Promise<void>;
  summary(): Promise<Summary>;
}

type PrismaRow = {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: Date;
};

const toDomain = (row: PrismaRow): Transaction => ({
  id: row.id,
  title: row.title,
  amount: row.amount,
  type: row.type as TransactionType,
  category: row.category,
  createdAt: row.createdAt,
});

export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly db: PrismaClient = defaultPrisma) {}

  async findAll(filter: TransactionFilter): Promise<Transaction[]> {
    const where: Prisma.TransactionWhereInput = {};
    if (filter.type) where.type = filter.type;
    if (filter.category) where.category = { equals: filter.category };
    if (filter.search) where.title = { contains: filter.search };

    const rows = await this.db.transaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(toDomain);
  }

  async findById(id: string): Promise<Transaction | null> {
    const row = await this.db.transaction.findUnique({ where: { id } });
    return row ? toDomain(row) : null;
  }

  async create(data: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> {
    const row = await this.db.transaction.create({ data });
    return toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.db.transaction.delete({ where: { id } });
  }

  async summary(): Promise<Summary> {
    const grouped = await this.db.transaction.groupBy({
      by: ['type'],
      _sum: { amount: true },
      _count: { _all: true },
    });

    let income = 0;
    let expense = 0;
    let count = 0;
    for (const g of grouped) {
      const total = g._sum.amount ?? 0;
      count += g._count._all;
      if (g.type === 'INCOME') income = total;
      else if (g.type === 'EXPENSE') expense = total;
    }
    return {
      income,
      expense,
      balance: income - expense,
      count,
    };
  }
}
