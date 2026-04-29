import type { ApiError } from '@/types/transaction';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

export class ApiRequestError extends Error {
  constructor(
    public readonly status: number,
    public readonly apiError: ApiError,
  ) {
    super(apiError.message);
    this.name = 'ApiRequestError';
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  query?: Record<string, string | undefined>;
}

/**
 * Thin fetch wrapper centralizing:
 * - JSON serialization
 * - query string handling
 * - error normalization (so UI deals with one error shape)
 * - signal/timeout-friendly base for future enhancements
 */
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, query, headers, ...rest } = options;

  const url = new URL(path, API_URL);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== '') url.searchParams.set(k, v);
    }
  }

  const response = await fetch(url.toString(), {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const apiError: ApiError = data?.error ?? {
      code: 'UNKNOWN',
      message: 'Unexpected error contacting the API.',
    };
    throw new ApiRequestError(response.status, apiError);
  }

  return data?.data as T;
}
