export type EventSeverity = 'high' | 'medium' | 'low';
export type EventType = 'All' | 'Threat' | 'Network' | 'Auth' | 'System';

export interface SecurityEvent {
  id: number;
  time: string;
  date: string;
  type: Exclude<EventType, 'All'>;
  icon: string;
  title: string;
  desc: string;
  severity: EventSeverity;
  source: string;
}

export interface EventFiltersState {
  activeType: EventType;
}
