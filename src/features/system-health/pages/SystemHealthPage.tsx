import React from 'react';
import { useSystemHealth } from '../hooks/useSystemHealth';
import UptimeIndicator from '../components/UptimeIndicator';
import HealthCard from '../components/HealthCard';
import type { SystemLogEntry } from '../types/system-health.types';

const LOG_TYPE_CLASSES: Record<SystemLogEntry['type'], { dot: string; text: string }> = {
  success: { dot: 'bg-green-400', text: 'text-green-400' },
  warn: { dot: 'bg-yellow-400', text: 'text-yellow-400' },
  error: { dot: 'bg-red-400', text: 'text-red-400' },
  info: { dot: 'bg-blue-400', text: 'text-slate-300' },
};

/**
 * SystemHealthPage
 *
 * Thin page: delegates all data fetching to useSystemHealth,
 * then composes UptimeIndicator, HealthCard grid, and event log.
 */
const SystemHealthPage: React.FC = () => {
  const { metrics, components, logs, isLoading, error } = useSystemHealth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
        Loading infrastructure data…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-40 text-red-400 text-sm">{error}</div>
    );
  }

  const operational = components.filter((c) => ['Operational', 'healthy', 'ok'].includes(c.status)).length;

  return (
    <div className="flex flex-col gap-8 items-center max-w-[1400px] mx-auto w-full">
      {/* Page header */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            System Health
          </h1>
          <p className="text-slate-400 text-base">
            Real-time monitoring of all SIACE infrastructure components.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
          <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-green-400 text-sm font-medium">
            {operational}/{components.length} Systems Operational
          </span>
        </div>
      </div>

      {/* KPI strip */}
      <div className="w-full">
        <UptimeIndicator metrics={metrics} />
      </div>

      {/* Component health grid */}
      <div className="w-full">
        <h2 className="text-lg font-semibold text-white mb-4">Infrastructure Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {components.map((comp) => (
            <HealthCard key={comp.id} component={comp} />
          ))}
        </div>
      </div>

      {/* Event log */}
      <div className="w-full bg-card-dark rounded-xl border border-border-dark p-6 shadow-xl shadow-black/20">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-white">System Event Log</h2>
          <span className="text-xs text-slate-400">{logs.length} entries</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-dark">
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-widest pb-3 pr-4 w-24">
                  Time
                </th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-widest pb-3">
                  Event
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((entry, idx) => {
                const cfg = LOG_TYPE_CLASSES[entry.type];
                return (
                  <tr
                    key={idx}
                    className="border-b border-border-dark/50 hover:bg-border-dark/20 transition-colors group"
                  >
                    <td className="py-3.5 pr-4 align-top">
                      <span className="font-mono text-slate-400 text-xs">{entry.time}</span>
                    </td>
                    <td className="py-3.5 align-top">
                      <div className="flex items-start gap-3">
                        <span
                          className={`inline-block mt-1.5 flex-shrink-0 w-2 h-2 rounded-full ${cfg.dot}`}
                        ></span>
                        <span className={`${cfg.text} leading-relaxed`}>{entry.message}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthPage;
