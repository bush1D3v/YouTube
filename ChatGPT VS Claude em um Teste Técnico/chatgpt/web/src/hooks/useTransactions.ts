'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '@/services/transactionsService';
import type { CreateTransactionPayload, TransactionFilters } from '@/types/transaction';

export const queryKeys = {
  transactions: (filters: TransactionFilters) => ['transactions', filters] as const,
  summary: ['summary'] as const
};

export function useTransactions(filters: TransactionFilters) {
  return useQuery({
    queryKey: queryKeys.transactions(filters),
    queryFn: () => transactionsService.list(filters),
    staleTime: 30_000
  });
}

export function useSummary() {
  return useQuery({
    queryKey: queryKeys.summary,
    queryFn: transactionsService.summary,
    staleTime: 30_000
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTransactionPayload) => transactionsService.create(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['transactions'] }),
        queryClient.invalidateQueries({ queryKey: queryKeys.summary })
      ]);
    }
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transactionsService.remove(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['transactions'] }),
        queryClient.invalidateQueries({ queryKey: queryKeys.summary })
      ]);
    }
  });
}
