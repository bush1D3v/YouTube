import { z } from 'zod';

export const transactionFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Informe um título')
    .max(120, 'O título deve ter no máximo 120 caracteres'),
  amount: z.coerce
    .number({ invalid_type_error: 'Valor inválido' })
    .positive('O valor deve ser maior que zero'),
  type: z.enum(['INCOME', 'EXPENSE'], {
    errorMap: () => ({ message: 'Selecione o tipo' }),
  }),
  category: z
    .string()
    .trim()
    .min(1, 'Informe uma categoria')
    .max(60, 'A categoria deve ter no máximo 60 caracteres'),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
