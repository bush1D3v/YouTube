/**
 * Shared domain types — kept aligned with the back-end contract.
 * In larger projects this would live in a shared package or be generated
 * from an OpenAPI spec to guarantee type-level alignment.
 */
export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  createdAt: string;
}

export interface Summary {
  income: number;
  expense: number;
  balance: number;
  count: number;
}

export interface TransactionFilters {
  type?: TransactionType;
  category?: string;
  search?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Array<{ path: string; message: string }>;
}
