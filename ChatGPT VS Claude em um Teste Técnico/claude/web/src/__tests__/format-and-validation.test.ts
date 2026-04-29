import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate } from '@/lib/format';
import { transactionFormSchema } from '@/lib/validation';

describe('format helpers', () => {
  it('formats BRL currency', () => {
    const result = formatCurrency(1234.5);
    // Tolerates non-breaking space variations across Node versions.
    expect(result.replace(/\s/g, ' ')).toMatch(/R\$\s?1\.234,50/);
  });

  it('formats ISO date strings', () => {
    expect(formatDate('2026-04-01T10:00:00.000Z')).toMatch(/2026/);
  });
});

describe('transactionFormSchema', () => {
  it('rejects negative amounts', () => {
    const result = transactionFormSchema.safeParse({
      title: 'A',
      amount: -1,
      type: 'INCOME',
      category: 'x',
    });
    expect(result.success).toBe(false);
  });

  it('accepts a valid payload', () => {
    const result = transactionFormSchema.safeParse({
      title: 'Salário',
      amount: 1000,
      type: 'INCOME',
      category: 'salário',
    });
    expect(result.success).toBe(true);
  });

  it('requires a non-empty title', () => {
    const result = transactionFormSchema.safeParse({
      title: '   ',
      amount: 10,
      type: 'EXPENSE',
      category: 'x',
    });
    expect(result.success).toBe(false);
  });
});
