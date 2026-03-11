import React from 'react';
import { useNavigate } from 'react-router-dom';

const alertsData = [
  { id: '#ALT-2023-849', time: 'Oct 24, 09:41:22', ip: '45.33.22.11', type: 'SQL Injection Attempt', score: 92, severity: 'Critical', status: 'Open', color: 'danger' },
  { id: '#ALT-2023-848', time: 'Oct 24, 09:38:15', ip: '192.168.4.22', type: 'Suspicious Login Failure', score: 78, severity: 'High', status: 'Investigating', color: 'warning' },
  { id: '#ALT-2023-845', time: 'Oct 24, 09:12:05', ip: '10.0.0.55', type: 'Port Scan Detected', score: 55, severity: 'Medium', status: 'Resolved', color: 'yellow' },
  { id: '#ALT-2023-842', time: 'Oct 24, 08:55:41', ip: '172.16.254.1', type: 'Unusual Outbound Traffic', score: 35, severity: 'Low', status: 'Open', color: 'blue' },
  { id: '#ALT-2023-839', time: 'Oct 24, 08:30:11', ip: '89.201.12.4', type: 'Malware Signature Match', score: 98, severity: 'Critical', status: 'Investigating', color: 'danger' },
  { id: '#ALT-2023-830', time: 'Oct 24, 07:15:29', ip: '192.168.1.105', type: 'Privilege Escalation', score: 82, severity: 'High', status: 'Open', color: 'warning' },
];

const Alerts: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
             {/* Title handled by Global Header for cleaner route logic, but adding stats here */}
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-dark text-slate-400 hover:text-white hover:bg-surface-dark transition-colors text-sm font-medium">
                <span className="material-symbols-outlined text-[20px]">download</span>
                Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all">
                <span className="material-symbols-outlined text-[20px]">radar</span>
                New Scan
            </button>
          </div>
        </div>

        {/* Stats Cards (Mini) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
           <StatCard label="Total Alerts" value="1,248" badge="+12%" badgeColor="success" borderColor="border-border-dark" />
           <StatCard label="Critical Threats" value="42" badge="+5%" badgeColor="danger" borderColor="border-danger/30" glow />
           <StatCard label="Investigating" value="156" badge="Active" badgeColor="warning" borderColor="border-border-dark" />
           <StatCard label="Resolved" value="1,042" badge="+8%" badgeColor="success" borderColor="border-border-dark" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-end gap-3 mt-2">
            <div className="flex-1 min-w-[300px] relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">search</span>
                <input 
                  className="w-full bg-surface-dark border border-border-dark text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary placeholder-slate-500 focus:ring-1 focus:ring-primary" 
                  placeholder="Search IP, Alert ID, or Threat Type..." 
                  type="text"
                />
            </div>
            <div className="relative min-w-[140px]">
                <select className="w-full appearance-none bg-surface-dark border border-border-dark text-white text-sm rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-primary cursor-pointer">
                    <option>Severity: All</option>
                    <option>Critical</option>
                    <option>High</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-[20px]">expand_more</span>
            </div>
            <div className="relative min-w-[140px]">
                <select className="w-full appearance-none bg-surface-dark border border-border-dark text-white text-sm rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-primary cursor-pointer">
                    <option>Status: All</option>
                    <option>Open</option>
                    <option>Investigating</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-[20px]">expand_more</span>
            </div>
            <div className="relative min-w-[180px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[20px]">calendar_today</span>
                <input 
                  className="w-full bg-surface-dark border border-border-dark text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary cursor-pointer" 
                  placeholder="Last 24 Hours" 
                  type="text"
                />
            </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="w-full rounded-xl border border-border-dark/50 bg-surface-dark overflow-hidden flex flex-col flex-1">
        <div className="overflow-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-border-dark/50 bg-border-dark/20 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                        <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors">Alert ID</th>
                        <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors">Timestamp</th>
                        <th className="px-6 py-4">Source IP</th>
                        <th className="px-6 py-4">Threat Type</th>
                        <th className="px-6 py-4">Risk Score</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-dark/30 text-sm">
                    {alertsData.map((alert, i) => (
                        <tr 
                          key={i} 
                          className="hover:bg-white/5 transition-colors group cursor-pointer"
                          onClick={() => navigate('/alerts/detail')}
                        >
                            <td className="px-6 py-4 font-mono text-white">{alert.id}</td>
                            <td className="px-6 py-4 text-slate-400">{alert.time}</td>
                            <td className="px-6 py-4 font-mono text-slate-400">{alert.ip}</td>
                            <td className="px-6 py-4 text-white font-medium">{alert.type}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-${alert.color === 'blue' ? 'blue' : alert.color === 'yellow' ? 'yellow' : alert.color}-500/10 text-${alert.color === 'blue' ? 'blue' : alert.color === 'yellow' ? 'yellow' : alert.color}-500 border border-${alert.color === 'blue' ? 'blue' : alert.color === 'yellow' ? 'yellow' : alert.color}-500/20`}>
                                    <div className={`w-1.5 h-1.5 rounded-full bg-${alert.color === 'blue' ? 'blue' : alert.color === 'yellow' ? 'yellow' : alert.color}-500`}></div> 
                                    {alert.score} {alert.severity}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                    alert.status === 'Open' ? 'bg-red-500/10 text-red-400' : 
                                    alert.status === 'Resolved' ? 'bg-green-500/10 text-green-400' : 
                                    'bg-yellow-500/10 text-yellow-500'
                                }`}>
                                    {alert.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-primary hover:text-primary-hover font-medium text-xs mr-3">Investigate</button>
                                <button className="text-slate-400 hover:text-white"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border-dark/30 bg-surface-dark mt-auto">
            <p className="text-sm text-slate-400">Showing <span className="font-medium text-white">1-6</span> of <span className="font-medium text-white">1,248</span> alerts</p>
            <div className="flex items-center gap-2">
                <button className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-border-dark disabled:opacity-50">
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="px-3 py-1 rounded-md bg-primary text-white text-sm font-medium">1</button>
                <button className="px-3 py-1 rounded-md text-slate-400 hover:text-white hover:bg-border-dark text-sm font-medium">2</button>
                <button className="px-3 py-1 rounded-md text-slate-400 hover:text-white hover:bg-border-dark text-sm font-medium">3</button>
                <span className="text-slate-400">...</span>
                <button className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-border-dark">
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<any> = ({ label, value, badge, badgeColor, borderColor, glow }) => (
    <div className={`bg-surface-dark border ${borderColor} rounded-lg p-3 flex items-center justify-between relative overflow-hidden`}>
        {glow && <div className={`absolute inset-0 bg-gradient-to-r from-${badgeColor}-500/5 to-transparent pointer-events-none`}></div>}
        <div className="relative z-10">
            <p className={`text-${badgeColor === 'danger' ? 'red' : 'slate'}-400 text-xs uppercase font-medium`}>{label}</p>
            <p className="text-white text-xl font-bold">{value}</p>
        </div>
        <span className={`text-${badgeColor}-500 bg-${badgeColor}-500/10 text-xs font-medium px-2 py-1 rounded`}>{badge}</span>
    </div>
);

export default Alerts;