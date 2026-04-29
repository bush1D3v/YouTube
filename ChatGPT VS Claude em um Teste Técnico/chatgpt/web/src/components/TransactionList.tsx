import clsx from 'clsx';
import { capitalize, formatDate, formatSignedCurrency } from '@/lib/format';
import type { Transaction } from '@/types/transaction';

type TransactionListProps = {
  transactions: Transaction[];
  isLoading?: boolean;
  deletingId?: string;
  onDelete: (transaction: Transaction) => void;
};

export function TransactionList({ transactions, isLoading = false, deletingId, onDelete }: TransactionListProps) {
  if (isLoading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm" aria-busy="true" aria-label="Carregando transações">
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-20 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      </section>
    );
  }

  if (transactions.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-cyan-50 text-3xl" aria-hidden>
          ◌
        </div>
        <h2 className="mt-5 text-xl font-black text-slate-950">Nenhuma transação encontrada</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          Cadastre sua primeira movimentação ou ajuste os filtros para visualizar outros resultados.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="transactions-heading" className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="transactions-heading" className="text-lg font-black text-slate-950">
            Histórico de transações
          </h2>
          <p className="text-sm text-slate-500">Ordenado por data, com as movimentações mais recentes primeiro.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">{transactions.length} itens</span>
      </div>

      <ul className="divide-y divide-slate-100">
        {transactions.map((transaction) => {
          const isExpense = transaction.type === 'EXPENSE';
          return (
            <li key={transaction.id} className="grid gap-4 p-5 transition hover:bg-slate-50 md:grid-cols-[1.4fr_0.8fr_0.9fr_auto] md:items-center">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-base font-black text-slate-950">{transaction.title}</h3>
                  <span
                    className={clsx(
                      'rounded-full px-2.5 py-1 text-xs font-black uppercase tracking-wide',
                      isExpense ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
                    )}
                  >
                    {isExpense ? 'Despesa' : 'Receita'}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  <time dateTime={transaction.createdAt}>{formatDate(transaction.createdAt)}</time>
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600 md:justify-self-start">
                {capitalize(transaction.category)}
              </span>

              <strong className={clsx('text-lg font-black tabular-nums md:text-right', isExpense ? 'text-rose-600' : 'text-emerald-600')}>
                {formatSignedCurrency(transaction.amount)}
              </strong>

              <button
                type="button"
                disabled={deletingId === transaction.id}
                onClick={() => onDelete(transaction)}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-100 disabled:cursor-not-allowed disabled:opacity-60 md:justify-self-end"
                aria-label={`Excluir transação ${transaction.title}`}
              >
                {deletingId === transaction.id ? 'Excluindo...' : 'Excluir'}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
