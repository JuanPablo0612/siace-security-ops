export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
export type AlertStatus = 'open' | 'investigating' | 'resolved' | 'closed';
export type AlertColor = 'red' | 'orange' | 'yellow' | 'blue';

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  alertType: string;
  sourceIp: string;
  destinationIp: string | null;
  protocol: string | null;
  port: number | null;
  status: AlertStatus;
  confidenceScore: number;
  assignedTo: string | null;
  notes: string | null;
  isAcknowledged: boolean;
  createdAt: string;
  updatedAt: string;
  color: AlertColor;
}

export interface AlertDetail extends Alert {
  recommendations: AlertRecommendation[];
  recommendedActions: string[];
}

export interface AlertRecommendation {
  id: string;
  recommendationType: string;
  actionText: string;
  confidence: number;
  isImplemented: boolean;
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

export interface AlertListMeta {
  total: number;
  page: number;
  size: number;
  pages: number;
}
