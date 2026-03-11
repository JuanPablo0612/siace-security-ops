import React from 'react';
import { useEvents } from '../hooks/useEvents';
import EventFilters from '../components/EventFilters';
import EventsTable from '../components/EventsTable';

/**
 * EventsPage
 *
 * Lightweight page: connects useEvents hook and composes EventFilters
 * and EventsTable. Contains no business logic.
 */
const EventsPage: React.FC = () => {
  const { filteredEvents, filters, setTypeFilter } = useEvents();

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 h-full">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Security Event Log</h1>
          <p className="text-slate-400 mt-1">
            Chronological timeline of all system activities and security incidents.
          </p>
        </div>
        <EventFilters activeType={filters.activeType} onTypeChange={setTypeFilter} />
      </div>

      <EventsTable events={filteredEvents} />
    </div>
  );
};

export default EventsPage;
