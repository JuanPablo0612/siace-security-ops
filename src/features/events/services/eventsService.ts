import type { SecurityEvent } from '../types/events.types';

const MOCK_EVENTS: SecurityEvent[] = [
  { id: 1, time: '14:42:05', date: 'Oct 24', type: 'Network', icon: 'router', title: 'Firewall Rule Triggered', desc: 'Inbound connection blocked from blacklisted IP range (China/CN).', severity: 'medium', source: 'Firewall-01' },
  { id: 2, time: '14:30:12', date: 'Oct 24', type: 'Auth', icon: 'vpn_key', title: 'Privileged Access Granted', desc: 'User "admin_sys" accessed "Production-DB" via SSH.', severity: 'low', source: 'Auth-Svc' },
  { id: 3, time: '13:15:00', date: 'Oct 24', type: 'System', icon: 'system_update', title: 'Automated Patch Applied', desc: 'Security patch KB40922 applied to Server-Cluster-A.', severity: 'low', source: 'Update-Mgr' },
  { id: 4, time: '11:20:45', date: 'Oct 24', type: 'Threat', icon: 'bug_report', title: 'Malware Signature Detected', desc: 'Heuristic scan identified suspicious payload in uploaded file "invoice.pdf.exe".', severity: 'high', source: 'Anti-Malware' },
  { id: 5, time: '09:05:11', date: 'Oct 24', type: 'Network', icon: 'lan', title: 'Unusual Outbound Traffic', desc: 'Spike in outbound UDP traffic detected on non-standard ports.', severity: 'medium', source: 'Net-Flow' },
  { id: 6, time: '23:10:05', date: 'Oct 23', type: 'Auth', icon: 'lock_person', title: 'Failed Login Attempt', desc: '5 failed login attempts detected for user "jdoe" within 1 minute.', severity: 'medium', source: 'Auth-Svc' },
  { id: 7, time: '18:00:00', date: 'Oct 23', type: 'System', icon: 'backup', title: 'Daily Backup Completed', desc: 'Full database backup successfully stored in S3 Bucket.', severity: 'low', source: 'Backup-Job' },
];

/**
 * eventsService
 *
 * API layer for the Events feature.
 * Replace mock data with real HTTP calls when the backend is available.
 */
export const eventsService = {
  getEvents: async (): Promise<SecurityEvent[]> => {
    // TODO: GET /api/events
    return MOCK_EVENTS;
  },
};
