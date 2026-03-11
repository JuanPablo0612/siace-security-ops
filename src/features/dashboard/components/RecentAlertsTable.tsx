import React from 'react';
import type { RecentAlert } from '../types/dashboard.types';

interface RecentAlertsTableProps {
  alerts: RecentAlert[];
  onViewAll?: () => void;
}

/**
 * RecentAlertsTable
 *
 * Mini table showing the most recent security alerts on the Dashboard.
 * Designed to live in the right column of the overview grid.
 */
const RecentAlertsTable: React.FC<RecentAlertsTableProps> = ({ alerts, onViewAll }) => (
  <div className="col-span-1 xl:col-span-1 rounded-xl border border-border-dark bg-card-dark p-0 shadow-sm overflow-hidden flex flex-col">
    <div className="p-4 border-b border-border-dark flex items-center justify-between">
      <h3 className="text-base font-semibold text-white">Recent Security Alerts</h3>
      <button
        onClick={onViewAll}
        className="text-xs text-primary hover:text-blue-400 font-medium"
      >
        View All
      </button>
    </div>
    <div className="flex-1 overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-400">
        <thead className="bg-slate-800/50 text-xs uppercase text-slate-500 font-medium">
          <tr>
            <th className="px-4 py-3">Threat Type</th>
            <th className="px-4 py-3 text-right">Severity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-dark">
          {alerts.map((row, idx) => (
            <tr
              key={idx}
              className="hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full bg-${row.color}-500`}></div>
                  <div>
                    <p className="font-medium text-white group-hover:text-primary transition-colors">
                      {row.name}
                    </p>
                    <p className="text-xs text-slate-500">{row.time}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <span
                  className={`inline-flex items-center rounded-full bg-${row.color}-500/10 px-2 py-1 text-xs font-medium text-${row.color}-500 ring-1 ring-inset ring-${row.color}-500/20`}
                >
                  {row.severity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentAlertsTable;
