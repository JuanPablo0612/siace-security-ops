import type { ComponentHealth, SystemMetric, SystemLogEntry } from '../types/system-health.types';

const COMPONENTS: ComponentHealth[] = [
  {
    id: 'ai-engine',
    name: 'AI Analysis Engine',
    subLabel: 'Neural Network v4.1',
    icon: 'psychology',
    status: 'Operational',
    load: 72,
    uptime: '99.9%',
    region: 'us-east-1',
  },
  {
    id: 'threat-db',
    name: 'Threat Database',
    subLabel: 'MongoDB Atlas Cluster',
    icon: 'database',
    status: 'Operational',
    load: 45,
    uptime: '100%',
    region: 'us-east-1',
  },
  {
    id: 'firewall',
    name: 'Next-Gen Firewall',
    subLabel: 'Palo Alto PAN-OS',
    icon: 'shield',
    status: 'Operational',
    load: 28,
    uptime: '99.99%',
    region: 'Global',
  },
  {
    id: 'siem',
    name: 'SIEM Correlation',
    subLabel: 'Elastic SIEM v8.12',
    icon: 'hub',
    status: 'Degraded',
    load: 89,
    uptime: '98.7%',
    region: 'eu-west-1',
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    subLabel: 'Kong Enterprise',
    icon: 'api',
    status: 'Operational',
    load: 33,
    uptime: '99.95%',
    region: 'us-west-2',
  },
  {
    id: 'log-ingestor',
    name: 'Log Ingestor',
    subLabel: 'Kafka + Logstash',
    icon: 'stream',
    status: 'Operational',
    load: 61,
    uptime: '99.8%',
    region: 'us-east-1',
  },
];

const METRICS: SystemMetric[] = [
  { label: 'System Uptime', value: '99.97%', icon: 'timer', trend: 'up' },
  { label: 'AI Threats Blocked', value: '1,204', icon: 'block', trend: 'up' },
  { label: 'Last Full Scan', value: '2m ago', icon: 'manage_search', trend: 'neutral' },
  { label: 'Avg API Latency', value: '18ms', icon: 'speed', trend: 'down' },
];

const LOG_ENTRIES: SystemLogEntry[] = [
  { time: '11:42:08', message: 'AI Engine completed threat sweep — 0 anomalies detected.', type: 'success' },
  { time: '11:30:15', message: 'SIEM Correlation: High load threshold reached (89%). Auto-scaling triggered.', type: 'warn' },
  { time: '11:15:00', message: 'Database backup completed successfully (2.3 GB, 12.4s).', type: 'info' },
  { time: '10:58:44', message: 'Firewall rule update deployed to all 6 edge nodes.', type: 'info' },
  { time: '10:30:00', message: 'Scheduled maintenance window ended. All systems nominal.', type: 'success' },
  { time: '09:00:00', message: 'Log Ingestor pipeline stalled — recovered automatically.', type: 'warn' },
  { time: '08:15:22', message: 'API Gateway: Rate-limit activated for IP 203.0.113.5.', type: 'error' },
];

export const systemHealthService = {
  getMetrics: async (): Promise<SystemMetric[]> => METRICS,
  getComponentStatuses: async (): Promise<ComponentHealth[]> => COMPONENTS,
  getSystemLogs: async (): Promise<SystemLogEntry[]> => LOG_ENTRIES,
};
