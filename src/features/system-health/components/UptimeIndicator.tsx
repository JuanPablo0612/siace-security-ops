import React from 'react';
import type { SystemMetric } from '../types/system-health.types';

interface UptimeIndicatorProps {
  metrics: SystemMetric[];
}

/**
 * UptimeIndicator
 *
 * Top-level KPI strip showing the four key infrastructure metrics.
 */
const UptimeIndicator: React.FC<UptimeIndicatorProps> = ({ metrics }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {metrics.map((metric) => (
      <div
        key={metric.label}
        className="bg-card-dark rounded-xl border border-border-dark p-5 shadow-xl shadow-black/20 flex items-center gap-4"
      >
        <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
          <span className="material-symbols-outlined">{metric.icon}</span>
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">{metric.label}</p>
          <p className="text-xl font-bold text-white tracking-tight mt-0.5">{metric.value}</p>
        </div>
      </div>
    ))}
  </div>
);

export default UptimeIndicator;
