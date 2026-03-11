import type { ReportDocument, ScheduledJob, ReportsStats } from '../types/reports.types';

/**
 * reportsService
 *
 * API layer for reports generation and archive retrieval.
 * Replace mock data with real HTTP calls.
 */
export const reportsService = {
  getRecentDocuments: async (): Promise<ReportDocument[]> => {
    // TODO: GET /api/reports/archive
    return [
      { title: 'October Security Audit', date: 'Oct 24, 2023', type: 'Full Audit', size: '2.4 MB', icon: 'picture_as_pdf', color: 'red' },
      { title: 'Q3 Incident Log', date: 'Oct 01, 2023', type: 'Incidents', size: '856 KB', icon: 'table_view', color: 'green' },
      { title: 'User Access Review', date: 'Sep 28, 2023', type: 'IAM', size: '1.1 MB', icon: 'picture_as_pdf', color: 'red' },
      { title: 'Firewall Config Backup', date: 'Sep 15, 2023', type: 'Config', size: '45 KB', icon: 'data_object', color: 'yellow' },
      { title: 'September Exec Summary', date: 'Sep 30, 2023', type: 'Summary', size: '3.2 MB', icon: 'picture_as_pdf', color: 'red' },
      { title: 'Penetration Test Results', date: 'Aug 22, 2023', type: 'External', size: '12.8 MB', icon: 'lock', color: 'blue' },
    ];
  },

  getScheduledJobs: async (): Promise<ScheduledJob[]> => {
    // TODO: GET /api/reports/scheduled
    return [
      { name: 'Weekly Exec Summary', schedule: 'Every Mon, 9:00 AM', status: 'Active' },
      { name: 'Monthly Compliance', schedule: '1st of Month', status: 'Paused' },
    ];
  },

  getStats: async (): Promise<ReportsStats> => {
    // TODO: GET /api/reports/stats
    return { totalGenerated: 124, archiveSize: '12GB', scheduledTasks: 4 };
  },

  generateReport: async (/* form: ReportFormState */): Promise<void> => {
    // TODO: POST /api/reports/generate
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};
