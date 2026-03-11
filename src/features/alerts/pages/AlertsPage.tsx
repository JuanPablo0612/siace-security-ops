import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlerts } from '../hooks/useAlerts';
import AlertsTable from '../components/AlertsTable';
import AlertFiltersBar from '../components/AlertFilters';
import type { Alert } from '../types/alerts.types';

const StatCard: React.FC<{
  label: string;
  value: string;
  badge: string;
  badgeColor: string;
  borderColor: string;
  glow?: boolean;
}> = ({ label, value, badge, badgeColor, borderColor, glow }) => (
  <div
    className={`bg-surface-dark border ${borderColor} rounded-lg p-3 flex items-center justify-between relative overflow-hidden`}
  >
    {glow && (
      <div
        className={`absolute inset-0 bg-gradient-to-r from-${badgeColor}-500/5 to-transparent pointer-events-none`}
      ></div>
    )}
    <div className="relative z-10">
      <p className={`text-${badgeColor === 'danger' ? 'red' : 'slate'}-400 text-xs uppercase font-medium`}>
        {label}
      </p>
      <p className="text-white text-xl font-bold">{value}</p>
    </div>
    <span className={`text-${badgeColor}-500 bg-${badgeColor}-500/10 text-xs font-medium px-2 py-1 rounded`}>
      {badge}
    </span>
  </div>
);

/**
 * AlertsPage
 *
 * Lightweight page: connects useAlerts hook and composes the AlertsTable
 * and AlertFilters components. Contains no business logic.
 */
const AlertsPage: React.FC = () => {
  const navigate = useNavigate();
  const { alerts, stats, filters, setFilters } = useAlerts();

  const handleRowClick = (alert: Alert) => {
    navigate(`/alerts/${alert.id}`);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header controls */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-end gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-dark text-slate-400 hover:text-white hover:bg-surface-dark transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-[20px]">download</span>
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all">
            <span className="material-symbols-outlined text-[20px]">radar</span>
            New Scan
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Alerts" value={stats.total} badge="+12%" badgeColor="success" borderColor="border-border-dark" />
            <StatCard label="Critical Threats" value={stats.critical} badge="+5%" badgeColor="danger" borderColor="border-danger/30" glow />
            <StatCard label="Investigating" value={stats.investigating} badge="Active" badgeColor="warning" borderColor="border-border-dark" />
            <StatCard label="Resolved" value={stats.resolved} badge="+8%" badgeColor="success" borderColor="border-border-dark" />
          </div>
        )}

        <AlertFiltersBar filters={filters} onChange={setFilters} />
      </div>

      <AlertsTable alerts={alerts} onRowClick={handleRowClick} />
    </div>
  );
};

export default AlertsPage;
