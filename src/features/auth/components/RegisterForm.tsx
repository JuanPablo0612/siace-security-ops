import React from 'react';

interface RegisterFormProps {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  error?: string | null;
  success?: boolean;
  onEmailChange: (value: string) => void;
  onFullNameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  email,
  fullName,
  password,
  confirmPassword,
  isLoading,
  error,
  success,
  onEmailChange,
  onFullNameChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <span className="material-symbols-outlined text-[18px] flex-shrink-0">error</span>
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
          <span className="material-symbols-outlined text-[18px] flex-shrink-0">check_circle</span>
          Account created! Redirecting to login…
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200" htmlFor="full-name">
          Full Name <span className="text-slate-500 font-normal">(optional)</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">person</span>
          </div>
          <input
            className="block w-full pl-10 pr-3 py-3 border border-border-dark rounded-lg leading-5 bg-[#0f1923] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm"
            id="full-name"
            name="full_name"
            placeholder="John Doe"
            type="text"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
          />
        </div>
      </div>

      {/* Email */}
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

      {/* Password */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200" htmlFor="password">
          Password
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">lock</span>
          </div>
          <input
            className="block w-full pl-10 pr-3 py-3 border border-border-dark rounded-lg leading-5 bg-[#0f1923] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm"
            id="password"
            name="password"
            placeholder="••••••••"
            required
            minLength={8}
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
        </div>
        <p className="text-xs text-slate-500">Minimum 8 characters.</p>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200" htmlFor="confirm-password">
          Confirm Password
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">lock_reset</span>
          </div>
          <input
            className="block w-full pl-10 pr-3 py-3 border border-border-dark rounded-lg leading-5 bg-[#0f1923] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm"
            id="confirm-password"
            name="confirm_password"
            placeholder="••••••••"
            required
            type="password"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-[#172636] transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
        type="submit"
        disabled={isLoading || success}
      >
        <span className="material-symbols-outlined text-[20px] mr-2">
          {isLoading ? 'sync' : 'person_add'}
        </span>
        {isLoading ? 'Creating Account…' : 'Create Account'}
      </button>
    </form>
  );
};

export default RegisterForm;
