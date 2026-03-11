import React from 'react';

type BadgeColor = 'success' | 'danger' | 'warning' | 'info' | 'primary' | 'neutral';

interface BadgeProps {
  label: string;
  color?: BadgeColor;
  dot?: boolean;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  success: 'bg-green-500/10 text-green-400 border-green-500/20',
  danger: 'bg-red-500/10 text-red-400 border-red-500/20',
  warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  primary: 'bg-primary/10 text-primary border-primary/20',
  neutral: 'bg-slate-700/50 text-slate-300 border-slate-600/20',
};

const dotColorClasses: Record<BadgeColor, string> = {
  success: 'bg-green-400',
  danger: 'bg-red-400',
  warning: 'bg-yellow-500',
  info: 'bg-blue-400',
  primary: 'bg-primary',
  neutral: 'bg-slate-400',
};

/**
 * Badge
 *
 * Reusable status / label badge with optional colour dot.
 * Uses semantic colour tokens that map to the SIACE design system.
 */
const Badge: React.FC<BadgeProps> = ({ label, color = 'neutral', dot = false, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${colorClasses[color]} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColorClasses[color]}`} />}
      {label}
    </span>
  );
};

export default Badge;
export type { BadgeColor, BadgeProps };
