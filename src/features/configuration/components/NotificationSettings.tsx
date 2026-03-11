import React from 'react';
import type { NotificationPreference } from '../types/configuration.types';

interface NotificationSettingsProps {
  preferences: NotificationPreference[];
  onToggle: (index: number) => void;
}

const CHANNELS = [
  { icon: 'mail', label: 'Email' },
  { icon: 'smartphone', label: 'Push (Mobile)' },
  { icon: 'webhook', label: 'Slack Webhook' },
];

/**
 * NotificationSettings
 *
 * Toggle panel for notification preferences and channel configuration.
 */
const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  preferences,
  onToggle,
}) => (
  <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-xl shadow-black/20 h-full">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-primary/10 rounded-lg text-primary">
        <span className="material-symbols-outlined">notifications_active</span>
      </div>
      <h3 className="text-white text-lg font-semibold">Notification Preferences</h3>
    </div>

    <div className="space-y-6">
      {preferences.map((item, idx) => (
        <div key={idx} className="flex items-center justify-between group">
          <div className="flex flex-col">
            <span className="text-white font-medium text-sm">{item.label}</span>
            <span className="text-slate-400 text-xs">{item.sub}</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={item.enabled}
              onChange={() => onToggle(idx)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      ))}

      <hr className="border-border-dark my-4" />
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Channels</h4>

      {CHANNELS.map((ch, idx) => (
        <div key={idx} className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400 text-[20px]">{ch.icon}</span>
            <span className="text-white text-sm">{ch.label}</span>
          </div>
          <span className="text-primary text-xs font-bold cursor-pointer hover:text-white transition-colors">
            Configure
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default NotificationSettings;
