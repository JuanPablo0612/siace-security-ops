import React from 'react';
import type { Alert } from '../types/alerts.types';
import AlertStatusBadge from './AlertStatusBadge';

interface AlertsTableProps {
  alerts: Alert[];
  onRowClick: (alert: Alert) => void;
}

/**
 * AlertsTable
 *
 * Full-featured alerts data table with sortable headers, risk score
 * badge, status badge, and per-row action controls.
 */
const AlertsTable: React.FC<AlertsTableProps> = ({ alerts, onRowClick }) => (
  <div className="w-full rounded-xl border border-border-dark/50 bg-surface-dark overflow-hidden flex flex-col flex-1">
    <div className="overflow-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border-dark/50 bg-border-dark/20 text-slate-400 text-xs uppercase tracking-wider font-semibold">
            <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors">Alert ID</th>
            <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors">Timestamp</th>
            <th className="px-6 py-4">Source IP</th>
            <th className="px-6 py-4">Threat Type</th>
            <th className="px-6 py-4">Risk Score</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-dark/30 text-sm">
          {alerts.map((alert, i) => {
            const colorKey =
              alert.color === 'blue'
                ? 'blue'
                : alert.color === 'yellow'
                ? 'yellow'
                : alert.color;
            return (
              <tr
                key={i}
                className="hover:bg-white/5 transition-colors group cursor-pointer"
                onClick={() => onRowClick(alert)}
              >
                <td className="px-6 py-4 font-mono text-white">{alert.id}</td>
                <td className="px-6 py-4 text-slate-400">{alert.time}</td>
                <td className="px-6 py-4 font-mono text-slate-400">{alert.ip}</td>
                <td className="px-6 py-4 text-white font-medium">{alert.type}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-${colorKey}-500/10 text-${colorKey}-500 border border-${colorKey}-500/20`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full bg-${colorKey}-500`}></div>
                    {alert.score} {alert.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <AlertStatusBadge status={alert.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:text-primary-hover font-medium text-xs mr-3">
                    Investigate
                  </button>
                  <button className="text-slate-400 hover:text-white">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/* Pagination footer */}
    <div className="flex items-center justify-between px-6 py-4 border-t border-border-dark/30 bg-surface-dark mt-auto">
      <p className="text-sm text-slate-400">
        Showing <span className="font-medium text-white">1-{alerts.length}</span> of{' '}
        <span className="font-medium text-white">1,248</span> alerts
      </p>
      <div className="flex items-center gap-2">
        <button className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-border-dark disabled:opacity-50">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              page === 1
                ? 'bg-primary text-white'
                : 'text-slate-400 hover:text-white hover:bg-border-dark'
            }`}
          >
            {page}
          </button>
        ))}
        <span className="text-slate-400">...</span>
        <button className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-border-dark">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
);

export default AlertsTable;
