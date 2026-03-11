export type ReportFormat = 'PDF' | 'CSV' | 'JSON';
export type ReportType =
  | 'Executive Summary'
  | 'Threat Analysis Log'
  | 'User Access Audit'
  | 'Network Traffic Patterns'
  | 'Compliance Check (ISO 27001)';

export interface ReportDocument {
  title: string;
  date: string;
  type: string;
  size: string;
  icon: string;
  color: string;
}

export interface ScheduledJob {
  name: string;
  schedule: string;
  status: 'Active' | 'Paused';
}

export interface ReportFormState {
  reportType: ReportType;
  startDate: string;
  endDate: string;
  format: ReportFormat;
}

export interface ReportsStats {
  totalGenerated: number;
  archiveSize: string;
  scheduledTasks: number;
}
