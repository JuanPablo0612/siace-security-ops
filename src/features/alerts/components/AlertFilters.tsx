import React from 'react';
import type { AlertFilters } from '../types/alerts.types';

interface AlertFiltersProps {
  filters: AlertFilters;
  onChange: (f: AlertFilters) => void;
}

/**
 * AlertFilters
 *
 * Search and filter controls for the Alerts table.
 * Communicates updates via the onChange callback — no internal state.
 */
const AlertFiltersBar: React.FC<AlertFiltersProps> = ({ filters, onChange }) => {
  const update = (partial: Partial<AlertFilters>) =>
    onChange({ ...filters, ...partial });

  return (
    <div className="flex flex-wrap items-end gap-3 mt-2">
      {/* Search */}
      <div className="flex-1 min-w-[300px] relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
          search
        </span>
        <input
          className="w-full bg-surface-dark border border-border-dark text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary placeholder-slate-500 focus:ring-1 focus:ring-primary"
          placeholder="Search IP, Alert ID, or Threat Type..."
          type="text"
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
        />
      </div>

      {/* Severity */}
      <div className="relative min-w-[140px]">
        <select
          className="w-full appearance-none bg-surface-dark border border-border-dark text-white text-sm rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-primary cursor-pointer"
          value={filters.severity}
          onChange={(e) => update({ severity: e.target.value })}
        >
          <option value="all">Severity: All</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-[20px]">
          expand_more
        </span>
      </div>

      {/* Status */}
      <div className="relative min-w-[140px]">
        <select
          className="w-full appearance-none bg-surface-dark border border-border-dark text-white text-sm rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-primary cursor-pointer"
          value={filters.status}
          onChange={(e) => update({ status: e.target.value })}
        >
          <option value="all">Status: All</option>
          <option value="Open">Open</option>
          <option value="Investigating">Investigating</option>
          <option value="Resolved">Resolved</option>
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-[20px]">
          expand_more
        </span>
      </div>

      {/* Date range */}
      <div className="relative min-w-[180px]">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[20px]">
          calendar_today
        </span>
        <input
          className="w-full bg-surface-dark border border-border-dark text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary cursor-pointer"
          placeholder="Last 24 Hours"
          type="text"
          value={filters.dateRange}
          onChange={(e) => update({ dateRange: e.target.value })}
        />
      </div>
    </div>
  );
};

export default AlertFiltersBar;
