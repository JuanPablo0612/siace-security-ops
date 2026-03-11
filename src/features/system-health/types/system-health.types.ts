export type HealthStatus = 'Operational' | 'Degraded' | 'Outage' | 'Maintenance';

export interface ComponentHealth {
  id: string;
  name: string;
  subLabel: string;
  icon: string;
  status: HealthStatus;
  /** CPU / load percentage (0‑100) */
  load: number;
  /** Uptime percentage string, e.g. "99.98%" */
  uptime: string;
  /** AWS / cloud region label */
  region: string;
}

export interface SystemMetric {
  label: string;
  value: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface SystemLogEntry {
  time: string;
  message: string;
  type: 'info' | 'warn' | 'error' | 'success';
}
