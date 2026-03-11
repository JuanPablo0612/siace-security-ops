export interface DashboardMetrics {
  totalEvents: string;
  aiAnomalies: number;
  criticalAlerts: number;
  avgResponseTime: string;
  globalRiskScore: number;
  securityGrade: string;
  lastScan: string;
}

export interface WeeklyThreatDataPoint {
  name: string;
  value: number;
}

export interface RecentAlert {
  name: string;
  time: string;
  severity: string;
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
