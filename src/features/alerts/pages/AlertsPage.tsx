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
  badgeColorClass: string;
  borderColor: string;
  textColorClass?: string;
}> = ({ label, value, badge, badgeColorClass, borderColor, textColorClass }) => (
  <div className={`bg-surface-dark border ${borderColor} rounded-lg p-3 flex items-center justify-between relative overflow-hidden`}>
    <div className="relative z-10">
      <p className={`text-xs uppercase font-medium ${textColorClass ?? 'text-slate-400'}`}>{label}</p>
      <p className="text-white text-xl font-bold">{value}</p>
    </div>
    <span className={`text-xs font-medium px-2 py-1 rounded ${badgeColorClass}`}>{badge}</span>
  </div>
);

const AlertsPage: React.FC = () => {
  const navigate = useNavigate();
  const { alerts, meta, filters, isLoading, error, page, setFilters, setPage } = useAlerts();

  const handleRowClick = (alert: Alert) => {
    navigate(`/alerts/${alert.id}`);
  };

  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const investigatingCount = alerts.filter((a) => a.status === 'investigating').length;
  const resolvedCount = alerts.filter((a) => a.status === 'resolved').length;

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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Alerts"
            value={meta ? meta.total.toLocaleString() : '—'}
            badge={meta ? `${meta.pages} pages` : ''}
            badgeColorClass="bg-blue-500/10 text-blue-400"
            borderColor="border-border-dark"
          />
          <StatCard
            label="Critical Threats"
            value={String(criticalCount)}
            badge="Critical"
            badgeColorClass="bg-red-500/10 text-red-400"
            borderColor="border-red-500/30"
            textColorClass="text-red-400"
          />
          <StatCard
            label="Investigating"
            value={String(investigatingCount)}
            badge="Active"
            badgeColorClass="bg-yellow-500/10 text-yellow-400"
            borderColor="border-border-dark"
          />
          <StatCard
            label="Resolved"
            value={String(resolvedCount)}
            badge="Done"
            badgeColorClass="bg-green-500/10 text-green-400"
            borderColor="border-border-dark"
          />
        </div>

        <AlertFiltersBar filters={filters} onChange={setFilters} />
      </div>

      {error ? (
        <div className="flex items-center justify-center h-40 text-red-400 text-sm">{error}</div>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
          Loading alerts…
        </div>
      ) : (
        <AlertsTable
          alerts={alerts}
          meta={meta}
          page={page}
          onRowClick={handleRowClick}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default AlertsPage;
