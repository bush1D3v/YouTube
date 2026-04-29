import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject, ZodEffects } from 'zod';
import { HttpError } from '../errors/HttpError';

type Schema = AnyZodObject | ZodEffects<AnyZodObject>;
type Source = 'body' | 'query' | 'params';

/**
 * Generic Zod validator. Replaces parsed/coerced data back into the request
 * so downstream handlers receive sanitized, typed input.
 */
export const validate =
  (schema: Schema, source: Source = 'body') =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const details = result.error.issues.map((i) => ({
        path: i.path.join('.'),
        message: i.message,
      }));
      return next(HttpError.badRequest('Validation failed', details));
    }
    // Mutate request with parsed value (preserves coercions like number).
    (req as unknown as Record<Source, unknown>)[source] = result.data;
    next();
  };
