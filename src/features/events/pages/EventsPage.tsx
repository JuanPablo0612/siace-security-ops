import React from 'react';
import { useEvents } from '../hooks/useEvents';
import EventFilters from '../components/EventFilters';
import EventsTable from '../components/EventsTable';

const EventsPage: React.FC = () => {
  const { events, meta, filters, isLoading, error, setTypeFilter } = useEvents();

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 h-full">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Security Event Log</h1>
          <p className="text-slate-400 mt-1">
            Chronological timeline of all system activities and security incidents.
            {meta && <span className="ml-2 text-primary font-medium">{meta.total.toLocaleString()} total events</span>}
          </p>
        </div>
        <EventFilters activeType={filters.activeType} onTypeChange={setTypeFilter} />
      </div>

      {error ? (
        <div className="flex items-center justify-center h-40 text-red-400 text-sm">{error}</div>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
          Loading events…
        </div>
      ) : (
        <EventsTable events={events} />
      )}
    </div>
  );
};

export default EventsPage;
