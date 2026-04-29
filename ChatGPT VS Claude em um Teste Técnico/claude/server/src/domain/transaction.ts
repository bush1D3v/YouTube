/**
 * Domain types for the Transaction aggregate.
 *
 * `amount` is stored as a positive number; the sign is implied by `type`.
 * This keeps the API explicit and avoids ambiguity from signed amounts.
 */

export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  createdAt: Date;
}

export interface TransactionFilter {
  type?: TransactionType;
  category?: string;
  search?: string;
}

export interface Summary {
  income: number;
  expense: number;
  balance: number;
  count: number;
}
