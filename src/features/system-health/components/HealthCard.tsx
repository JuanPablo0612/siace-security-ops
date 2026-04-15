import React from 'react';
import type { ComponentHealth, HealthStatus } from '../types/system-health.types';

interface HealthCardProps {
  component: ComponentHealth;
}

const STATUS_CONFIG: Record<string, { dot: string; badge: string; label: string }> = {
  Operational: {
    dot: 'bg-green-400',
    badge: 'bg-green-500/10 text-green-400 border border-green-500/20',
    label: 'Operational',
  },
  healthy: {
    dot: 'bg-green-400',
    badge: 'bg-green-500/10 text-green-400 border border-green-500/20',
    label: 'Healthy',
  },
  ok: {
    dot: 'bg-green-400',
    badge: 'bg-green-500/10 text-green-400 border border-green-500/20',
    label: 'OK',
  },
  Degraded: {
    dot: 'bg-yellow-400 animate-pulse',
    badge: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    label: 'Degraded',
  },
  Outage: {
    dot: 'bg-red-400 animate-ping',
    badge: 'bg-red-500/10 text-red-400 border border-red-500/20',
    label: 'Outage',
  },
  unhealthy: {
    dot: 'bg-red-400 animate-ping',
    badge: 'bg-red-500/10 text-red-400 border border-red-500/20',
    label: 'Unavailable',
  },
  Maintenance: {
    dot: 'bg-blue-400',
    badge: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    label: 'Maintenance',
  },
};

const DEFAULT_STATUS_CONFIG = {
  dot: 'bg-slate-400',
  badge: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
  label: 'Unknown',
};

/**
 * HealthCard
 *
 * Displays a single infrastructure component's health status,
 * current load bar, uptime, and cloud region.
 */
const HealthCard: React.FC<HealthCardProps> = ({ component }) => {
  const cfg = STATUS_CONFIG[component.status] ?? DEFAULT_STATUS_CONFIG;

  return (
    <div className="bg-card-dark rounded-xl border border-border-dark p-5 shadow-xl shadow-black/20 group hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
            <span className="material-symbols-outlined text-[22px]">{component.icon}</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{component.name}</p>
            <p className="text-slate-400 text-xs">{component.subLabel}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${cfg.dot}`}></span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Load bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Current Load</span>
          <span className={component.load > 80 ? 'text-red-400' : 'text-slate-300'}>
            {component.load}%
          </span>
        </div>
        <div className="w-full bg-background-dark rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all duration-500 ${
              component.load > 80
                ? 'bg-red-500'
                : component.load > 60
                ? 'bg-yellow-500'
                : 'bg-primary'
            }`}
            style={{ width: `${component.load}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border-dark pt-3">
        <div className="text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Uptime</p>
          <p className="text-white font-bold text-sm">{component.uptime}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Region</p>
          <p className="text-white font-medium text-xs">{component.region}</p>
        </div>
      </div>
    </div>
  );
};

export default HealthCard;
