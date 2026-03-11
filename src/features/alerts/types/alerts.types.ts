export type AlertSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type AlertStatus = 'Open' | 'Investigating' | 'Resolved';
export type AlertColor = 'danger' | 'warning' | 'yellow' | 'blue';

export interface Alert {
  id: string;
  time: string;
  ip: string;
  type: string;
  score: number;
  severity: AlertSeverity;
  status: AlertStatus;
  color: AlertColor;
}

export interface AlertFilters {
  search: string;
  severity: string;
  status: string;
  dateRange: string;
}

export interface AlertStats {
  total: string;
  critical: string;
  investigating: string;
  resolved: string;
}
