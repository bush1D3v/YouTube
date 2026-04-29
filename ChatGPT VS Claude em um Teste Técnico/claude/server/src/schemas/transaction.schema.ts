import { z } from 'zod';

export const transactionTypeSchema = z.enum(['INCOME', 'EXPENSE']);

export const createTransactionSchema = z.object({
  title: z
    .string({ required_error: 'title is required' })
    .trim()
    .min(1, 'title cannot be empty')
    .max(120, 'title must be at most 120 characters'),
  amount: z
    .number({ required_error: 'amount is required', invalid_type_error: 'amount must be a number' })
    .finite('amount must be finite')
    .positive('amount must be greater than zero'),
  type: transactionTypeSchema,
  category: z
    .string({ required_error: 'category is required' })
    .trim()
    .min(1, 'category cannot be empty')
    .max(60, 'category must be at most 60 characters'),
});

export const listTransactionsQuerySchema = z.object({
  type: transactionTypeSchema.optional(),
  category: z.string().trim().min(1).max(60).optional(),
  search: z.string().trim().min(1).max(120).optional(),
});

export const idParamSchema = z.object({
  id: z.string().uuid('id must be a valid UUID'),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type ListTransactionsQuery = z.infer<typeof listTransactionsQuerySchema>;
