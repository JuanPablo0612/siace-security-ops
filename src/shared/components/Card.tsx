import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Renders a title bar above the content */
  title?: string;
  /** Optional action element rendered in the title bar (e.g. a button) */
  action?: React.ReactNode;
  /** Apply a subtle glowing highlight on hover */
  hover?: boolean;
}

/**
 * Card
 *
 * Reusable surface container that matches the SIACE dark-theme card
 * design. Accepts an optional title bar with a custom action slot.
 */
const Card: React.FC<CardProps> = ({ children, className = '', title, action, hover = false }) => {
  return (
    <div
      className={`rounded-xl border border-border-dark bg-card-dark shadow-sm ${hover ? 'hover:border-slate-700 transition-colors' : ''} ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-border-dark px-5 py-4">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={title ? 'p-5' : 'p-5'}>{children}</div>
    </div>
  );
};

export default Card;
