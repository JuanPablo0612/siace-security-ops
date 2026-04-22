import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/constants';

interface NavItem {
  path: string;
  icon: string;
  label: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { path: ROUTES.DASHBOARD, icon: 'dashboard', label: 'Dashboard' },
  { path: ROUTES.ALERTS, icon: 'notifications_active', label: 'Alerts' },
  { path: ROUTES.EVENTS, icon: 'timeline', label: 'Events' },
  { path: ROUTES.REPORTS, icon: 'description', label: 'Reports' },
  { path: ROUTES.CONFIGURATION, icon: 'settings', label: 'Config' },
  { path: ROUTES.HEALTH, icon: 'dns', label: 'System Status' },
];

/**
 * Sidebar
 *
 * Persistent left-hand navigation for the authenticated shell.
 * Renders the SIACE brand mark, primary navigation links, and
 * a bottom profile shortcut.
 */
const Sidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex w-64 flex-col border-r border-border-dark bg-sidebar-dark z-20 h-full">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex flex-col gap-6">
          {/* Brand / Logo */}
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="flex items-center justify-center rounded-lg bg-primary/20 p-2">
              <span className="material-symbols-outlined text-primary text-[28px]">shield_lock</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-lg font-bold leading-none tracking-tight">SIACE</h1>
              <p className="text-slate-400 text-xs font-medium mt-0.5">Enterprise Security</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                <span className="text-sm font-semibold">{item.label}</span>
                {item.badge !== undefined && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-[10px] font-bold text-red-500">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom: Profile shortcut */}
        <div className="flex flex-col gap-1 pt-4 border-t border-border-dark">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 w-full text-left">
            <span className="material-symbols-outlined text-[22px]">account_circle</span>
            <span className="text-sm font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
