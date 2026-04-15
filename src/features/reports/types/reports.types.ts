export type ReportFormat = 'pdf' | 'csv' | 'json';
export type ReportType =
  | 'executive_summary'
  | 'threat_analysis'
  | 'user_access_audit'
  | 'network_traffic'
  | 'compliance';

export const REPORT_TYPE_LABELS: Record<ReportType, string> = {
  executive_summary: 'Executive Summary',
  threat_analysis: 'Threat Analysis Log',
  user_access_audit: 'User Access Audit',
  network_traffic: 'Network Traffic Patterns',
  compliance: 'Compliance Check (ISO 27001)',
};

export const REPORT_FORMAT_LABELS: Record<ReportFormat, string> = {
  pdf: 'PDF',
  csv: 'CSV',
  json: 'JSON',
};

export interface ReportDocument {
  id: string;
  title: string;
  date: string;
  type: string;
  format: string;
  icon: string;
  color: string;
  filePath: string | null;
}

export interface ScheduledJob {
  id: string;
  name: string;
  schedule: string;
  status: 'Active' | 'Paused';
  reportType: string;
  format: string;
  recipients: string[];
}

export interface ReportFormState {
  reportType: ReportType;
  startDate: string;
  endDate: string;
  format: ReportFormat;
}

export interface ReportsStats {
  totalGenerated: number;
  scheduledTasks: number;
}
