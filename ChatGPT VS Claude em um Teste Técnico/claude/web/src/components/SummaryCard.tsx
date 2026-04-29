import clsx from 'clsx';
import { formatCurrency } from '@/lib/format';

interface SummaryCardProps {
  label: string;
  amount: number;
  variant: 'income' | 'expense' | 'balance';
  isLoading?: boolean;
}

const variantStyles: Record<SummaryCardProps['variant'], string> = {
  income: 'from-emerald-500 to-emerald-600 text-white',
  expense: 'from-red-500 to-red-600 text-white',
  balance: 'from-slate-800 to-slate-900 text-white',
};

const variantIcon: Record<SummaryCardProps['variant'], string> = {
  income: '↑',
  expense: '↓',
  balance: '=',
};

export function SummaryCard({ label, amount, variant, isLoading }: SummaryCardProps) {
  return (
    <article
      aria-label={label}
      aria-busy={isLoading}
      className={clsx(
        'card overflow-hidden bg-gradient-to-br p-5',
        variantStyles[variant],
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium opacity-90">{label}</h2>
        <span aria-hidden className="text-lg opacity-80">
          {variantIcon[variant]}
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tabular-nums sm:text-3xl">
        {isLoading ? <span className="opacity-60">—</span> : formatCurrency(amount)}
      </p>
    </article>
  );
}
