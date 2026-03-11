import React from 'react';
import type { AlertStatus } from '../types/alerts.types';

interface AlertStatusBadgeProps {
  status: AlertStatus;
}

const STATUS_CLASSES: Record<AlertStatus, string> = {
  Open: 'bg-red-500/10 text-red-400',
  Investigating: 'bg-yellow-500/10 text-yellow-500',
  Resolved: 'bg-green-500/10 text-green-400',
};

/**
 * AlertStatusBadge
 *
 * Renders a colour-coded badge for an alert's current status.
 */
const AlertStatusBadge: React.FC<AlertStatusBadgeProps> = ({ status }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${STATUS_CLASSES[status]}`}
  >
    {status}
  </span>
);

export default AlertStatusBadge;
