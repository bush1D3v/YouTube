import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject } from 'zod';
import { ZodError } from 'zod';
import { HttpError } from '../errors/HttpError.js';

export function validate(schema: AnyZodObject) {
  return (request: Request, _response: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: request.body,
        query: request.query,
        params: request.params
      });

      if ('body' in parsed) request.body = parsed.body;
      if ('query' in parsed) request.query = parsed.query;
      if ('params' in parsed) request.params = parsed.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(
          HttpError.badRequest(
            'Validation failed',
            error.issues.map((issue) => ({
              path: issue.path.join('.'),
              message: issue.message
            }))
          )
        );
        return;
      }

      next(error);
    }
  };
}
