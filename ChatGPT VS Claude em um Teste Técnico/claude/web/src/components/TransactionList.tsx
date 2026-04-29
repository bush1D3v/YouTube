'use client';

import clsx from 'clsx';
import type { Transaction } from '@/types/transaction';
import { formatCurrency, formatDate } from '@/lib/format';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (transaction: Transaction) => void;
  deletingId?: string | null;
}

export function TransactionList({
  transactions,
  isLoading,
  isError,
  onDelete,
  deletingId,
}: TransactionListProps) {
  if (isLoading) {
    return (
      <ul className="space-y-2" aria-busy="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <li
            key={i}
            className="card flex items-center justify-between p-4"
          >
            <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
          </li>
        ))}
      </ul>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="card border border-red-200 bg-red-50 p-6 text-red-700">
        Não foi possível carregar as transações. Verifique se a API está rodando.
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center gap-2 p-10 text-center text-slate-500">
        <p className="text-base font-medium">Nenhuma transação ainda</p>
        <p className="text-sm">Cadastre sua primeira receita ou despesa.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2" aria-label="Lista de transações">
      {transactions.map((tx) => {
        const isIncome = tx.type === 'INCOME';
        const isDeleting = deletingId === tx.id;
        return (
          <li
            key={tx.id}
            className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={clsx(
                    'inline-block h-2 w-2 rounded-full',
                    isIncome ? 'bg-emerald-500' : 'bg-red-500',
                  )}
                />
                <p className="truncate font-medium text-slate-900">{tx.title}</p>
              </div>
              <p className="mt-1 flex flex-wrap gap-x-2 text-xs text-slate-500">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 capitalize">
                  {tx.category}
                </span>
                <time dateTime={tx.createdAt}>{formatDate(tx.createdAt)}</time>
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <span
                className={clsx(
                  'tabular-nums font-semibold',
                  isIncome ? 'text-emerald-600' : 'text-red-600',
                )}
              >
                {isIncome ? '+' : '−'} {formatCurrency(tx.amount)}
              </span>
              <button
                type="button"
                onClick={() => onDelete(tx)}
                disabled={isDeleting}
                aria-label={`Excluir transação ${tx.title}`}
                className="rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
              >
                {isDeleting ? '…' : '✕'}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
