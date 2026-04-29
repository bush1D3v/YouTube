import { apiFetch } from './apiClient';
import type {
  Summary,
  Transaction,
  TransactionFilters,
  TransactionType,
} from '@/types/transaction';

export interface CreateTransactionPayload {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
}

export const transactionsService = {
  list: (filters: TransactionFilters = {}) =>
    apiFetch<Transaction[]>('/transactions', { query: filters }),

  create: (payload: CreateTransactionPayload) =>
    apiFetch<Transaction>('/transactions', { method: 'POST', body: payload }),

  remove: (id: string) =>
    apiFetch<void>(`/transactions/${id}`, { method: 'DELETE' }),

  summary: () => apiFetch<Summary>('/summary'),
};
