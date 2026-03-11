import React from 'react';
import type { SecurityEvent } from '../types/events.types';

interface EventsTableProps {
  events: SecurityEvent[];
}

const SEVERITY_NODE_CLASSES: Record<string, string> = {
  high: 'bg-danger text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]',
  medium: 'bg-warning text-white',
  low: 'bg-slate-700 text-slate-300',
};

const SEVERITY_BADGE_CLASSES: Record<string, string> = {
  high: 'bg-danger/10 text-danger border-danger/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

/**
 * EventsTable (Timeline view)
 *
 * Renders security events as a chronological vertical timeline with
 * severity-coded nodes, event type badges, and source labels.
 */
const EventsTable: React.FC<EventsTableProps> = ({ events }) => (
  <div className="relative flex flex-col gap-0 pb-12">
    {/* Vertical timeline line */}
    <div className="absolute left-8 md:left-24 top-4 bottom-0 w-px bg-border-dark"></div>

    {events.map((event) => (
      <div key={event.id} className="relative flex group">
        {/* Date & time (desktop) */}
        <div className="hidden md:flex flex-col items-end w-24 pr-6 pt-5 text-right flex-shrink-0">
          <span className="text-sm font-bold text-white tracking-tight">{event.time}</span>
          <span className="text-xs text-slate-500 font-mono">{event.date}</span>
        </div>

        {/* Timeline node */}
        <div className="absolute left-8 md:left-24 -translate-x-1/2 mt-6 flex-shrink-0 z-10">
          <div
            className={`h-8 w-8 rounded-full border-4 border-background-dark flex items-center justify-center ${SEVERITY_NODE_CLASSES[event.severity]}`}
          >
            <span className="material-symbols-outlined text-[16px]">{event.icon}</span>
          </div>
        </div>

        {/* Event card */}
        <div className="flex-1 pl-16 md:pl-8 py-3">
          <div className="bg-surface-dark border border-border-dark rounded-xl p-4 hover:border-primary/50 hover:bg-card-dark transition-all duration-200 group-hover:translate-x-1">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${SEVERITY_BADGE_CLASSES[event.severity]}`}
                >
                  {event.type}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">dns</span>
                  {event.source}
                </span>
                <span className="md:hidden text-xs text-slate-500 ml-auto">
                  {event.date} {event.time}
                </span>
              </div>
              <button className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white">
                <span className="material-symbols-outlined text-[20px]">open_in_new</span>
              </button>
            </div>
            <h3 className="text-white font-semibold text-lg">{event.title}</h3>
            <p className="text-slate-400 text-sm mt-1 leading-relaxed">{event.desc}</p>
          </div>
        </div>
      </div>
    ))}

    {/* Load more */}
    <div className="ml-16 md:ml-24 pl-8 mt-4">
      <button className="px-6 py-2 rounded-lg border border-border-dark text-slate-400 text-sm hover:bg-surface-dark hover:text-white transition-colors w-full border-dashed">
        Load Older Events
      </button>
    </div>
  </div>
);

export default EventsTable;
