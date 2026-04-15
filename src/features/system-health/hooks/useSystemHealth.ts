import { useState, useEffect } from 'react';
import { systemHealthService } from '../services/systemHealthService';
import type { ComponentHealth, SystemMetric, SystemLogEntry } from '../types/system-health.types';

interface UseSystemHealthResult {
  metrics: SystemMetric[];
  components: ComponentHealth[];
  logs: SystemLogEntry[];
  isLoading: boolean;
  error: string | null;
}

export function useSystemHealth(): UseSystemHealthResult {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [components, setComponents] = useState<ComponentHealth[]>([]);
  const [logs, setLogs] = useState<SystemLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [m, c, l] = await Promise.all([
          systemHealthService.getMetrics(),
          systemHealthService.getComponentStatuses(),
          systemHealthService.getSystemLogs(),
        ]);
        if (cancelled) return;
        setMetrics(m);
        setComponents(c);
        setLogs(l);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load health data');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  return { metrics, components, logs, isLoading, error };
}
