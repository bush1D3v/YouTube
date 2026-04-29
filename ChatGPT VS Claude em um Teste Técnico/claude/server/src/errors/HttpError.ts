/**
 * Domain-specific HttpError. Carries an HTTP status and a stable error code
 * the front-end can use for i18n / branching without parsing messages.
 */
export class HttpError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    this.name = 'HttpError';
  }

  static badRequest(message: string, details?: unknown) {
    return new HttpError(400, 'BAD_REQUEST', message, details);
  }
  static notFound(message = 'Resource not found') {
    return new HttpError(404, 'NOT_FOUND', message);
  }
  static unprocessable(message: string, details?: unknown) {
    return new HttpError(422, 'UNPROCESSABLE_ENTITY', message, details);
  }
  static internal(message = 'Internal server error') {
    return new HttpError(500, 'INTERNAL_ERROR', message);
  }
}
