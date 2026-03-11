import { useState, useEffect } from 'react';
import { eventsService } from '../services/eventsService';
import type { SecurityEvent, EventFiltersState, EventType } from '../types/events.types';

interface UseEventsResult {
  events: SecurityEvent[];
  filteredEvents: SecurityEvent[];
  filters: EventFiltersState;
  isLoading: boolean;
  setTypeFilter: (type: EventType) => void;
}

/**
 * useEvents
 *
 * Fetches security events and manages the active type filter.
 * Derived filteredEvents list is computed here — pages only consume results.
 */
export function useEvents(): UseEventsResult {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<EventFiltersState>({ activeType: 'All' });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      const data = await eventsService.getEvents();
      if (cancelled) return;
      setEvents(data);
      setIsLoading(false);
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const filteredEvents =
    filters.activeType === 'All'
      ? events
      : events.filter((e) => e.type === filters.activeType);

  const setTypeFilter = (type: EventType) =>
    setFilters({ activeType: type });

  return { events, filteredEvents, filters, isLoading, setTypeFilter };
}
