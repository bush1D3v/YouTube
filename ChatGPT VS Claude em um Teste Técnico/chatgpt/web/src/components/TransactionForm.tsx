'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { transactionFormSchema, type TransactionFormData } from '@/lib/validation';
import type { CreateTransactionPayload } from '@/types/transaction';

type TransactionFormProps = {
  categories: string[];
  isSubmitting?: boolean;
  apiError?: string;
  onSubmit: (payload: CreateTransactionPayload) => Promise<void> | void;
};

export function TransactionForm({ categories, isSubmitting = false, apiError, onSubmit }: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      title: '',
      amount: 0,
      type: 'EXPENSE',
      category: ''
    }
  });

  async function submit(data: TransactionFormData) {
    await onSubmit(data);
    reset({ title: '', amount: 0, type: 'EXPENSE', category: '' });
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5" noValidate>
      {apiError ? (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {apiError}
        </div>
      ) : null}

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">Título</span>
        <input
          {...register('title')}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
          placeholder="Ex: Mercado, salário, aluguel"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
        />
        {errors.title ? (
          <span id="title-error" className="text-sm font-medium text-red-600">
            {errors.title.message}
          </span>
        ) : null}
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">Valor</span>
          <input
            {...register('amount')}
            type="number"
            step="0.01"
            min="0.01"
            inputMode="decimal"
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? 'amount-error' : undefined}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
          {errors.amount ? (
            <span id="amount-error" className="text-sm font-medium text-red-600">
              {errors.amount.message}
            </span>
          ) : null}
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">Categoria</span>
          <input
            {...register('category')}
            list="category-suggestions"
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? 'category-error' : undefined}
            placeholder="Ex: alimentação"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
          <datalist id="category-suggestions">
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
          {errors.category ? (
            <span id="category-error" className="text-sm font-medium text-red-600">
              {errors.category.message}
            </span>
          ) : null}
        </label>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-slate-700">Tipo</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="cursor-pointer rounded-2xl border border-emerald-200 bg-emerald-50 p-4 transition has-[:checked]:border-emerald-500 has-[:checked]:ring-4 has-[:checked]:ring-emerald-100">
            <input {...register('type')} type="radio" value="INCOME" className="sr-only" />
            <span className="block text-sm font-black text-emerald-700">Receita</span>
            <span className="mt-1 block text-sm text-emerald-700/80">Entradas aumentam o saldo.</span>
          </label>
          <label className="cursor-pointer rounded-2xl border border-rose-200 bg-rose-50 p-4 transition has-[:checked]:border-rose-500 has-[:checked]:ring-4 has-[:checked]:ring-rose-100">
            <input {...register('type')} type="radio" value="EXPENSE" className="sr-only" />
            <span className="block text-sm font-black text-rose-700">Despesa</span>
            <span className="mt-1 block text-sm text-rose-700/80">Saídas reduzem o saldo automaticamente.</span>
          </label>
        </div>
        {errors.type ? <span className="text-sm font-medium text-red-600">{errors.type.message}</span> : null}
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Salvando...' : 'Cadastrar transação'}
      </button>
    </form>
  );
}
