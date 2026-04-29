import { z } from 'zod';
import { TRANSACTION_TYPES } from '../domain/transaction.js';

export const createTransactionSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'title is required' })
      .trim()
      .min(2, 'title must have at least 2 characters')
      .max(90, 'title must have at most 90 characters'),
    amount: z.coerce
      .number({ required_error: 'amount is required', invalid_type_error: 'amount must be a number' })
      .finite('amount must be finite')
      .positive('amount must be greater than zero'),
    type: z.enum(TRANSACTION_TYPES, { required_error: 'type is required' }),
    category: z
      .string({ required_error: 'category is required' })
      .trim()
      .min(2, 'category must have at least 2 characters')
      .max(45, 'category must have at most 45 characters')
  }).strict()
});

export const transactionFiltersSchema = z.object({
  query: z.object({
    type: z.enum(TRANSACTION_TYPES).optional(),
    category: z.string().trim().min(1).max(45).optional(),
    search: z.string().trim().min(1).max(90).optional()
  })
});

export const deleteTransactionSchema = z.object({
  params: z.object({
    id: z.string().uuid('id must be a valid UUID')
  })
});
