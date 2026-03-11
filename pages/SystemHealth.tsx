import React from 'react';

const SystemHealth: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-white">System Health Status</h1>
          <p className="text-slate-400 text-base font-normal leading-normal max-w-2xl">
            Real-time operational monitoring of SIACE AI Engine, Database Clusters, and API Gateways.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20 text-success text-sm font-medium">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
            </span>
            All Systems Operational
          </span>
          <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all">
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* High Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
            { label: 'System Uptime', value: '99.9%', sub: '0.1%', subIcon: 'arrow_upward', progress: '99.9%', color: 'success', icon: 'monitoring' },
            { label: 'Active AI Threats Blocked', value: '1,240', sub: '12%', subIcon: 'trending_up', multiBar: true, color: 'primary', icon: 'security' },
            { label: 'Last Execution', value: 'Just now', subText: 'Sync complete', color: 'success', icon: 'schedule' },
            { label: 'Avg. Latency', value: '45ms', sub: '2ms', subIcon: 'arrow_downward', progress: '35%', color: 'primary', icon: 'speed' },
        ].map((item, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl border border-border-dark bg-surface-dark p-5 shadow-sm group hover:border-primary/50 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-4xl text-primary">{item.icon}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-slate-400 text-sm font-medium">{item.label}</p>
                    <div className="flex items-end gap-2">
                        <p className="text-white text-2xl font-bold tracking-tight">{item.value}</p>
                        {item.sub && (
                            <span className={`text-success text-xs font-medium mb-1 flex items-center`}>
                                <span className="material-symbols-outlined text-[14px]">{item.subIcon}</span> {item.sub}
                            </span>
                        )}
                    </div>
                </div>
                {item.progress && (
                    <div className="mt-4 h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <div className={`h-full bg-${item.color === 'success' ? 'green-500' : 'blue-500'} rounded-full`} style={{ width: item.progress }}></div>
                    </div>
                )}
                {item.multiBar && (
                    <div className="mt-4 flex gap-0.5">
                        {[20, 40, 60, 80, 100].map(op => <div key={op} className={`h-1.5 w-1 flex-1 bg-primary rounded-sm`} style={{ opacity: op/100 }}></div>)}
                    </div>
                )}
                {item.subText && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                        <span className="h-2 w-2 rounded-full bg-success"></span> {item.subText}
                    </div>
                )}
            </div>
        ))}
      </div>

      {/* Component Status Grid */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">grid_view</span>
          Component Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'AI Neural Core', sub: 'Version 2.4.0 • Stable Release', icon: 'neurology', status: 'Active', load: '32%', uptime: '14d 2h', color: 'success' },
            { name: 'PostgreSQL Database', sub: 'High Connection Load Detected', icon: 'database', status: 'Warning', load: '89%', uptime: '45d 12h', color: 'warning' },
            { name: 'REST API Gateway', sub: '12ms Latency • 2.4k req/sec', icon: 'api', status: 'Active', region: 'US-East-1', health: 'Healthy', color: 'success' },
            { name: 'Auth Service', sub: 'OAuth 2.0 Provider • 99.99% Uptime', icon: 'lock', status: 'Active', tokens: '45k Active', ver: '1.2.1', color: 'success' },
            { name: 'Data Ingestion', sub: 'Streaming Kafka Pipelines', icon: 'input', status: 'Processing', tp: '1.2GB/s', lag: '2ms', color: 'blue', spin: true },
            { name: 'Log Aggregator', sub: 'Elasticsearch Cluster • Syncing', icon: 'receipt_long', status: 'Active', index: '4.5TB', nodes: '3', color: 'success' },
          ].map((comp, i) => (
            <div key={i} className={`flex flex-col gap-4 rounded-xl border ${comp.status === 'Warning' ? 'border-warning/50 bg-warning/5' : 'border-border-dark bg-surface-dark'} p-5 shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex justify-between items-start">
                <div className={`size-10 rounded-lg ${comp.status === 'Warning' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'} flex items-center justify-center`}>
                  <span className="material-symbols-outlined">{comp.icon}</span>
                </div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                    comp.color === 'success' ? 'bg-success/10 text-success border-success/20' : 
                    comp.color === 'warning' ? 'bg-warning/10 text-warning border-warning/20' : 
                    'bg-blue-500/10 text-blue-500 border-blue-500/20'
                }`}>
                  <span className={`material-symbols-outlined text-[14px] ${comp.spin ? 'animate-spin' : ''}`}>
                    {comp.status === 'Warning' ? 'warning' : comp.status === 'Processing' ? 'sync' : 'check_circle'}
                  </span>
                  {comp.status}
                </span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{comp.name}</h4>
                <p className="text-slate-400 text-sm mt-1">{comp.sub}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-700/50 flex justify-between text-xs font-medium">
                {comp.load && <span className={comp.status === 'Warning' ? 'text-warning' : 'text-slate-400'}>Load: {comp.load}</span>}
                {comp.uptime && <span className="text-slate-400">Uptime: {comp.uptime}</span>}
                {comp.region && <span className="text-slate-400">Region: {comp.region}</span>}
                {comp.health && <span className="text-slate-400">Status: {comp.health}</span>}
                {comp.tokens && <span className="text-slate-400">Tokens: {comp.tokens}</span>}
                {comp.ver && <span className="text-slate-400">Ver: {comp.ver}</span>}
                {comp.tp && <span className="text-slate-400">Throughput: {comp.tp}</span>}
                {comp.lag && <span className="text-slate-400">Lag: {comp.lag}</span>}
                {comp.index && <span className="text-slate-400">Index Size: {comp.index}</span>}
                {comp.nodes && <span className="text-slate-400">Nodes: {comp.nodes}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Logs */}
      <div className="rounded-xl border border-border-dark bg-surface-dark shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">terminal</span>
             System Event Log
          </h3>
          <button className="text-xs font-medium text-primary hover:text-primary/80">View Full Log</button>
        </div>
        <div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-slate-400 font-medium">
              <tr>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">Component</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-3 whitespace-nowrap font-mono text-xs">2023-10-24 14:32:01</td>
                <td className="px-6 py-3">AI Neural Core</td>
                <td className="px-6 py-3">Model retraining completed successfully.</td>
                <td className="px-6 py-3"><span className="text-success">Success</span></td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-3 whitespace-nowrap font-mono text-xs">2023-10-24 14:30:15</td>
                <td className="px-6 py-3">PostgreSQL Database</td>
                <td className="px-6 py-3">Connection pool utilization reached 85%.</td>
                <td className="px-6 py-3"><span className="text-warning">Warning</span></td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-3 whitespace-nowrap font-mono text-xs">2023-10-24 14:28:44</td>
                <td className="px-6 py-3">REST API Gateway</td>
                <td className="px-6 py-3">New scaling group initialized in us-east-1.</td>
                <td className="px-6 py-3"><span className="text-blue-400">Info</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;