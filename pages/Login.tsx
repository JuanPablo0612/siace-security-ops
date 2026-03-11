import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center items-center py-10 px-4 bg-background-dark font-display">
      {/* Abstract Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1923] via-[#0B3C5D] to-[#0f1923] opacity-90"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[480px] bg-surface-dark rounded-xl shadow-2xl border border-border-dark overflow-hidden backdrop-blur-sm">
        {/* Header Section */}
        <div className="flex flex-col items-center pt-10 pb-6 px-8 text-center border-b border-border-dark/50">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
            <span className="material-symbols-outlined text-4xl">security</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">SIACE</h1>
          <p className="text-sm font-medium text-slate-400 max-w-[280px] leading-relaxed">
            Sistema de Inteligencia Artificial de Ciberseguridad Empresarial
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 focus:outline-none">
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
            </div>

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
                <a className="font-medium text-primary hover:text-primary-hover transition-colors" href="#">
                  Forgot password?
                </a>
              </div>
            </div>

            <button 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-[#172636] transition-all transform hover:-translate-y-0.5" 
              type="submit"
            >
              <span className="material-symbols-outlined text-[20px] mr-2">verified_user</span>
              Secure Login
            </button>
          </form>

          {/* SSO / Alternative */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-dark"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface-dark text-slate-400">
                  Enterprise Access
                </span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <a className="inline-flex items-center justify-center text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors" href="#">
                <span className="material-symbols-outlined text-[18px] mr-1">help</span>
                Contact IT Support
              </a>
            </div>
          </div>
        </div>

        {/* Footer of Card */}
        <div className="px-8 py-4 bg-[#0f1923]/50 border-t border-border-dark/50 flex justify-between items-center text-xs text-slate-500">
          <span>© 2024 SIACE Security</span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>256-bit SSL Encrypted</span>
          </div>
        </div>
      </div>
      
      {/* Footer Branding */}
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

export default Login;