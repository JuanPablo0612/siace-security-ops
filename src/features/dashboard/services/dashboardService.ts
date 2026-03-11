import type {
  DashboardMetrics,
  WeeklyThreatDataPoint,
  RecentAlert,
  ComponentStatus,
  QuickAction,
} from '../types/dashboard.types';

/**
 * dashboardService
 *
 * Responsible for API communication for all dashboard data.
 * Replace the mock implementations with real fetch/axios calls
 * once a backend is available.
 */
export const dashboardService = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    // TODO: GET /api/dashboard/metrics
    return {
      totalEvents: '12,450',
      aiAnomalies: 3,
      criticalAlerts: 0,
      avgResponseTime: '12ms',
      globalRiskScore: 72,
      securityGrade: 'B+',
      lastScan: '2m ago',
    };
  },

  getWeeklyThreatData: async (): Promise<WeeklyThreatDataPoint[]> => {
    // TODO: GET /api/dashboard/weekly-threats
    return [
      { name: 'Mon', value: 400 },
      { name: 'Tue', value: 300 },
      { name: 'Wed', value: 550 },
      { name: 'Thu', value: 420 },
      { name: 'Fri', value: 600 },
      { name: 'Sat', value: 350 },
      { name: 'Sun', value: 480 },
      { name: 'Mon2', value: 520 },
      { name: 'Tue2', value: 380 },
      { name: 'Wed2', value: 650 },
      { name: 'Thu2', value: 500 },
      { name: 'Fri2', value: 450 },
    ];
  },

  getRecentAlerts: async (): Promise<RecentAlert[]> => {
    // TODO: GET /api/dashboard/recent-alerts
    return [
      { name: 'SQL Injection', time: '10:42 AM • DB-Server-01', severity: 'High', color: 'orange' },
      { name: 'Login Failed', time: '09:15 AM • User: Admin', severity: 'Warn', color: 'yellow' },
      { name: 'Port Scan', time: '08:30 AM • Firewall', severity: 'Info', color: 'blue' },
      { name: 'New Device', time: '08:12 AM • Network', severity: 'Info', color: 'blue' },
      { name: 'Policy Violation', time: 'Yesterday • User: Guest', severity: 'Warn', color: 'yellow' },
    ];
  },

  getComponentStatuses: async (): Promise<ComponentStatus[]> => {
    // TODO: GET /api/dashboard/component-status
    return [
      { icon: 'cloud_done', label: 'Cloud API', color: 'green', statusClass: 'bg-green-500' },
      { icon: 'database', label: 'Databases', color: 'green', statusClass: 'bg-green-500' },
      { icon: 'bolt', label: 'AI Engine', color: 'yellow', statusClass: 'bg-yellow-500 animate-pulse' },
      { icon: 'lock', label: 'Firewall', color: 'green', statusClass: 'bg-green-500' },
    ];
  },

  getQuickActions: async (): Promise<QuickAction[]> => {
    return [
      { icon: 'add_moderator', label: 'Run Scan' },
      { icon: 'summarize', label: 'Export Log' },
      { icon: 'person_add', label: 'Add User' },
      { icon: 'settings_applications', label: 'Config' },
    ];
  },
};
