import { useState, useEffect } from 'react';
import { configurationService } from '../services/configurationService';
import type { ConfigurationState, NotificationPreference } from '../types/configuration.types';

interface UseConfigurationResult {
  config: ConfigurationState | null;
  isDirty: boolean;
  isSaving: boolean;
  setSensitivity: (v: number) => void;
  setScanInterval: (v: ConfigurationState['scanInterval']) => void;
  setRetentionPolicy: (v: ConfigurationState['retentionPolicy']) => void;
  toggleNotification: (index: number) => void;
  save: () => Promise<void>;
  resetDefaults: () => void;
}

/**
 * useConfiguration
 *
 * Fetches the current configuration and owns all mutation logic
 * (sensitivity, scan interval, retention, notifications).
 */
export function useConfiguration(): UseConfigurationResult {
  const [config, setConfig] = useState<ConfigurationState | null>(null);
  const [originalConfig, setOriginalConfig] = useState<ConfigurationState | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    configurationService.getConfiguration().then((data) => {
      setConfig(data);
      setOriginalConfig(data);
    });
  }, []);

  const isDirty = JSON.stringify(config) !== JSON.stringify(originalConfig);

  const patch = (partial: Partial<ConfigurationState>) =>
    setConfig((prev) => (prev ? { ...prev, ...partial } : prev));

  const toggleNotification = (index: number) => {
    if (!config) return;
    const updated: NotificationPreference[] = config.notifications.map((n, i) =>
      i === index ? { ...n, enabled: !n.enabled } : n
    );
    patch({ notifications: updated });
  };

  const save = async () => {
    if (!config) return;
    setIsSaving(true);
    try {
      await configurationService.saveConfiguration(config);
      setOriginalConfig(config);
    } finally {
      setIsSaving(false);
    }
  };

  const resetDefaults = () => setConfig(originalConfig);

  return {
    config,
    isDirty,
    isSaving,
    setSensitivity: (v) => patch({ sensitivity: v }),
    setScanInterval: (v) => patch({ scanInterval: v }),
    setRetentionPolicy: (v) => patch({ retentionPolicy: v }),
    toggleNotification,
    save,
    resetDefaults,
  };
}
