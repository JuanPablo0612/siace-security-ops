import React from 'react';
import type { MetricCardData } from '../types/dashboard.types';

interface MetricsCardsProps {
  cards: MetricCardData[];
}

/** Single metric tile */
const MetricCard: React.FC<MetricCardData> = ({
  icon,
  iconColor,
  iconBg,
  trendIcon,
  trendColor,
  trendValue,
  trendText,
  title,
  value,
}) => (
  <div className="rounded-xl border border-border-dark bg-card-dark p-5 hover:border-slate-700 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      {(trendIcon || trendText) && (
        <span className={`text-xs font-semibold ${trendColor} flex items-center gap-1`}>
          {trendIcon && (
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
              {trendIcon}
            </span>
          )}
          {trendValue ?? trendText}
        </span>
      )}
    </div>
    <h4 className="text-slate-400 text-sm font-medium">{title}</h4>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

/**
 * MetricsCards
 *
 * Renders a 2×2 grid of quick-stat tiles for the Dashboard overview.
 */
const MetricsCards: React.FC<MetricsCardsProps> = ({ cards }) => (
  <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
    {cards.map((card, i) => (
      <MetricCard key={i} {...card} />
    ))}
  </div>
);

export default MetricsCards;
