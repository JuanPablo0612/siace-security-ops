import { apiClient } from '@/shared/services/apiClient';
import type {
  DashboardMetrics,
  WeeklyThreatDataPoint,
  RecentAlert,
  ComponentStatus,
} from '../types/dashboard.types';

interface ApiMetrics {
  total_alerts: number;
  critical_count: number;
  open_incidents: number;
  avg_response_time_ms: number;
}

interface ApiRiskLevel {
  risk_score: number;
  level: string;
}

interface ApiWeeklyTrend {
  data: Array<{ date: string; count: number }>;
}

interface ApiRecentAlert {
  id: string;
  title: string;
  severity: string;
  status: string;
  source_ip: string;
  created_at: string;
}

interface ApiRecentAlerts {
  data: ApiRecentAlert[];
  total: number;
}

interface ApiServiceHealth {
  service: string;
  status: string;
  response_time_ms: number;
  details: Record<string, unknown>;
}

function severityToColor(severity: string): string {
  const s = severity.toLowerCase();
  if (s === 'critical') return 'red';
  if (s === 'high') return 'orange';
  if (s === 'medium') return 'yellow';
  return 'blue';
}

function serviceToIcon(service: string): string {
  const s = service.toLowerCase();
  if (s.includes('ai') || s.includes('model')) return 'smart_toy';
  if (s.includes('db') || s.includes('database')) return 'database';
  if (s.includes('firewall')) return 'shield';
  if (s.includes('api')) return 'cloud_done';
  if (s.includes('auth')) return 'lock';
  if (s.includes('kafka') || s.includes('log')) return 'stream';
  return 'dns';
}

function serviceStatusToColor(status: string): string {
  const s = status.toLowerCase();
  if (s === 'healthy' || s === 'operational' || s === 'ok') return 'green';
  if (s === 'degraded' || s === 'warning') return 'yellow';
  return 'red';
}

function serviceStatusToClass(status: string): string {
  const color = serviceStatusToColor(status);
  if (color === 'green') return 'bg-green-500';
  if (color === 'yellow') return 'bg-yellow-500 animate-pulse';
  return 'bg-red-500 animate-pulse';
}

export const dashboardService = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    const [metrics, risk] = await Promise.all([
      apiClient.get<ApiMetrics>('/api/dashboard/metrics'),
      apiClient.get<ApiRiskLevel>('/api/dashboard/risk-level'),
    ]);
    return {
      totalAlerts: metrics.total_alerts,
      criticalCount: metrics.critical_count,
      openIncidents: metrics.open_incidents,
      avgResponseTimeMs: metrics.avg_response_time_ms,
      riskScore: risk.risk_score,
      riskLevel: risk.level,
    };
  },

  getWeeklyThreatData: async (): Promise<WeeklyThreatDataPoint[]> => {
    const res = await apiClient.get<ApiWeeklyTrend>('/api/dashboard/weekly-trend');
    return res.data.map((d) => ({
      name: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      value: d.count,
    }));
  },

  getRecentAlerts: async (): Promise<RecentAlert[]> => {
    const res = await apiClient.get<ApiRecentAlerts>('/api/dashboard/recent-alerts?limit=10');
    return res.data.map((a) => ({
      id: a.id,
      name: a.title,
      time: `${new Date(a.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} • ${a.source_ip}`,
      severity: a.severity,
      status: a.status,
      color: severityToColor(a.severity),
    }));
  },

  getComponentStatuses: async (): Promise<ComponentStatus[]> => {
    const services = await apiClient.get<ApiServiceHealth[]>('/api/health/services');
    if (!Array.isArray(services) || services.length === 0) return [];
    return services.map((s) => ({
      icon: serviceToIcon(s.service),
      label: s.service,
      color: serviceStatusToColor(s.status),
      statusClass: serviceStatusToClass(s.status),
    }));
  },
};
