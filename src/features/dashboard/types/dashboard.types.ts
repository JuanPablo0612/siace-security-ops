export interface DashboardMetrics {
  totalAlerts: number;
  criticalCount: number;
  openIncidents: number;
  avgResponseTimeMs: number;
  riskScore: number;
  riskLevel: string;
}

export interface WeeklyThreatDataPoint {
  name: string;
  value: number;
}

export interface RecentAlert {
  id: string;
  name: string;
  time: string;
  severity: string;
  status: string;
  color: string;
}

export interface ComponentStatus {
  icon: string;
  label: string;
  color: string;
  statusClass: string;
}

export interface QuickAction {
  icon: string;
  label: string;
}

export interface MetricCardData {
  icon: string;
  iconColor: string;
  iconBg: string;
  trendIcon?: string;
  trendColor: string;
  trendValue?: string;
  trendText?: string;
  title: string;
  value: string;
}
