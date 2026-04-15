import { apiClient } from '@/shared/services/apiClient';
import type { ConfigurationState, SystemConfigData, NotificationPreference } from '../types/configuration.types';

interface ApiNotification {
  id: string;
  channel: string;
  config: Record<string, unknown>;
  is_enabled: boolean;
}

const CHANNEL_LABELS: Record<string, { label: string; sub: string }> = {
  email: { label: 'Email Alerts', sub: 'Critical threat notifications via email' },
  slack: { label: 'Slack Notifications', sub: 'Team channel security updates' },
  webhook: { label: 'Webhook Alerts', sub: 'Custom endpoint integrations' },
  sms: { label: 'SMS Alerts', sub: 'Immediate breach notifications' },
  pagerduty: { label: 'PagerDuty', sub: 'On-call escalation alerts' },
};

const DEFAULT_SCAN_INTERVALS = [
  'Real-time (High Load)',
  'Hourly Batches',
  'Every 6 Hours',
  'Daily Midnight Scan',
] as const;

function mapScanInterval(val: string | undefined): ConfigurationState['scanInterval'] {
  if (!val) return 'Hourly Batches';
  const match = DEFAULT_SCAN_INTERVALS.find(
    (s) => s.toLowerCase() === val.toLowerCase() || s === val
  );
  return match ?? 'Hourly Batches';
}

function mapRetentionPolicy(val: string | undefined): ConfigurationState['retentionPolicy'] {
  const allowed = ['30 Days', '90 Days', '1 Year', 'Indefinite (S3 Archive)'] as const;
  const match = allowed.find((p) => p === val);
  return match ?? '90 Days';
}

export const configurationService = {
  getConfiguration: async (): Promise<ConfigurationState> => {
    const [systemConfigs, notifications] = await Promise.all([
      apiClient.get<SystemConfigData[]>('/api/config/system').catch(() => [] as SystemConfigData[]),
      apiClient.get<ApiNotification[]>('/api/config/notifications').catch(() => [] as ApiNotification[]),
    ]);

    // Merge all config key-value pairs
    const merged: SystemConfigData = systemConfigs.reduce((acc, item) => ({ ...acc, ...item }), {});

    const notificationPrefs: NotificationPreference[] = notifications.map((n) => {
      const meta = CHANNEL_LABELS[n.channel.toLowerCase()] ?? {
        label: n.channel,
        sub: `${n.channel} notifications`,
      };
      return {
        id: n.id,
        label: meta.label,
        sub: meta.sub,
        channel: n.channel,
        enabled: n.is_enabled,
      };
    });

    // If no notifications from API, use defaults
    if (notificationPrefs.length === 0) {
      notificationPrefs.push(
        { id: '1', label: 'Critical Alerts', sub: 'Immediate breach notifications', channel: 'email', enabled: true },
        { id: '2', label: 'Weekly Reports', sub: 'Summary of blocked threats', channel: 'email', enabled: true },
        { id: '3', label: 'System Health', sub: 'Downtime & maintenance', channel: 'slack', enabled: false }
      );
    }

    return {
      sensitivity: typeof merged.sensitivity === 'number' ? merged.sensitivity : 75,
      scanInterval: mapScanInterval(typeof merged.scan_interval === 'string' ? merged.scan_interval : undefined),
      retentionPolicy: mapRetentionPolicy(typeof merged.retention_policy === 'string' ? merged.retention_policy : undefined),
      notifications: notificationPrefs,
    };
  },

  saveConfiguration: async (config: ConfigurationState): Promise<void> => {
    await apiClient.put<unknown>('/api/config/system', {
      sensitivity: config.sensitivity,
      scan_interval: config.scanInterval,
      retention_policy: config.retentionPolicy,
    });

    // Update each notification channel
    for (const notif of config.notifications) {
      await apiClient.put<unknown>(`/api/config/notifications/${notif.channel}`, {
        is_enabled: notif.enabled,
      });
    }
  },
};
