import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/alerts', icon: 'notifications_active', label: 'Alerts', badge: 3 },
    { path: '/events', icon: 'timeline', label: 'Events' }, // Placeholder route
    { path: '/reports', icon: 'description', label: 'Reports' }, // Placeholder route
    { path: '/configuration', icon: 'settings', label: 'Config' },
    { path: '/health', icon: 'dns', label: 'System Status' },
  ];

  return (
    <div className="hidden lg:flex w-64 flex-col border-r border-border-dark bg-sidebar-dark z-20 h-full">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="flex items-center justify-center rounded-lg bg-primary/20 p-2">
              <span className="material-symbols-outlined text-primary text-[28px]">shield_lock</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-lg font-bold leading-none tracking-tight">SIACE</h1>
              <p className="text-slate-400 text-xs font-medium mt-0.5">Enterprise Security</p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              // Exact match for dashboard, startswith for others if needed, but simplistic here
              const isActive = location.pathname.startsWith(item.path);
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                    ${isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  <span className="text-sm font-semibold">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-[10px] font-bold text-red-500">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bottom Profile Link */}
        <div className="flex flex-col gap-1 pt-4 border-t border-border-dark">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 group w-full text-left">
            <span className="material-symbols-outlined text-[22px]">account_circle</span>
            <span className="text-sm font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;