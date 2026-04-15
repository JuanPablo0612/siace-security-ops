import React from 'react';
import type { AlertStatus } from '../types/alerts.types';

interface AlertStatusBadgeProps {
  status: AlertStatus;
}

const STATUS_CLASSES: Record<AlertStatus, string> = {
  open: 'bg-red-500/10 text-red-400',
  investigating: 'bg-yellow-500/10 text-yellow-500',
  resolved: 'bg-green-500/10 text-green-400',
  closed: 'bg-slate-500/10 text-slate-400',
};

const STATUS_LABELS: Record<AlertStatus, string> = {
  open: 'Open',
  investigating: 'Investigating',
  resolved: 'Resolved',
  closed: 'Closed',
};

const AlertStatusBadge: React.FC<AlertStatusBadgeProps> = ({ status }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${STATUS_CLASSES[status] ?? 'bg-slate-500/10 text-slate-400'}`}
  >
    {STATUS_LABELS[status] ?? status}
  </span>
);

export default AlertStatusBadge;
