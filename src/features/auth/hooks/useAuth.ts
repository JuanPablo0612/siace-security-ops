import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

/**
 * useAuth
 *
 * Owns the login form state and the login submission logic.
 * Extracts all business logic from the LoginPage so the page
 * component remains a pure composition layer.
 */
export function useAuth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate authentication — replace with authService.login() when ready
      await new Promise((resolve) => setTimeout(resolve, 300));
      navigate(ROUTES.DASHBOARD);
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, isLoading, handleSubmit };
}
