import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';
import type {
  DashboardMetrics,
  WeeklyThreatDataPoint,
  RecentAlert,
  ComponentStatus,
  QuickAction,
} from '../types/dashboard.types';

const QUICK_ACTIONS: QuickAction[] = [
  { icon: 'add_moderator', label: 'Run Scan' },
  { icon: 'summarize', label: 'Export Log' },
  { icon: 'person_add', label: 'Add User' },
  { icon: 'settings_applications', label: 'Config' },
];

interface DashboardData {
  metrics: DashboardMetrics | null;
  weeklyThreatData: WeeklyThreatDataPoint[];
  recentAlerts: RecentAlert[];
  componentStatuses: ComponentStatus[];
  quickActions: QuickAction[];
  timeRange: string;
  isLoading: boolean;
  error: string | null;
  setTimeRange: (range: string) => void;
}

export function useDashboardData(): DashboardData {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [weeklyThreatData, setWeeklyThreatData] = useState<WeeklyThreatDataPoint[]>([]);
  const [recentAlerts, setRecentAlerts] = useState<RecentAlert[]>([]);
  const [componentStatuses, setComponentStatuses] = useState<ComponentStatus[]>([]);
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadAll = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [m, w, ra, cs] = await Promise.all([
          dashboardService.getMetrics(),
          dashboardService.getWeeklyThreatData(),
          dashboardService.getRecentAlerts(),
          dashboardService.getComponentStatuses(),
        ]);
        if (cancelled) return;
        setMetrics(m);
        setWeeklyThreatData(w);
        setRecentAlerts(ra);
        setComponentStatuses(cs);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadAll();
    return () => { cancelled = true; };
  }, []);

  return {
    metrics,
    weeklyThreatData,
    recentAlerts,
    componentStatuses,
    quickActions: QUICK_ACTIONS,
    timeRange,
    isLoading,
    error,
    setTimeRange,
  };
}
