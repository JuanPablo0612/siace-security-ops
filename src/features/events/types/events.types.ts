export type EventSeverity = 'high' | 'medium' | 'low';
export type EventType = 'All' | 'Threat' | 'Network' | 'Auth' | 'System';

export interface SecurityEvent {
  id: string;
  time: string;
  date: string;
  type: Exclude<EventType, 'All'>;
  icon: string;
  title: string;
  desc: string;
  severity: EventSeverity;
  source: string;
  isAnomaly: boolean;
  anomalyScore: number;
}

export interface EventFiltersState {
  activeType: EventType;
}

export interface EventListMeta {
  total: number;
  page: number;
  size: number;
  pages: number;
}
