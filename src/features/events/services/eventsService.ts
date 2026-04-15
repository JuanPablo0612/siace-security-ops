import { apiClient } from '@/shared/services/apiClient';
import type { SecurityEvent, EventListMeta } from '../types/events.types';

interface ApiEvent {
  id: string;
  timestamp: string;
  host: string;
  source_ip: string;
  destination_ip: string | null;
  event_type: string;
  severity: string;
  message: string;
  metadata_: Record<string, unknown> | null;
  raw_log: string | null;
  alert_id: string | null;
  is_anomaly: boolean;
  anomaly_score: number;
  created_at: string;
  updated_at: string;
}

interface ApiEventList {
  data: ApiEvent[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

function eventTypeToCategory(eventType: string): SecurityEvent['type'] {
  const t = eventType.toLowerCase();
  if (t.includes('threat') || t.includes('malware') || t.includes('intrusion') || t.includes('attack')) return 'Threat';
  if (t.includes('network') || t.includes('firewall') || t.includes('traffic') || t.includes('port') || t.includes('dns')) return 'Network';
  if (t.includes('auth') || t.includes('login') || t.includes('access') || t.includes('password') || t.includes('credential')) return 'Auth';
  return 'System';
}

function eventTypeToIcon(type: SecurityEvent['type']): string {
  if (type === 'Threat') return 'bug_report';
  if (type === 'Network') return 'router';
  if (type === 'Auth') return 'vpn_key';
  return 'system_update';
}

function severityNormalize(severity: string): SecurityEvent['severity'] {
  const s = severity.toLowerCase();
  if (s === 'high' || s === 'critical') return 'high';
  if (s === 'medium' || s === 'warning') return 'medium';
  return 'low';
}

function mapEvent(e: ApiEvent): SecurityEvent {
  const ts = new Date(e.timestamp || e.created_at);
  const category = eventTypeToCategory(e.event_type);
  return {
    id: e.id,
    time: ts.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    date: ts.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    type: category,
    icon: eventTypeToIcon(category),
    title: e.event_type,
    desc: e.message,
    severity: severityNormalize(e.severity),
    source: e.host || e.source_ip,
    isAnomaly: e.is_anomaly,
    anomalyScore: e.anomaly_score,
  };
}

export const eventsService = {
  getEvents: async (
    eventType?: string,
    page = 1,
    size = 50
  ): Promise<{ events: SecurityEvent[]; meta: EventListMeta }> => {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));
    params.set('order', 'desc');
    if (eventType && eventType !== 'All') params.set('event_type', eventType);
    const res = await apiClient.get<ApiEventList>(`/api/events?${params.toString()}`);
    return {
      events: res.data.map(mapEvent),
      meta: { total: res.total, page: res.page, size: res.size, pages: res.pages },
    };
  },
};
