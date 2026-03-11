import type { ConfigurationState } from '../types/configuration.types';

/**
 * configurationService
 *
 * API layer for reading and persisting system configuration.
 */
export const configurationService = {
  getConfiguration: async (): Promise<ConfigurationState> => {
    // TODO: GET /api/configuration
    return {
      sensitivity: 75,
      scanInterval: 'Hourly Batches',
      retentionPolicy: '90 Days',
      notifications: [
        { label: 'Critical Alerts', sub: 'Immediate breach notifications', enabled: true },
        { label: 'Weekly Reports', sub: 'Summary of blocked threats', enabled: true },
        { label: 'System Health', sub: 'Downtime & maintenance', enabled: false },
      ],
    };
  },

  saveConfiguration: async (_config: ConfigurationState): Promise<void> => {
    // TODO: PUT /api/configuration
    await new Promise((resolve) => setTimeout(resolve, 400));
  },
};
