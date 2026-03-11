import type { LoginCredentials, User } from '../types/auth.types';

/**
 * authService
 *
 * Handles all authentication-related API communication.
 * Currently uses mock responses — replace the implementations
 * with real API calls (e.g. fetch / axios) when a backend is available.
 */
export const authService = {
  login: async (_credentials: LoginCredentials): Promise<User> => {
    // TODO: replace with real API call: POST /api/auth/login
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      id: '1',
      email: _credentials.email,
      name: 'Security Analyst',
      role: 'analyst',
    };
  },

  logout: async (): Promise<void> => {
    // TODO: replace with real API call: POST /api/auth/logout
    await new Promise((resolve) => setTimeout(resolve, 100));
  },
};
