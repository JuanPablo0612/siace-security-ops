import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';

/**
 * LoginPage
 *
 * Lightweight page component: connects useAuth hook → LoginForm UI.
 * Contains no business logic — all state is managed in useAuth.
 */
const LoginPage: React.FC = () => {
  const { email, setEmail, password, setPassword, isLoading, handleSubmit } = useAuth();

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center items-center py-10 px-4 bg-background-dark font-display">
      {/* Abstract background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1923] via-[#0B3C5D] to-[#0f1923] opacity-90"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-[480px] bg-surface-dark rounded-xl shadow-2xl border border-border-dark overflow-hidden backdrop-blur-sm">
        {/* Card header */}
        <div className="flex flex-col items-center pt-10 pb-6 px-8 text-center border-b border-border-dark/50">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
            <span className="material-symbols-outlined text-4xl">security</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">SIACE</h1>
          <p className="text-sm font-medium text-slate-400 max-w-[280px] leading-relaxed">
            Sistema de Inteligencia Artificial de Ciberseguridad Empresarial
          </p>
        </div>

        {/* Form */}
        <div className="p-8 pt-6">
          <LoginForm
            email={email}
            password={password}
            isLoading={isLoading}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Card footer */}
        <div className="px-8 py-4 bg-[#0f1923]/50 border-t border-border-dark/50 flex justify-between items-center text-xs text-slate-500">
          <span>© 2024 SIACE Security</span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>256-bit SSL Encrypted</span>
          </div>
        </div>
      </div>

      {/* Footer branding */}
      <div className="mt-8 relative z-10 opacity-70 hover:opacity-100 transition-opacity duration-500">
        <div className="h-8 w-auto flex items-center justify-center gap-4 grayscale hover:grayscale-0 transition-all">
          <div className="h-6 w-20 bg-white/10 rounded" />
          <div className="h-6 w-20 bg-white/10 rounded" />
          <div className="h-6 w-20 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
