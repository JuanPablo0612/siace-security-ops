import { apiClient } from '@/shared/services/apiClient';
import type { ReportDocument, ScheduledJob, ReportsStats, ReportFormState } from '../types/reports.types';

interface ApiReport {
  id: string;
  title: string;
  report_type: string;
  file_format: string;
  file_path: string | null;
  generated_by: string;
  created_at: string;
}

interface ApiReportList {
  data: ApiReport[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

interface ApiSchedule {
  id: string;
  name: string;
  report_type: string;
  frequency: string;
  format: string;
  recipients: string[];
  is_active: boolean;
  created_at: string;
  last_generated: string | null;
}

interface ApiScheduleList {
  data?: ApiSchedule[];
}

function formatToIcon(format: string): string {
  const f = format.toLowerCase();
  if (f === 'pdf') return 'picture_as_pdf';
  if (f === 'csv') return 'table_view';
  if (f === 'json') return 'data_object';
  return 'description';
}

function formatToColor(format: string): string {
  const f = format.toLowerCase();
  if (f === 'pdf') return 'red';
  if (f === 'csv') return 'green';
  if (f === 'json') return 'yellow';
  return 'blue';
}

function mapReport(r: ApiReport): ReportDocument {
  return {
    id: r.id,
    title: r.title,
    date: new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    type: r.report_type,
    format: r.file_format,
    icon: formatToIcon(r.file_format),
    color: formatToColor(r.file_format),
    filePath: r.file_path,
  };
}

function mapSchedule(s: ApiSchedule): ScheduledJob {
  return {
    id: s.id,
    name: s.name,
    schedule: s.frequency,
    status: s.is_active ? 'Active' : 'Paused',
    reportType: s.report_type,
    format: s.format,
    recipients: s.recipients,
  };
}

export const reportsService = {
  getRecentDocuments: async (): Promise<ReportDocument[]> => {
    const res = await apiClient.get<ApiReportList>('/api/reports?size=20');
    return res.data.map(mapReport);
  },

  getScheduledJobs: async (): Promise<ScheduledJob[]> => {
    const res = await apiClient.get<ApiScheduleList | ApiSchedule[]>('/api/reports/schedule');
    const data = Array.isArray(res) ? res : (res as ApiScheduleList).data ?? [];
    return data.map(mapSchedule);
  },

  getStats: async (documents: ReportDocument[], scheduledJobs: ScheduledJob[]): Promise<ReportsStats> => {
    return {
      totalGenerated: documents.length,
      scheduledTasks: scheduledJobs.filter((j) => j.status === 'Active').length,
    };
  },

  generateReport: async (form: ReportFormState): Promise<string> => {
    const res = await apiClient.post<{ task_id: string; message: string }>('/api/reports/generate', {
      report_type: form.reportType,
      format: form.format,
      date_from: form.startDate || null,
      date_to: form.endDate || null,
    });
    return res.task_id;
  },

  downloadReport: async (reportId: string): Promise<void> => {
    const token = localStorage.getItem('siace_access_token');
    const url = `${(import.meta as any).env?.VITE_API_URL ?? ''}/api/reports/${reportId}/download`;
    const a = document.createElement('a');
    a.href = token ? `${url}?token=${token}` : url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.click();
  },
};
