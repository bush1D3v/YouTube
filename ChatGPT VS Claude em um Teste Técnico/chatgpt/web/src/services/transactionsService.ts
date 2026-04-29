import { apiFetch } from './apiClient';
import type { CreateTransactionPayload, FinancialSummary, Transaction, TransactionFilters } from '@/types/transaction';

function buildQuery(filters: TransactionFilters): string {
  const params = new URLSearchParams();

  if (filters.type && filters.type !== 'ALL') params.set('type', filters.type);
  if (filters.category) params.set('category', filters.category);
  if (filters.search) params.set('search', filters.search);

  const query = params.toString();
  return query ? `?${query}` : '';
}

export const transactionsService = {
  list(filters: TransactionFilters = {}) {
    return apiFetch<Transaction[]>(`/transactions${buildQuery(filters)}`);
  },

  create(payload: CreateTransactionPayload) {
    return apiFetch<Transaction>('/transactions', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  remove(id: string) {
    return apiFetch<void>(`/transactions/${id}`, { method: 'DELETE' });
  },

  summary() {
    return apiFetch<FinancialSummary>('/summary');
  }
};
