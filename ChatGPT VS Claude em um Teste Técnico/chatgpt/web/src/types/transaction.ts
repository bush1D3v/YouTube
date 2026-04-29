export const TRANSACTION_TYPES = ['INCOME', 'EXPENSE'] as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  createdAt: string;
};

export type TransactionFilters = {
  type?: TransactionType | 'ALL';
  category?: string;
  search?: string;
};

export type CreateTransactionPayload = {
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
