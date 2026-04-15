import React from 'react';
import type { Alert, AlertListMeta } from '../types/alerts.types';
import AlertStatusBadge from './AlertStatusBadge';

interface AlertsTableProps {
  alerts: Alert[];
  meta: AlertListMeta | null;
  page: number;
  onRowClick: (alert: Alert) => void;
  onPageChange: (p: number) => void;
}

const AlertsTable: React.FC<AlertsTableProps> = ({ alerts, meta, page, onRowClick, onPageChange }) => {
  const totalPages = meta?.pages ?? 1;

  return (
    <div className="w-full rounded-xl border border-border-dark/50 bg-surface-dark overflow-hidden flex flex-col flex-1">
      <div className="overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-dark/50 bg-border-dark/20 text-slate-400 text-xs uppercase tracking-wider font-semibold">
              <th className="px-6 py-4">Alert ID</th>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Source IP</th>
              <th className="px-6 py-4">Threat Type</th>
              <th className="px-6 py-4">Risk Score</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-dark/30 text-sm">
            {alerts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-slate-400">
                  No alerts found
                </td>
              </tr>
            ) : (
              alerts.map((alert) => (
                <tr
                  key={alert.id}
                  className="hover:bg-white/5 transition-colors group cursor-pointer"
                  onClick={() => onRowClick(alert)}
                >
                  <td className="px-6 py-4 font-mono text-white text-xs">{alert.id.slice(0, 8)}…</td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(alert.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-400">{alert.sourceIp}</td>
                  <td className="px-6 py-4 text-white font-medium">{alert.alertType}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-${alert.color}-500/10 text-${alert.color}-500 border border-${alert.color}-500/20`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-${alert.color}-500`}></div>
                      {alert.confidenceScore}% {alert.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <AlertStatusBadge status={alert.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="text-primary hover:text-primary-hover font-medium text-xs mr-3"
                      onClick={(e) => { e.stopPropagation(); onRowClick(alert); }}
                    >
                      Investigate
                    </button>
                    <button
                      className="text-slate-400 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border-dark/30 bg-surface-dark mt-auto">
        <p className="text-sm text-slate-400">
          {meta ? (
            <>
              Showing{' '}
              <span className="font-medium text-white">
                {Math.min((page - 1) * meta.size + 1, meta.total)}–{Math.min(page * meta.size, meta.total)}
              </span>{' '}
              of <span className="font-medium text-white">{meta.total.toLocaleString()}</span> alerts
            </>
          ) : (
            `${alerts.length} alerts`
          )}
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-border-dark disabled:opacity-50"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                p === page
                  ? 'bg-primary text-white'
                  : 'text-slate-400 hover:text-white hover:bg-border-dark'
              }`}
            >
              {p}
            </button>
          ))}
          {totalPages > 3 && <span className="text-slate-400">…</span>}
          <button
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-border-dark disabled:opacity-50"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsTable;
