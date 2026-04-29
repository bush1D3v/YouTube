import clsx from 'clsx';
import { formatCurrency } from '@/lib/format';

type SummaryCardProps = {
  title: string;
  value: number;
  description: string;
  tone: 'income' | 'expense' | 'balance';
  isLoading?: boolean;
};

const toneStyles = {
  income: 'from-emerald-500 to-teal-600 text-white',
  expense: 'from-rose-500 to-red-600 text-white',
  balance: 'from-slate-900 to-cyan-800 text-white'
};

export function SummaryCard({ title, value, description, tone, isLoading = false }: SummaryCardProps) {
  return (
    <article className={clsx('overflow-hidden rounded-3xl bg-gradient-to-br p-6 shadow-soft', toneStyles[tone])} aria-busy={isLoading}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/75">{title}</p>
          {isLoading ? (
            <div className="mt-4 h-9 w-36 animate-pulse rounded-full bg-white/25" />
          ) : (
            <strong className="mt-3 block text-3xl font-black tracking-tight sm:text-4xl">{formatCurrency(value)}</strong>
          )}
        </div>
        <span aria-hidden className="grid size-12 place-items-center rounded-2xl bg-white/20 text-2xl shadow-inner">
          {tone === 'income' ? '↗' : tone === 'expense' ? '↘' : '●'}
        </span>
      </div>
      <p className="mt-5 text-sm leading-6 text-white/80">{description}</p>
    </article>
  );
}
