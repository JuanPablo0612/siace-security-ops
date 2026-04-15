import { useState, useEffect, useCallback } from 'react';
import { eventsService } from '../services/eventsService';
import type { SecurityEvent, EventFiltersState, EventType, EventListMeta } from '../types/events.types';

interface UseEventsResult {
  events: SecurityEvent[];
  meta: EventListMeta | null;
  filters: EventFiltersState;
  isLoading: boolean;
  error: string | null;
  setTypeFilter: (type: EventType) => void;
}

export function useEvents(): UseEventsResult {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [meta, setMeta] = useState<EventListMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EventFiltersState>({ activeType: 'All' });

  const load = useCallback(async (cancelled: { value: boolean }) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await eventsService.getEvents(
        filters.activeType !== 'All' ? filters.activeType : undefined
      );
      if (cancelled.value) return;
      setEvents(result.events);
      setMeta(result.meta);
    } catch (err) {
      if (!cancelled.value) {
        setError(err instanceof Error ? err.message : 'Failed to load events');
      }
    } finally {
      if (!cancelled.value) setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const cancelled = { value: false };
    load(cancelled);
    return () => { cancelled.value = true; };
  }, [load]);

  const setTypeFilter = (type: EventType) => setFilters({ activeType: type });

  return { events, meta, filters, isLoading, error, setTypeFilter };
}
