import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { authService } from '../services/authService';

export function useRegister() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (new TextEncoder().encode(password).length > 72) {
      setError('Password is too long. Please use 72 characters or fewer.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await authService.register({ email, full_name: fullName, password, confirmPassword });
      setSuccess(true);
      setTimeout(() => navigate(ROUTES.LOGIN), 1500);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email, setEmail,
    fullName, setFullName,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    isLoading,
    error,
    success,
    handleSubmit,
  };
}
