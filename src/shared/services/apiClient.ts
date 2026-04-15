import { API_BASE_URL } from '@/config';

const TOKEN_KEY = 'siace_access_token';
const REFRESH_TOKEN_KEY = 'siace_refresh_token';

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  },
  clearTokens: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function buildHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = tokenStorage.getAccessToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

async function request<T>(method: string, endpoint: string, body?: unknown): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    method,
    headers: await buildHeaders(),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // Attempt token refresh on 401
  if (res.status === 401) {
    const refreshToken = tokenStorage.getRefreshToken();
    if (refreshToken) {
      const refreshRes = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      if (refreshRes.ok) {
        const tokens: { access_token: string; refresh_token: string } = await refreshRes.json();
        tokenStorage.setTokens(tokens.access_token, tokens.refresh_token);
        const retryRes = await fetch(url, {
          method,
          headers: await buildHeaders(),
          body: body !== undefined ? JSON.stringify(body) : undefined,
        });
        if (!retryRes.ok) {
          throw new ApiError(retryRes.status, `${method} ${url} — ${retryRes.statusText}`);
        }
        if (retryRes.status === 204) return undefined as unknown as T;
        return retryRes.json() as Promise<T>;
      }
    }
    tokenStorage.clearTokens();
    window.location.hash = '/login';
    throw new ApiError(401, 'Session expired. Please log in again.');
  }

  if (!res.ok) {
    let message = `${method} ${url} — ${res.statusText}`;
    try {
      const errorBody = await res.json();
      if (typeof errorBody?.detail === 'string') message = errorBody.detail;
      else if (Array.isArray(errorBody?.detail)) {
        message = errorBody.detail.map((d: { msg: string }) => d.msg).join(', ');
      }
    } catch {
      // ignore parse error
    }
    throw new ApiError(res.status, message);
  }

  if (res.status === 204) return undefined as unknown as T;

  return res.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(endpoint: string) => request<T>('GET', endpoint),
  post: <T>(endpoint: string, body: unknown) => request<T>('POST', endpoint, body),
  put: <T>(endpoint: string, body: unknown) => request<T>('PUT', endpoint, body),
  patch: <T>(endpoint: string, body: unknown) => request<T>('PATCH', endpoint, body),
  delete: (endpoint: string) => request<void>('DELETE', endpoint),
};
