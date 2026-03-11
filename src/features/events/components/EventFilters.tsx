import React from 'react';
import type { EventType } from '../types/events.types';

const EVENT_TYPES: EventType[] = ['All', 'Threat', 'Network', 'Auth', 'System'];

interface EventFiltersProps {
  activeType: EventType;
  onTypeChange: (type: EventType) => void;
}

/**
 * EventFilters
 *
 * Tab-style filter bar that lets the user narrow down the security
 * event timeline by event category.
 */
const EventFilters: React.FC<EventFiltersProps> = ({ activeType, onTypeChange }) => (
  <div className="flex items-center gap-3 bg-card-dark border border-border-dark p-1 rounded-lg">
    {EVENT_TYPES.map((type) => (
      <button
        key={type}
        onClick={() => onTypeChange(type)}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
          activeType === type
            ? 'bg-primary text-white shadow-sm'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`}
      >
        {type}
      </button>
    ))}
  </div>
);

export default EventFilters;
