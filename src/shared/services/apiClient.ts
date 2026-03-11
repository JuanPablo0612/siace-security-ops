import { API_BASE_URL } from '@/config';

/**
 * apiClient
 *
 * Thin fetch wrapper providing typed HTTP methods. All feature services
 * should import this client instead of calling `fetch` directly.
 *
 * In development the mock services return data synchronously, so this
 * client is a forward-looking pattern ready to replace mocks once
 * the real back-end is deployed.
 */

class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(method: string, endpoint: string, body?: unknown): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: HeadersInit = { 'Content-Type': 'application/json' };

  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'same-origin',
  });

  if (!res.ok) {
    throw new ApiError(res.status, `${method} ${url} — ${res.statusText}`);
  }

  // 204 No Content
  if (res.status === 204) return undefined as unknown as T;

  return res.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(endpoint: string) => request<T>('GET', endpoint),
  post: <T>(endpoint: string, body: unknown) => request<T>('POST', endpoint, body),
  put: <T>(endpoint: string, body: unknown) => request<T>('PUT', endpoint, body),
  delete: (endpoint: string) => request<void>('DELETE', endpoint),
};
