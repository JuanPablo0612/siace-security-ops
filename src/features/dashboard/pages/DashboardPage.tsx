import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useDashboardData } from '../hooks/useDashboardData';
import RiskGauge from '../components/RiskGauge';
import MetricsCards from '../components/MetricsCards';
import WeeklyTrendChart from '../components/WeeklyTrendChart';
import RecentAlertsTable from '../components/RecentAlertsTable';
import type { MetricCardData } from '../types/dashboard.types';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    metrics,
    weeklyThreatData,
    recentAlerts,
    componentStatuses,
    quickActions,
    timeRange,
    isLoading,
    error,
    setTimeRange,
  } = useDashboardData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
        Loading dashboard…
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="flex items-center justify-center h-40 text-red-400 text-sm">
        {error ?? 'Failed to load dashboard data'}
      </div>
    );
  }

  const metricCards: MetricCardData[] = [
    {
      icon: 'shield',
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/10',
      trendIcon: 'trending_up',
      trendColor: 'text-success',
      trendValue: String(metrics.totalAlerts),
      title: 'Total Alerts',
      value: metrics.totalAlerts.toLocaleString(),
    },
    {
      icon: 'gpp_maybe',
      iconColor: 'text-red-400',
      iconBg: 'bg-red-500/10',
      trendIcon: 'priority_high',
      trendColor: 'text-danger',
      trendValue: String(metrics.criticalCount),
      title: 'Critical Threats',
      value: String(metrics.criticalCount),
    },
    {
      icon: 'policy',
      iconColor: 'text-orange-400',
      iconBg: 'bg-orange-500/10',
      trendColor: 'text-warning',
      trendText: 'Open',
      title: 'Open Incidents',
      value: String(metrics.openIncidents),
    },
    {
      icon: 'speed',
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10',
      trendIcon: 'arrow_downward',
      trendColor: 'text-success',
      trendValue: '-5%',
      title: 'Avg Response Time',
      value: `${metrics.avgResponseTimeMs}ms`,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl flex flex-col gap-6">
      {/* Top: Risk gauge + metric cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RiskGauge
          score={metrics.riskScore}
          grade={metrics.riskLevel}
          lastScan="Live"
        />
        <MetricsCards cards={metricCards} />
      </div>

      {/* Middle: Chart + recent alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <WeeklyTrendChart
          data={weeklyThreatData}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
        <RecentAlertsTable
          alerts={recentAlerts}
          onViewAll={() => navigate(ROUTES.ALERTS)}
        />
      </div>

      {/* Bottom: Component status + quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
        {/* Component status */}
        <div className="rounded-xl border border-border-dark bg-card-dark p-6">
          <h3 className="text-base font-semibold text-white mb-4">Component Status</h3>
          {componentStatuses.length === 0 ? (
            <p className="text-slate-400 text-sm">No services available</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {componentStatuses.map((comp, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-background-dark border border-border-dark"
                >
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-${comp.color}-500`}>
                      {comp.icon}
                    </span>
                    <span className="text-sm font-medium text-slate-300 truncate">{comp.label}</span>
                  </div>
                  <span className={`h-2 w-2 flex-shrink-0 rounded-full ${comp.statusClass}`}></span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="rounded-xl border border-border-dark bg-card-dark p-6">
          <h3 className="text-base font-semibold text-white mb-4">Quick Actions</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {quickActions.map((action, i) => (
              <button
                key={i}
                className="flex flex-col items-center justify-center gap-2 min-w-[100px] h-[100px] rounded-xl bg-background-dark border border-border-dark hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-3xl">
                  {action.icon}
                </span>
                <span className="text-xs font-medium text-slate-400 group-hover:text-white">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
