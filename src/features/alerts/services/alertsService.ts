import type { Alert, AlertStats } from '../types/alerts.types';

const MOCK_ALERTS: Alert[] = [
  { id: '#ALT-2023-849', time: 'Oct 24, 09:41:22', ip: '45.33.22.11', type: 'SQL Injection Attempt', score: 92, severity: 'Critical', status: 'Open', color: 'danger' },
  { id: '#ALT-2023-848', time: 'Oct 24, 09:38:15', ip: '192.168.4.22', type: 'Suspicious Login Failure', score: 78, severity: 'High', status: 'Investigating', color: 'warning' },
  { id: '#ALT-2023-845', time: 'Oct 24, 09:12:05', ip: '10.0.0.55', type: 'Port Scan Detected', score: 55, severity: 'Medium', status: 'Resolved', color: 'yellow' },
  { id: '#ALT-2023-842', time: 'Oct 24, 08:55:41', ip: '172.16.254.1', type: 'Unusual Outbound Traffic', score: 35, severity: 'Low', status: 'Open', color: 'blue' },
  { id: '#ALT-2023-839', time: 'Oct 24, 08:30:11', ip: '89.201.12.4', type: 'Malware Signature Match', score: 98, severity: 'Critical', status: 'Investigating', color: 'danger' },
  { id: '#ALT-2023-830', time: 'Oct 24, 07:15:29', ip: '192.168.1.105', type: 'Privilege Escalation', score: 82, severity: 'High', status: 'Open', color: 'warning' },
];

/**
 * alertsService
 *
 * API communication layer for the Alerts feature.
 * Mock data is returned synchronously; replace with real HTTP calls.
 */
export const alertsService = {
  getAlerts: async (): Promise<Alert[]> => {
    // TODO: GET /api/alerts
    return MOCK_ALERTS;
  },

  getAlertById: async (id: string): Promise<Alert | undefined> => {
    // TODO: GET /api/alerts/:id
    return MOCK_ALERTS.find((a) => a.id === id);
  },

  getStats: async (): Promise<AlertStats> => {
    // TODO: GET /api/alerts/stats
    return { total: '1,248', critical: '42', investigating: '156', resolved: '1,042' };
  },
};
