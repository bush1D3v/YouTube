'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { transactionFormSchema, type TransactionFormValues } from '@/lib/validation';
import { ApiRequestError } from '@/services/apiClient';

interface TransactionFormProps {
  onSubmit: (values: TransactionFormValues) => Promise<void>;
  onCancel: () => void;
  submitting?: boolean;
}

export function TransactionForm({ onSubmit, onCancel, submitting }: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: { type: 'EXPENSE', title: '', amount: undefined, category: '' },
  });

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values);
    } catch (err) {
      // Map back-end field-level errors into the form for great UX.
      if (err instanceof ApiRequestError && err.apiError.details) {
        for (const detail of err.apiError.details) {
          const field = detail.path as keyof TransactionFormValues;
          if (field) setError(field, { message: detail.message });
        }
      } else if (err instanceof Error) {
        setError('root', { message: err.message });
      }
    }
  });

  const busy = submitting || isSubmitting;

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div>
        <label htmlFor="title" className="label">
          Título
        </label>
        <input
          id="title"
          type="text"
          autoComplete="off"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
          className="input"
          placeholder="Ex.: Mercado, Salário"
          {...register('title')}
        />
        {errors.title && (
          <p id="title-error" role="alert" className="field-error">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="amount" className="label">
            Valor (R$)
          </label>
          <input
            id="amount"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            aria-invalid={!!errors.amount}
            aria-describedby={errors.amount ? 'amount-error' : undefined}
            className="input"
            placeholder="0,00"
            {...register('amount')}
          />
          {errors.amount && (
            <p id="amount-error" role="alert" className="field-error">
              {errors.amount.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="type" className="label">
            Tipo
          </label>
          <select
            id="type"
            aria-invalid={!!errors.type}
            className="input"
            {...register('type')}
          >
            <option value="EXPENSE">Despesa</option>
            <option value="INCOME">Receita</option>
          </select>
          {errors.type && (
            <p role="alert" className="field-error">
              {errors.type.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="category" className="label">
          Categoria
        </label>
        <input
          id="category"
          type="text"
          autoComplete="off"
          list="category-suggestions"
          aria-invalid={!!errors.category}
          aria-describedby={errors.category ? 'category-error' : undefined}
          className="input"
          placeholder="Ex.: alimentação, salário, transporte"
          {...register('category')}
        />
        <datalist id="category-suggestions">
          <option value="alimentação" />
          <option value="transporte" />
          <option value="moradia" />
          <option value="lazer" />
          <option value="salário" />
          <option value="investimentos" />
        </datalist>
        {errors.category && (
          <p id="category-error" role="alert" className="field-error">
            {errors.category.message}
          </p>
        )}
      </div>

      {errors.root && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {errors.root.message}
        </p>
      )}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button type="button" className="btn-ghost" onClick={onCancel} disabled={busy}>
          Cancelar
        </button>
        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? 'Salvando…' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}
