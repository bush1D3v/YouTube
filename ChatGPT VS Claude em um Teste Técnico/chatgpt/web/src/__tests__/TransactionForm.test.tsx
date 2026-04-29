import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TransactionForm } from '@/components/TransactionForm';

describe('TransactionForm', () => {
  it('shows validation messages when the form is invalid', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<TransactionForm categories={[]} onSubmit={onSubmit} />);

    await user.clear(screen.getByLabelText(/valor/i));
    await user.click(screen.getByRole('button', { name: /cadastrar transação/i }));

    expect(await screen.findByText(/descrição com pelo menos 2 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/valor precisa ser maior que zero/i)).toBeInTheDocument();
    expect(screen.getByText(/categoria com pelo menos 2 caracteres/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits a valid transaction payload', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<TransactionForm categories={['alimentação']} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/título/i), 'Mercado');
    await user.clear(screen.getByLabelText(/valor/i));
    await user.type(screen.getByLabelText(/valor/i), '125.5');
    await user.type(screen.getByLabelText(/categoria/i), 'alimentação');
    await user.click(screen.getByLabelText(/receita/i));
    await user.click(screen.getByRole('button', { name: /cadastrar transação/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Mercado',
      amount: 125.5,
      type: 'INCOME',
      category: 'alimentação'
    });
  });
});
