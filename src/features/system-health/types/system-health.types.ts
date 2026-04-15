export type HealthStatus = 'Operational' | 'Degraded' | 'Outage' | 'Maintenance' | 'healthy' | 'unhealthy' | 'ok';

export interface ComponentHealth {
  id: string;
  name: string;
  subLabel: string;
  icon: string;
  status: HealthStatus;
  load: number;
  uptime: string;
  region: string;
  responseTimeMs?: number;
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
