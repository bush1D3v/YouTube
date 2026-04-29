import type { PrismaClient, Transaction as PrismaTransaction } from '@prisma/client';
import type { CreateTransactionInput, Transaction, TransactionFilters, TransactionType } from '../domain/transaction.js';

export interface ITransactionRepository {
  list(filters?: TransactionFilters): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
  create(input: CreateTransactionInput): Promise<Transaction>;
  delete(id: string): Promise<void>;
}

function toDomain(transaction: PrismaTransaction): Transaction {
  return {
    id: transaction.id,
    title: transaction.title,
    amount: Number(transaction.amount),
    type: transaction.type as TransactionType,
    category: transaction.category,
    createdAt: transaction.createdAt
  };
}

export class PrismaTransactionRepository implements ITransactionRepository {
  constructor(private readonly client: PrismaClient) {}

  async list(filters: TransactionFilters = {}): Promise<Transaction[]> {
    const transactions = await this.client.transaction.findMany({
      where: {
        ...(filters.type ? { type: filters.type } : {}),
        ...(filters.category ? { category: { equals: filters.category } } : {}),
        ...(filters.search ? { title: { contains: filters.search } } : {})
      },
      orderBy: { createdAt: 'desc' }
    });

    return transactions.map(toDomain);
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.client.transaction.findUnique({ where: { id } });
    return transaction ? toDomain(transaction) : null;
  }

  async create(input: CreateTransactionInput): Promise<Transaction> {
    const transaction = await this.client.transaction.create({ data: input });
    return toDomain(transaction);
  }

  async delete(id: string): Promise<void> {
    await this.client.transaction.delete({ where: { id } });
  }
}
