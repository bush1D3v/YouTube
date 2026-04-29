'use client';

import type { TransactionFilters as Filters, TransactionType } from '@/types/transaction';

interface FiltersProps {
  value: Filters;
  onChange: (next: Filters) => void;
}

export function TransactionFilters({ value, onChange }: FiltersProps) {
  return (
    <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="search" className="label">
          Buscar
        </label>
        <input
          id="search"
          type="search"
          className="input"
          placeholder="Buscar por título…"
          value={value.search ?? ''}
          onChange={(e) =>
            onChange({ ...value, search: e.target.value || undefined })
          }
        />
      </div>

      <div className="sm:w-44">
        <label htmlFor="filter-type" className="label">
          Tipo
        </label>
        <select
          id="filter-type"
          className="input"
          value={value.type ?? ''}
          onChange={(e) =>
            onChange({
              ...value,
              type: (e.target.value || undefined) as TransactionType | undefined,
            })
          }
        >
          <option value="">Todos</option>
          <option value="INCOME">Receitas</option>
          <option value="EXPENSE">Despesas</option>
        </select>
      </div>

      <div className="sm:w-52">
        <label htmlFor="filter-category" className="label">
          Categoria
        </label>
        <input
          id="filter-category"
          type="text"
          className="input"
          placeholder="Ex.: alimentação"
          value={value.category ?? ''}
          onChange={(e) =>
            onChange({ ...value, category: e.target.value || undefined })
          }
        />
      </div>

      {(value.search || value.type || value.category) && (
        <button
          type="button"
          onClick={() => onChange({})}
          className="btn-ghost sm:self-end"
        >
          Limpar
        </button>
      )}
    </div>
  );
}
