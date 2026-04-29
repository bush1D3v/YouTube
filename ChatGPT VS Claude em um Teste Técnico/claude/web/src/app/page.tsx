'use client';

import { useState } from 'react';
import { Modal } from '@/components/Modal';
import { SummaryCard } from '@/components/SummaryCard';
import { TransactionFilters } from '@/components/TransactionFilters';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import {
  useCreateTransaction,
  useDeleteTransaction,
  useSummary,
  useTransactions,
} from '@/hooks/useTransactions';
import type { TransactionFilters as Filters, Transaction } from '@/types/transaction';

export default function HomePage() {
  const [filters, setFilters] = useState<Filters>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const summaryQuery = useSummary();
  const transactionsQuery = useTransactions(filters);
  const createMutation = useCreateTransaction();
  const deleteMutation = useDeleteTransaction();

  const onConfirmDelete = (tx: Transaction) => {
    if (window.confirm(`Excluir a transação "${tx.title}"?`)) {
      deleteMutation.mutate(tx.id);
    }
  };

  return (
    <main id="main" className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Controle Financeiro
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Acompanhe suas receitas e despesas em um só lugar.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          + Nova transação
        </button>
      </header>

      <section
        aria-label="Resumo financeiro"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <SummaryCard
          variant="income"
          label="Receitas"
          amount={summaryQuery.data?.income ?? 0}
          isLoading={summaryQuery.isLoading}
        />
        <SummaryCard
          variant="expense"
          label="Despesas"
          amount={summaryQuery.data?.expense ?? 0}
          isLoading={summaryQuery.isLoading}
        />
        <SummaryCard
          variant="balance"
          label="Saldo atual"
          amount={summaryQuery.data?.balance ?? 0}
          isLoading={summaryQuery.isLoading}
        />
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="sr-only">Transações</h2>
        <TransactionFilters value={filters} onChange={setFilters} />
        <TransactionList
          transactions={transactionsQuery.data ?? []}
          isLoading={transactionsQuery.isLoading}
          isError={transactionsQuery.isError}
          onDelete={onConfirmDelete}
          deletingId={
            deleteMutation.isPending ? (deleteMutation.variables as string) : null
          }
        />
      </section>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nova transação"
        description="Preencha os dados abaixo para registrar a transação."
      >
        <TransactionForm
          submitting={createMutation.isPending}
          onCancel={() => setIsModalOpen(false)}
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values);
            setIsModalOpen(false);
          }}
        />
      </Modal>

      <footer className="mt-12 text-center text-xs text-slate-400">
        Construído com Next.js, React Query e TypeScript.
      </footer>
    </main>
  );
}
