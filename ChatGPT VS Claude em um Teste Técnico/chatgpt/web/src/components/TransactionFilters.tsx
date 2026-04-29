import type { TransactionFilters, TransactionType } from '@/types/transaction';

type TransactionFiltersProps = {
  filters: TransactionFilters;
  categories: string[];
  onChange: (filters: TransactionFilters) => void;
  onClear: () => void;
};

export function TransactionFilters({ filters, categories, onChange, onClear }: TransactionFiltersProps) {
  function setType(type: TransactionType | 'ALL') {
    onChange({ ...filters, type });
  }

  return (
    <section aria-labelledby="filters-heading" className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="filters-heading" className="text-base font-black text-slate-950">
            Buscar e filtrar
          </h2>
          <p className="text-sm text-slate-500">Refine por texto, tipo ou categoria.</p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="self-start rounded-full px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200"
        >
          Limpar filtros
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.8fr_0.9fr]">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Busca por título</span>
          <input
            value={filters.search ?? ''}
            onChange={(event) => onChange({ ...filters, search: event.target.value })}
            placeholder="Ex: mercado, salário, aluguel"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
        </label>

        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold text-slate-700">Tipo</legend>
          <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-1">
            {(['ALL', 'INCOME', 'EXPENSE'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setType(type)}
                className={`rounded-xl px-3 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200 ${
                  (filters.type ?? 'ALL') === type ? 'bg-white text-cyan-800 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {type === 'ALL' ? 'Todas' : type === 'INCOME' ? 'Receitas' : 'Despesas'}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Categoria</span>
          <select
            value={filters.category ?? ''}
            onChange={(event) => onChange({ ...filters, category: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          >
            <option value="">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
