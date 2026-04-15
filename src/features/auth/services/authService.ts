import { apiClient, tokenStorage } from '@/shared/services/apiClient';
import type { User, LoginCredentials, RegisterCredentials, TokenResponse } from '../types/auth.types';

interface ApiUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

function mapUser(u: ApiUser): User {
  return {
    id: u.id,
    email: u.email,
    name: u.full_name,
    role: u.role as User['role'],
  };
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const tokens = await apiClient.post<TokenResponse>('/api/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    tokenStorage.setTokens(tokens.access_token, tokens.refresh_token);
    const user = await apiClient.get<ApiUser>('/api/auth/me');
    return mapUser(user);
  },

  register: async (credentials: RegisterCredentials): Promise<User> => {
    const user = await apiClient.post<ApiUser>('/api/auth/register', {
      email: credentials.email,
      full_name: credentials.full_name || undefined,
      password: credentials.password,
    });
    return mapUser(user);
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post<void>('/api/auth/logout', {});
    } finally {
      tokenStorage.clearTokens();
    }
  },

  getCurrentUser: async (): Promise<User | null> => {
    if (!tokenStorage.getAccessToken()) return null;
    try {
      const user = await apiClient.get<ApiUser>('/api/auth/me');
      return mapUser(user);
    } catch {
      return null;
    }
  },
};
