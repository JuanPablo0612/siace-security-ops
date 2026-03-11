import React from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Acme Corp Dashboard',
  '/alerts': 'Alert Monitoring Center',
  '/events': 'Security Event Timeline',
  '/reports': 'Reports & Analytics',
  '/configuration': 'System Configuration',
  '/health': 'System Health Status',
};

function getTitle(pathname: string): string {
  for (const [prefix, title] of Object.entries(PAGE_TITLES)) {
    if (pathname.startsWith(prefix)) return title;
  }
  return 'SIACE Enterprise';
}

/**
 * Header
 *
 * Global top navigation bar shared across all authenticated views.
 * Displays the company context, system status indicator, and user
 * action controls (search, notifications, profile).
 */
const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="z-10 flex h-16 w-full shrink-0 items-center justify-between border-b border-border-dark bg-background-dark/80 backdrop-blur-md px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <div className="lg:hidden p-1 rounded-md hover:bg-white/10 cursor-pointer">
          <span className="material-symbols-outlined text-white">menu</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Company avatar */}
          <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
            AC
          </div>
          <h2 className="text-white text-lg font-semibold tracking-tight">
            {getTitle(location.pathname)}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* System status pill */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-xs font-semibold text-success tracking-wide uppercase">
            System Secure
          </span>
        </div>

        <div className="h-6 w-px bg-slate-700 hidden sm:block"></div>

        <div className="flex items-center gap-4">
          <button className="relative rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
          <button className="relative rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background-dark"></span>
          </button>

          <div
            className="h-8 w-8 rounded-full bg-cover bg-center border-2 border-slate-700 cursor-pointer hover:border-primary transition-colors"
            style={{ backgroundImage: `url('https://i.pravatar.cc/150?img=11')` }}
            title="User Profile"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
