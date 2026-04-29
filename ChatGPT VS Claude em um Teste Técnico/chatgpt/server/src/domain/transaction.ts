export const TRANSACTION_TYPES = ['INCOME', 'EXPENSE'] as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  createdAt: Date;
};

export type TransactionFilters = {
  type?: TransactionType;
  category?: string;
  search?: string;
};

export type CreateTransactionInput = {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
};

export type FinancialSummary = {
  income: number;
  expense: number;
  balance: number;
  count: number;
};
