import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { authService } from '../services/authService';
import { ApiError } from '@/shared/services/apiClient';

export function useAuth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await authService.login({ email, password });
      navigate(ROUTES.DASHBOARD);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        const message = err instanceof Error ? err.message : 'Authentication failed. Please try again.';
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, isLoading, error, handleSubmit };
}
