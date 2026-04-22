import React, { useState } from 'react';

interface LoginFormProps {
  email: string;
  password: string;
  isLoading: boolean;
  error?: string | null;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  onForgotPassword?: () => void;
}

/**
 * LoginForm
 *
 * Stateless UI component for the SIACE login form.
 * All state and submission logic is provided via props from useAuth.
 */
const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  isLoading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onForgotPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <span className="material-symbols-outlined text-[18px] flex-shrink-0">error</span>
          {error}
        </div>
      )}
      {/* Email field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200" htmlFor="email">
          Corporate Email
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">mail</span>
          </div>
          <input
            className="block w-full pl-10 pr-3 py-3 border border-border-dark rounded-lg leading-5 bg-[#0f1923] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm"
            id="email"
            name="email"
            placeholder="name@company.com"
            required
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200" htmlFor="password">
          Password
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">lock</span>
          </div>
          <input
            className="block w-full pl-10 pr-10 py-3 border border-border-dark rounded-lg leading-5 bg-[#0f1923] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm"
            id="password"
            name="password"
            placeholder="••••••••"
            required
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>
      </div>

      {/* Remember + forgot */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center">
          <input
            className="h-4 w-4 text-primary border-border-dark rounded focus:ring-primary bg-[#0f1923]"
            id="remember-me"
            name="remember-me"
            type="checkbox"
          />
          <label className="ml-2 block text-sm text-slate-400" htmlFor="remember-me">
            Remember device
          </label>
        </div>
        <div className="text-sm">
          <button
            type="button"
            onClick={onForgotPassword}
            disabled={!onForgotPassword}
            className="font-medium text-primary hover:text-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Forgot password?
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-[#172636] transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
        type="submit"
        disabled={isLoading}
      >
        <span className="material-symbols-outlined text-[20px] mr-2">
          {isLoading ? 'sync' : 'verified_user'}
        </span>
        {isLoading ? 'Authenticating…' : 'Secure Login'}
      </button>

      {/* SSO / alternative */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-dark"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-surface-dark text-slate-400">Enterprise Access</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <a
            className="inline-flex items-center justify-center text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[18px] mr-1">help</span>
            Contact IT Support
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
