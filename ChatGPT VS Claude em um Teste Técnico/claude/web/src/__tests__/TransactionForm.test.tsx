import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TransactionForm } from '@/components/TransactionForm';

describe('<TransactionForm />', () => {
  it('shows validation messages for empty submit', async () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();
    render(<TransactionForm onSubmit={onSubmit} onCancel={onCancel} />);

    await userEvent.click(screen.getByRole('button', { name: /salvar/i }));

    expect(await screen.findByText(/informe um título/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits with valid data', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const onCancel = vi.fn();
    render(<TransactionForm onSubmit={onSubmit} onCancel={onCancel} />);

    await userEvent.type(screen.getByLabelText(/título/i), 'Salário');
    await userEvent.type(screen.getByLabelText(/valor/i), '1000');
    await userEvent.selectOptions(screen.getByLabelText(/tipo/i), 'INCOME');
    await userEvent.type(screen.getByLabelText(/categoria/i), 'salário');

    await userEvent.click(screen.getByRole('button', { name: /salvar/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Salário',
      amount: 1000,
      type: 'INCOME',
      category: 'salário',
    });
  });
});
