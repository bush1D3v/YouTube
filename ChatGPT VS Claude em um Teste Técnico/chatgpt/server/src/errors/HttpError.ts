export type ErrorDetail = {
  path: string;
  message: string;
};

export class HttpError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details?: ErrorDetail[];

  constructor(statusCode: number, code: string, message: string, details?: ErrorDetail[]) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }

  static badRequest(message: string, details?: ErrorDetail[]) {
    return new HttpError(400, 'BAD_REQUEST', message, details);
  }

  static notFound(message: string) {
    return new HttpError(404, 'NOT_FOUND', message);
  }
}
