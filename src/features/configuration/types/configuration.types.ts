export type ScanInterval =
  | 'Real-time (High Load)'
  | 'Hourly Batches'
  | 'Every 6 Hours'
  | 'Daily Midnight Scan';

export type RetentionPolicy = '30 Days' | '90 Days' | '1 Year' | 'Indefinite (S3 Archive)';

export interface NotificationChannel {
  id: string;
  channel: string;
  config: Record<string, unknown>;
  isEnabled: boolean;
}

export interface NotificationPreference {
  id: string;
  label: string;
  sub: string;
  channel: string;
  enabled: boolean;
}

export interface ConfigurationState {
  sensitivity: number;
  scanInterval: ScanInterval;
  retentionPolicy: RetentionPolicy;
  notifications: NotificationPreference[];
}

export interface SystemConfigData {
  sensitivity?: number;
  scan_interval?: string;
  retention_policy?: string;
  [key: string]: unknown;
}
