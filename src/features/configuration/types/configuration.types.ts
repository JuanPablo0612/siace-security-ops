export type ScanInterval =
  | 'Real-time (High Load)'
  | 'Hourly Batches'
  | 'Every 6 Hours'
  | 'Daily Midnight Scan';

export type RetentionPolicy = '30 Days' | '90 Days' | '1 Year' | 'Indefinite (S3 Archive)';

export interface NotificationChannel {
  icon: string;
  label: string;
}

export interface NotificationPreference {
  label: string;
  sub: string;
  enabled: boolean;
}

export interface ConfigurationState {
  sensitivity: number;
  scanInterval: ScanInterval;
  retentionPolicy: RetentionPolicy;
  notifications: NotificationPreference[];
}
