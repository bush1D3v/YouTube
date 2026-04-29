import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  transactionsService,
  type CreateTransactionPayload,
} from '@/services/transactionsService';
import type { TransactionFilters } from '@/types/transaction';

const KEYS = {
  list: (filters: TransactionFilters) => ['transactions', filters] as const,
  summary: ['summary'] as const,
};

export const useTransactions = (filters: TransactionFilters) =>
  useQuery({
    queryKey: KEYS.list(filters),
    queryFn: () => transactionsService.list(filters),
  });

export const useSummary = () =>
  useQuery({
    queryKey: KEYS.summary,
    queryFn: () => transactionsService.summary(),
  });

export const useCreateTransaction = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTransactionPayload) => transactionsService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['transactions'] });
      qc.invalidateQueries({ queryKey: KEYS.summary });
    },
  });
};

export const useDeleteTransaction = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => transactionsService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['transactions'] });
      qc.invalidateQueries({ queryKey: KEYS.summary });
    },
  });
};
