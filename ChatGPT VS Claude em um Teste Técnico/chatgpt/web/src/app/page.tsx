'use client';

import { useMemo, useState } from 'react';
import { Modal } from '@/components/Modal';
import { StatusBanner } from '@/components/StatusBanner';
import { SummaryCard } from '@/components/SummaryCard';
import { TransactionFilters } from '@/components/TransactionFilters';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { useCreateTransaction, useDeleteTransaction, useSummary, useTransactions } from '@/hooks/useTransactions';
import { ApiError } from '@/services/apiClient';
import type { CreateTransactionPayload, Transaction, TransactionFilters as TransactionFiltersState } from '@/types/transaction';

const emptyFilters: TransactionFiltersState = { type: 'ALL', category: '', search: '' };

export default function HomePage() {
  const [filters, setFilters] = useState<TransactionFiltersState>(emptyFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setFormError] = useState<string | undefined>();
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | undefined>();

  const summaryQuery = useSummary();
  const transactionsQuery = useTransactions(filters);
  const allTransactionsQuery = useTransactions(emptyFilters);
  const createTransaction = useCreateTransaction();
  const deleteTransaction = useDeleteTransaction();

  const categories = useMemo(() => {
    const source = allTransactionsQuery.data ?? [];
    return Array.from(new Set(source.map((transaction) => transaction.category))).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [allTransactionsQuery.data]);

  const summary = summaryQuery.data ?? { income: 0, expense: 0, balance: 0, count: 0 };

  async function handleCreate(payload: CreateTransactionPayload) {
    setFormError(undefined);
    setStatus(undefined);

    try {
      await createTransaction.mutateAsync(payload);
      setIsModalOpen(false);
      setStatus({ type: 'success', message: 'Transação cadastrada com sucesso.' });
    } catch (error) {
      setFormError(error instanceof ApiError ? error.message : 'Não foi possível cadastrar a transação.');
    }
  }

  async function handleDelete(transaction: Transaction) {
    const shouldDelete = window.confirm(`Excluir a transação "${transaction.title}"? Esta ação não pode ser desfeita.`);
    if (!shouldDelete) return;

    setStatus(undefined);

    try {
      await deleteTransaction.mutateAsync(transaction.id);
      setStatus({ type: 'success', message: 'Transação excluída com sucesso.' });
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof ApiError ? error.message : 'Não foi possível excluir a transação.' });
    }
  }

  const hasError = transactionsQuery.isError || summaryQuery.isError;

  return (
    <main id="conteudo" className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <header className="overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-200">Finance Control</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Controle financeiro claro, rápido e confiável.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Cadastre receitas e despesas, acompanhe seu saldo em tempo real e encontre movimentações por tipo,
              categoria ou título com uma interface responsiva e acessível.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-semibold text-slate-300">Movimentações registradas</p>
            <strong className="mt-2 block text-5xl font-black tabular-nums">{summary.count}</strong>
            <p className="mt-3 text-sm leading-6 text-slate-300">Dados persistidos via API Express, Prisma e SQLite.</p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3" aria-label="Resumo financeiro">
        <SummaryCard title="Receitas" value={summary.income} tone="income" description="Total de entradas positivas registradas." isLoading={summaryQuery.isLoading} />
        <SummaryCard title="Despesas" value={summary.expense} tone="expense" description="Total de saídas consideradas no período." isLoading={summaryQuery.isLoading} />
        <SummaryCard title="Saldo" value={summary.balance} tone="balance" description="Receitas menos despesas em tempo real." isLoading={summaryQuery.isLoading} />
      </section>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-950">Painel de movimentações</h2>
          <p className="mt-1 text-sm text-slate-500">Gerencie seu fluxo financeiro diário com validação ponta a ponta.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFormError(undefined);
            setIsModalOpen(true);
          }}
          className="rounded-2xl bg-cyan-600 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200"
        >
          Nova transação
        </button>
      </div>

      {status ? <StatusBanner type={status.type} message={status.message} /> : null}
      {hasError ? <StatusBanner type="error" message="Não foi possível carregar os dados. Verifique se a API está rodando." /> : null}

      <TransactionFilters filters={filters} categories={categories} onChange={setFilters} onClear={() => setFilters(emptyFilters)} />

      <TransactionList
        transactions={transactionsQuery.data ?? []}
        isLoading={transactionsQuery.isLoading}
        deletingId={deleteTransaction.variables}
        onDelete={(transaction) => void handleDelete(transaction)}
      />

      <Modal title="Cadastrar transação" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TransactionForm categories={categories} isSubmitting={createTransaction.isPending} apiError={formError} onSubmit={handleCreate} />
      </Modal>
    </main>
  );
}
