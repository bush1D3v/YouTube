import type { ErrorRequestHandler, RequestHandler } from 'express';
import { HttpError } from '../errors/HttpError';

/** 404 fallback. Mounted after all routes. */
export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(HttpError.notFound(`Route ${req.method} ${req.path} not found`));
};

/**
 * Centralized error handler. Produces a consistent JSON error envelope
 * and avoids leaking stack traces to clients in production.
 */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
    });
    return;
  }

  // eslint-disable-next-line no-console
  console.error('[unhandled error]', err);
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Unexpected error',
    },
  });
};
