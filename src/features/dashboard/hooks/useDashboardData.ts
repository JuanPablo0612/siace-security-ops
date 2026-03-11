import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';
import type {
  DashboardMetrics,
  WeeklyThreatDataPoint,
  RecentAlert,
  ComponentStatus,
  QuickAction,
} from '../types/dashboard.types';

interface DashboardData {
  metrics: DashboardMetrics | null;
  weeklyThreatData: WeeklyThreatDataPoint[];
  recentAlerts: RecentAlert[];
  componentStatuses: ComponentStatus[];
  quickActions: QuickAction[];
  timeRange: string;
  isLoading: boolean;
  setTimeRange: (range: string) => void;
}

/**
 * useDashboardData
 *
 * Owns all business logic and data fetching for the Dashboard feature.
 * Exposes structured data to page and component consumers.
 */
export function useDashboardData(): DashboardData {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [weeklyThreatData, setWeeklyThreatData] = useState<WeeklyThreatDataPoint[]>([]);
  const [recentAlerts, setRecentAlerts] = useState<RecentAlert[]>([]);
  const [componentStatuses, setComponentStatuses] = useState<ComponentStatus[]>([]);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadAll = async () => {
      setIsLoading(true);
      const [m, w, ra, cs, qa] = await Promise.all([
        dashboardService.getMetrics(),
        dashboardService.getWeeklyThreatData(),
        dashboardService.getRecentAlerts(),
        dashboardService.getComponentStatuses(),
        dashboardService.getQuickActions(),
      ]);
      if (cancelled) return;
      setMetrics(m);
      setWeeklyThreatData(w);
      setRecentAlerts(ra);
      setComponentStatuses(cs);
      setQuickActions(qa);
      setIsLoading(false);
    };

    loadAll();
    return () => { cancelled = true; };
  }, []);

  return {
    metrics,
    weeklyThreatData,
    recentAlerts,
    componentStatuses,
    quickActions,
    timeRange,
    isLoading,
    setTimeRange,
  };
}
