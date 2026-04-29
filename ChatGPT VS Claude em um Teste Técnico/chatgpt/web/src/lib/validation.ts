import { z } from 'zod';
import { TRANSACTION_TYPES } from '@/types/transaction';

export const transactionFormSchema = z.object({
  title: z.string().trim().min(2, 'Informe uma descrição com pelo menos 2 caracteres.').max(90, 'Use até 90 caracteres.'),
  amount: z.coerce.number({ invalid_type_error: 'Informe um valor válido.' }).finite('Informe um valor válido.').positive('O valor precisa ser maior que zero.'),
  type: z.enum(TRANSACTION_TYPES, { required_error: 'Selecione o tipo.' }),
  category: z.string().trim().min(2, 'Informe uma categoria com pelo menos 2 caracteres.').max(45, 'Use até 45 caracteres.')
});

export type TransactionFormData = z.infer<typeof transactionFormSchema>;
