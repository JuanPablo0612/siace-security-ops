import { useState, useEffect } from 'react';
import { systemHealthService } from '../services/systemHealthService';
import type { ComponentHealth, SystemMetric, SystemLogEntry } from '../types/system-health.types';

interface UseSystemHealthResult {
  metrics: SystemMetric[];
  components: ComponentHealth[];
  logs: SystemLogEntry[];
  isLoading: boolean;
}

/**
 * useSystemHealth
 *
 * Fetches all infrastructure health data in parallel and exposes
 * a unified loading state to the page.
 */
export function useSystemHealth(): UseSystemHealthResult {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [components, setComponents] = useState<ComponentHealth[]>([]);
  const [logs, setLogs] = useState<SystemLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      systemHealthService.getMetrics(),
      systemHealthService.getComponentStatuses(),
      systemHealthService.getSystemLogs(),
    ]).then(([m, c, l]) => {
      setMetrics(m);
      setComponents(c);
      setLogs(l);
      setIsLoading(false);
    });
  }, []);

  return { metrics, components, logs, isLoading };
}
