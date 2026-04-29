import { describe, expect, it } from 'vitest';
import { formatCurrency, formatSignedCurrency } from '@/lib/format';
import { transactionFormSchema } from '@/lib/validation';

describe('format helpers', () => {
  it('formats BRL values and signed transaction values', () => {
    expect(formatCurrency(1234.56)).toBe('R$ 1.234,56');
    expect(formatSignedCurrency(-99.9)).toBe('- R$ 99,90');
    expect(formatSignedCurrency(250)).toBe('+ R$ 250,00');
  });
});

describe('transaction form schema', () => {
  it('accepts valid inputs and coerces amount to number', () => {
    const result = transactionFormSchema.parse({ title: 'Salário', amount: '5000', type: 'INCOME', category: 'salário' });

    expect(result.amount).toBe(5000);
  });

  it('rejects invalid title, amount and category', () => {
    const result = transactionFormSchema.safeParse({ title: 'x', amount: 0, type: 'EXPENSE', category: '' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors).toMatchObject({
        title: expect.any(Array),
        amount: expect.any(Array),
        category: expect.any(Array)
      });
    }
  });
});
