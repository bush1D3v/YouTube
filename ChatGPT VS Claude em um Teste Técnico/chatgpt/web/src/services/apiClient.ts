type ApiSuccess<T> = { data: T };
type ApiFailure = { error: { code: string; message: string; details?: Array<{ path: string; message: string }> } };

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly details?: Array<{ path: string; message: string }>;

  constructor(status: number, failure: ApiFailure['error']) {
    super(failure.message);
    this.name = 'ApiError';
    this.code = failure.code;
    this.status = status;
    this.details = failure.details;
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers
    },
    cache: 'no-store'
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const payload = (await response.json()) as ApiSuccess<T> | ApiFailure;

  if (!response.ok) {
    throw new ApiError(response.status, (payload as ApiFailure).error);
  }

  return (payload as ApiSuccess<T>).data;
}
