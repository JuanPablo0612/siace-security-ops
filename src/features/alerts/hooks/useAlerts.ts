import { useState, useEffect, useCallback } from 'react';
import { alertsService } from '../services/alertsService';
import type { Alert, AlertFilters, AlertListMeta } from '../types/alerts.types';

interface UseAlertsResult {
  alerts: Alert[];
  meta: AlertListMeta | null;
  filters: AlertFilters;
  isLoading: boolean;
  error: string | null;
  page: number;
  setFilters: (f: AlertFilters) => void;
  setPage: (p: number) => void;
}

export function useAlerts(): UseAlertsResult {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [meta, setMeta] = useState<AlertListMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<AlertFilters>({
    search: '',
    severity: 'all',
    status: 'all',
    dateRange: 'Last 24 Hours',
  });

  const load = useCallback(async (cancelled: { value: boolean }) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await alertsService.getAlerts(filters, page);
      if (cancelled.value) return;
      setAlerts(result.alerts);
      setMeta(result.meta);
    } catch (err) {
      if (!cancelled.value) {
        setError(err instanceof Error ? err.message : 'Failed to load alerts');
      }
    } finally {
      if (!cancelled.value) setIsLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    const cancelled = { value: false };
    load(cancelled);
    return () => { cancelled.value = true; };
  }, [load]);

  const handleSetFilters = (f: AlertFilters) => {
    setPage(1);
    setFilters(f);
  };

  return { alerts, meta, filters, isLoading, error, page, setFilters: handleSetFilters, setPage };
}
