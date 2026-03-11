import { useState, useEffect } from 'react';
import { alertsService } from '../services/alertsService';
import type { Alert, AlertFilters, AlertStats } from '../types/alerts.types';

interface UseAlertsResult {
  alerts: Alert[];
  stats: AlertStats | null;
  filters: AlertFilters;
  isLoading: boolean;
  setFilters: (f: AlertFilters) => void;
}

/**
 * useAlerts
 *
 * Owns all business logic for the Alerts feature:
 * fetches alerts + stats, manages filter state.
 */
export function useAlerts(): UseAlertsResult {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [stats, setStats] = useState<AlertStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<AlertFilters>({
    search: '',
    severity: 'all',
    status: 'all',
    dateRange: 'Last 24 Hours',
  });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      const [data, statsData] = await Promise.all([
        alertsService.getAlerts(),
        alertsService.getStats(),
      ]);
      if (cancelled) return;
      setAlerts(data);
      setStats(statsData);
      setIsLoading(false);
    };
    load();
    return () => { cancelled = true; };
  }, []);

  return { alerts, stats, filters, isLoading, setFilters };
}
