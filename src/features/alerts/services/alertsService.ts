import { apiClient } from '@/shared/services/apiClient';
import type { Alert, AlertDetail, AlertFilters, AlertListMeta, AlertStatus } from '../types/alerts.types';

interface ApiAlert {
  id: string;
  title: string;
  description: string;
  severity: string;
  alert_type: string;
  source_ip: string;
  destination_ip: string | null;
  protocol: string | null;
  port: number | null;
  status: string;
  confidence_score: number;
  assigned_to: string | null;
  notes: string | null;
  is_acknowledged: boolean;
  created_at: string;
  updated_at: string;
}

interface ApiAlertDetail extends ApiAlert {
  recommendations: Array<{
    id: string;
    recommendation_type: string;
    action_text: string;
    confidence: number;
    is_implemented: boolean;
  }>;
  recommended_actions: string[];
}

interface ApiAlertList {
  data: ApiAlert[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

function severityToColor(severity: string): Alert['color'] {
  const s = severity.toLowerCase();
  if (s === 'critical') return 'red';
  if (s === 'high') return 'orange';
  if (s === 'medium') return 'yellow';
  return 'blue';
}

function mapAlert(a: ApiAlert): Alert {
  return {
    id: a.id,
    title: a.title,
    description: a.description,
    severity: a.severity.toLowerCase() as Alert['severity'],
    alertType: a.alert_type,
    sourceIp: a.source_ip,
    destinationIp: a.destination_ip,
    protocol: a.protocol,
    port: a.port,
    status: a.status.toLowerCase() as Alert['status'],
    confidenceScore: a.confidence_score,
    assignedTo: a.assigned_to,
    notes: a.notes,
    isAcknowledged: a.is_acknowledged,
    createdAt: a.created_at,
    updatedAt: a.updated_at,
    color: severityToColor(a.severity),
  };
}

function mapAlertDetail(a: ApiAlertDetail): AlertDetail {
  return {
    ...mapAlert(a),
    recommendations: a.recommendations.map((r) => ({
      id: r.id,
      recommendationType: r.recommendation_type,
      actionText: r.action_text,
      confidence: r.confidence,
      isImplemented: r.is_implemented,
    })),
    recommendedActions: a.recommended_actions ?? [],
  };
}

function buildQueryString(filters: AlertFilters, page: number, size: number): string {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('size', String(size));
  if (filters.severity && filters.severity !== 'all') params.set('severity', filters.severity);
  if (filters.status && filters.status !== 'all') params.set('status', filters.status);
  if (filters.search) params.set('source_ip', filters.search);
  return params.toString();
}

export const alertsService = {
  getAlerts: async (
    filters: AlertFilters,
    page = 1,
    size = 20
  ): Promise<{ alerts: Alert[]; meta: AlertListMeta }> => {
    const qs = buildQueryString(filters, page, size);
    const res = await apiClient.get<ApiAlertList>(`/api/alerts?${qs}`);
    return {
      alerts: res.data.map(mapAlert),
      meta: { total: res.total, page: res.page, size: res.size, pages: res.pages },
    };
  },

  getAlertById: async (id: string): Promise<AlertDetail> => {
    const res = await apiClient.get<ApiAlertDetail>(`/api/alerts/${id}`);
    return mapAlertDetail(res);
  },

  updateAlert: async (
    id: string,
    update: { status?: AlertStatus; notes?: string; is_acknowledged?: boolean }
  ): Promise<Alert> => {
    const res = await apiClient.patch<ApiAlert>(`/api/alerts/${id}`, update);
    return mapAlert(res);
  },

  getAiRecommendations: async (id: string): Promise<AlertDetail['recommendations']> => {
    const res = await apiClient.post<ApiAlertDetail>(`/api/alerts/${id}/ai-recommendations`, {});
    return res.recommendations?.map((r) => ({
      id: r.id,
      recommendationType: r.recommendation_type,
      actionText: r.action_text,
      confidence: r.confidence,
      isImplemented: r.is_implemented,
    })) ?? [];
  },
};
