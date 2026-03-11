import React from 'react';
import { useConfiguration } from '../hooks/useConfiguration';
import SensitivitySlider from '../components/SensitivitySlider';
import NotificationSettings from '../components/NotificationSettings';
import type { ConfigurationState } from '../types/configuration.types';

/**
 * ConfigurationPage
 *
 * Lightweight page: connects useConfiguration hook and composes
 * SensitivitySlider, AnalysisFrequency settings, and NotificationSettings.
 */
const ConfigurationPage: React.FC = () => {
  const {
    config,
    isDirty,
    isSaving,
    setSensitivity,
    setScanInterval,
    setRetentionPolicy,
    toggleNotification,
    save,
    resetDefaults,
  } = useConfiguration();

  if (!config) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
        Loading configuration…
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-[1400px] mx-auto w-full">
      {/* Header */}
      <div className="w-full mb-8">
        <nav className="flex mb-4 text-sm font-medium text-slate-400">
          <span className="hover:text-primary transition-colors cursor-pointer">Home</span>
          <span className="mx-2 text-slate-600">/</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Settings</span>
          <span className="mx-2 text-slate-600">/</span>
          <span className="text-white">System Configuration</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              System Configuration
            </h1>
            <p className="text-slate-400 text-base max-w-2xl">
              Manage your AI detection parameters, analysis frequency, and system alert preferences.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={resetDefaults}
              disabled={!isDirty}
              className="px-4 py-2.5 rounded-lg border border-border-dark text-slate-400 hover:text-white hover:bg-border-dark transition-colors font-medium text-sm disabled:opacity-40"
            >
              Reset Defaults
            </button>
            <button
              onClick={save}
              disabled={!isDirty || isSaving}
              className="px-4 py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-900/20 transition-all font-medium text-sm flex items-center gap-2 disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              {isSaving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AI settings */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <SensitivitySlider value={config.sensitivity} onChange={setSensitivity} />

          {/* Analysis frequency card */}
          <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-xl shadow-black/20">
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-4">
                <div className="p-3 bg-primary/10 rounded-lg h-fit text-primary">
                  <span className="material-symbols-outlined">query_stats</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold">Analysis Frequency</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Define how often the Deep Scan engine analyzes your network traffic patterns.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Scan Interval
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-background-dark border border-border-dark text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-3 pr-10 appearance-none cursor-pointer"
                    value={config.scanInterval}
                    onChange={(e) =>
                      setScanInterval(e.target.value as ConfigurationState['scanInterval'])
                    }
                  >
                    {(['Real-time (High Load)', 'Hourly Batches', 'Every 6 Hours', 'Daily Midnight Scan'] as const).map(
                      (opt) => (
                        <option key={opt}>{opt}</option>
                      )
                    )}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Retention Policy
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-background-dark border border-border-dark text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-3 pr-10 appearance-none cursor-pointer"
                    value={config.retentionPolicy}
                    onChange={(e) =>
                      setRetentionPolicy(e.target.value as ConfigurationState['retentionPolicy'])
                    }
                  >
                    {(['30 Days', '90 Days', '1 Year', 'Indefinite (S3 Archive)'] as const).map(
                      (opt) => (
                        <option key={opt}>{opt}</option>
                      )
                    )}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-200 text-sm">
              <span className="material-symbols-outlined text-blue-400">info</span>
              <span>
                Changing scan interval to 'Real-time' may impact system performance by up to 15%.
              </span>
            </div>
          </div>
        </div>

        {/* Right: Notifications + health */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <NotificationSettings
            preferences={config.notifications}
            onToggle={toggleNotification}
          />

          <div className="bg-gradient-to-br from-primary/20 to-purple-600/10 rounded-xl border border-primary/20 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary animate-pulse">
              <span className="material-symbols-outlined text-[32px]">security</span>
            </div>
            <h3 className="text-white font-bold text-lg">System Secure</h3>
            <p className="text-slate-400 text-xs mt-2 mb-4">
              Your configuration is optimized for enterprise environments.
            </p>
            <div className="w-full bg-background-dark/50 rounded-full h-2 mb-1">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${config.sensitivity}%` }}
              ></div>
            </div>
            <span className="text-xs text-primary font-bold">{config.sensitivity}% Health Score</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPage;
