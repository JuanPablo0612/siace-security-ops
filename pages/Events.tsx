import React, { useState } from 'react';

const eventsData = [
  { id: 1, time: '14:42:05', date: 'Oct 24', type: 'Network', icon: 'router', title: 'Firewall Rule Triggered', desc: 'Inbound connection blocked from blacklisted IP range (China/CN).', severity: 'medium', source: 'Firewall-01' },
  { id: 2, time: '14:30:12', date: 'Oct 24', type: 'Auth', icon: 'vpn_key', title: 'Privileged Access Granted', desc: 'User "admin_sys" accessed "Production-DB" via SSH.', severity: 'low', source: 'Auth-Svc' },
  { id: 3, time: '13:15:00', date: 'Oct 24', type: 'System', icon: 'system_update', title: 'Automated Patch Applied', desc: 'Security patch KB40922 applied to Server-Cluster-A.', severity: 'low', source: 'Update-Mgr' },
  { id: 4, time: '11:20:45', date: 'Oct 24', type: 'Threat', icon: 'bug_report', title: 'Malware Signature Detected', desc: 'Heuristic scan identified suspicious payload in uploaded file "invoice.pdf.exe".', severity: 'high', source: 'Anti-Malware' },
  { id: 5, time: '09:05:11', date: 'Oct 24', type: 'Network', icon: 'lan', title: 'Unusual Outbound Traffic', desc: 'Spike in outbound UDP traffic detected on non-standard ports.', severity: 'medium', source: 'Net-Flow' },
  { id: 6, time: '23:10:05', date: 'Oct 23', type: 'Auth', icon: 'lock_person', title: 'Failed Login Attempt', desc: '5 failed login attempts detected for user "jdoe" within 1 minute.', severity: 'medium', source: 'Auth-Svc' },
  { id: 7, time: '18:00:00', date: 'Oct 23', type: 'System', icon: 'backup', title: 'Daily Backup Completed', desc: 'Full database backup successfully stored in S3 Bucket.', severity: 'low', source: 'Backup-Job' },
];

const Events: React.FC = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 h-full">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Security Event Log</h1>
          <p className="text-slate-400 mt-1">Chronological timeline of all system activities and security incidents.</p>
        </div>
        <div className="flex items-center gap-3 bg-card-dark border border-border-dark p-1 rounded-lg">
          {['All', 'Threat', 'Network', 'Auth', 'System'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                filter === type 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative flex flex-col gap-0 pb-12">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-24 top-4 bottom-0 w-px bg-border-dark"></div>

        {eventsData.map((event, index) => (
          <div key={event.id} className="relative flex group">
            
            {/* Date/Time (Desktop) */}
            <div className="hidden md:flex flex-col items-end w-24 pr-6 pt-5 text-right flex-shrink-0">
              <span className="text-sm font-bold text-white tracking-tight">{event.time}</span>
              <span className="text-xs text-slate-500 font-mono">{event.date}</span>
            </div>

            {/* Timeline Node */}
            <div className="absolute left-8 md:left-24 -translate-x-1/2 mt-6 flex-shrink-0 z-10">
              <div className={`h-8 w-8 rounded-full border-4 border-background-dark flex items-center justify-center ${
                event.severity === 'high' ? 'bg-danger text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 
                event.severity === 'medium' ? 'bg-warning text-white' : 
                'bg-slate-700 text-slate-300'
              }`}>
                <span className="material-symbols-outlined text-[16px]">{event.icon}</span>
              </div>
            </div>

            {/* Card */}
            <div className="flex-1 pl-16 md:pl-8 py-3">
              <div className="bg-surface-dark border border-border-dark rounded-xl p-4 hover:border-primary/50 hover:bg-card-dark transition-all duration-200 group-hover:translate-x-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${
                       event.severity === 'high' ? 'bg-danger/10 text-danger border-danger/20' : 
                       event.severity === 'medium' ? 'bg-warning/10 text-warning border-warning/20' : 
                       'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {event.type}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">dns</span> {event.source}
                    </span>
                    {/* Mobile Time display */}
                    <span className="md:hidden text-xs text-slate-500 ml-auto">{event.date} {event.time}</span>
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
        
        {/* Load More */}
        <div className="ml-16 md:ml-24 pl-8 mt-4">
          <button className="px-6 py-2 rounded-lg border border-border-dark text-slate-400 text-sm hover:bg-surface-dark hover:text-white transition-colors w-full border-dashed">
            Load Older Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;