import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 550 },
  { name: 'Thu', value: 420 },
  { name: 'Fri', value: 600 },
  { name: 'Sat', value: 350 },
  { name: 'Sun', value: 480 },
  { name: 'Mon2', value: 520 },
  { name: 'Tue2', value: 380 },
  { name: 'Wed2', value: 650 },
  { name: 'Thu2', value: 500 },
  { name: 'Fri2', value: 450 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl flex flex-col gap-6">
      {/* Top Section: Risk Score & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Global Risk Card */}
        <div className="col-span-1 lg:col-span-1 rounded-xl border border-border-dark bg-card-dark p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-white">Global Risk Level</h3>
              <span className="material-symbols-outlined text-slate-500 cursor-help">info</span>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center py-4">
              <div className="relative h-40 w-40">
                {/* SVG Gauge */}
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="none" r="45" stroke="#1F2933" strokeWidth="8"></circle>
                  <circle 
                    cx="50" cy="50" fill="none" r="45" stroke="#10b981" 
                    strokeDasharray="283" strokeDashoffset="79" strokeLinecap="round" strokeWidth="8"
                    className="transition-all duration-1000 ease-out"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-bold text-white tracking-tighter">72</span>
                  <span className="text-xs uppercase font-semibold text-success mt-1">Low Risk</span>
                </div>
              </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4 border-t border-border-dark pt-4">
              <div>
                <p className="text-xs text-slate-400">Security Score</p>
                <p className="text-lg font-bold text-white">B+</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Last Scan</p>
                <p className="text-sm font-medium text-white">2m ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Metrics Grid */}
        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MetricCard 
            icon="shield" iconColor="text-blue-400" iconBg="bg-blue-500/10"
            trendIcon="trending_up" trendColor="text-success" trendValue="+12%"
            title="Total Events" value="12,450"
          />
          <MetricCard 
            icon="smart_toy" iconColor="text-purple-400" iconBg="bg-purple-500/10"
            trendIcon="priority_high" trendColor="text-danger" trendValue="3 New"
            title="AI Anomalies" value="3"
          />
          <MetricCard 
            icon="gpp_maybe" iconColor="text-red-400" iconBg="bg-red-500/10"
            trendText="Steady" trendColor="text-slate-500"
            title="Critical Alerts" value="0"
          />
          <MetricCard 
            icon="speed" iconColor="text-cyan-400" iconBg="bg-cyan-500/10"
            trendIcon="arrow_downward" trendColor="text-success" trendValue="-5%"
            title="Avg Response Time" value="12ms"
          />
        </div>
      </div>

      {/* Middle Section: Chart & Table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Chart Section */}
        <div className="col-span-1 xl:col-span-2 rounded-xl border border-border-dark bg-card-dark p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-white">Weekly Threat Traffic</h3>
              <p className="text-xs text-slate-400">Inbound vs Outbound Anomalies</p>
            </div>
            <select className="bg-background-dark border border-slate-700 text-white text-xs rounded-lg px-2 py-1 focus:ring-primary focus:border-primary">
              <option>Last 7 Days</option>
              <option>Last 24 Hours</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-64 w-full bg-slate-800/20 rounded-lg border border-border-dark/50 relative">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1f8fff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1f8fff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Area type="monotone" dataKey="value" stroke="#1f8fff" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
             </ResponsiveContainer>
             
             {/* Fake Tooltip Visual from screenshot */}
             <div className="absolute top-[30%] left-[65%] pointer-events-none">
                <div className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white shadow-lg mb-2 whitespace-nowrap">
                   <span className="font-bold">42</span> threats
                </div>
                <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20 mx-auto"></div>
             </div>
          </div>
        </div>

        {/* Recent Alerts Table (Small) */}
        <div className="col-span-1 xl:col-span-1 rounded-xl border border-border-dark bg-card-dark p-0 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border-dark flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Recent Security Alerts</h3>
            <button className="text-xs text-primary hover:text-blue-400 font-medium">View All</button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-800/50 text-xs uppercase text-slate-500 font-medium">
                <tr>
                  <th className="px-4 py-3">Threat Type</th>
                  <th className="px-4 py-3 text-right">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dark">
                {[
                  { name: 'SQL Injection', time: '10:42 AM • DB-Server-01', severity: 'High', color: 'orange' },
                  { name: 'Login Failed', time: '09:15 AM • User: Admin', severity: 'Warn', color: 'yellow' },
                  { name: 'Port Scan', time: '08:30 AM • Firewall', severity: 'Info', color: 'blue' },
                  { name: 'New Device', time: '08:12 AM • Network', severity: 'Info', color: 'blue' },
                  { name: 'Policy Violation', time: 'Yesterday • User: Guest', severity: 'Warn', color: 'yellow' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors cursor-pointer group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full bg-${row.color}-500`}></div>
                        <div>
                          <p className="font-medium text-white group-hover:text-primary transition-colors">{row.name}</p>
                          <p className="text-xs text-slate-500">{row.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-flex items-center rounded-full bg-${row.color}-500/10 px-2 py-1 text-xs font-medium text-${row.color}-500 ring-1 ring-inset ring-${row.color}-500/20`}>
                        {row.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Quick Actions & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
        <div className="rounded-xl border border-border-dark bg-card-dark p-6">
          <h3 className="text-base font-semibold text-white mb-4">Component Status</h3>
          <div className="grid grid-cols-2 gap-4">
             {[
               { icon: 'cloud_done', label: 'Cloud API', color: 'green', status: 'bg-green-500' },
               { icon: 'database', label: 'Databases', color: 'green', status: 'bg-green-500' },
               { icon: 'bolt', label: 'AI Engine', color: 'yellow', status: 'bg-yellow-500 animate-pulse' },
               { icon: 'lock', label: 'Firewall', color: 'green', status: 'bg-green-500' },
             ].map((comp, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background-dark border border-border-dark">
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-${comp.color}-500`}>{comp.icon}</span>
                    <span className="text-sm font-medium text-slate-300">{comp.label}</span>
                  </div>
                  <span className={`h-2 w-2 rounded-full ${comp.status}`}></span>
                </div>
             ))}
          </div>
        </div>
        
        <div className="rounded-xl border border-border-dark bg-card-dark p-6">
          <h3 className="text-base font-semibold text-white mb-4">Quick Actions</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[
              { icon: 'add_moderator', label: 'Run Scan' },
              { icon: 'summarize', label: 'Export Log' },
              { icon: 'person_add', label: 'Add User' },
              { icon: 'settings_applications', label: 'Config' },
            ].map((action, i) => (
              <button key={i} className="flex flex-col items-center justify-center gap-2 min-w-[100px] h-[100px] rounded-xl bg-background-dark border border-border-dark hover:border-primary hover:bg-primary/5 transition-all group">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-3xl">{action.icon}</span>
                <span className="text-xs font-medium text-slate-400 group-hover:text-white">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const MetricCard: React.FC<any> = ({ icon, iconColor, iconBg, trendIcon, trendColor, trendValue, trendText, title, value }) => (
  <div className="rounded-xl border border-border-dark bg-card-dark p-5 hover:border-slate-700 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      {(trendIcon || trendText) && (
        <span className={`text-xs font-semibold ${trendColor} flex items-center gap-1`}>
          {trendIcon && <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{trendIcon}</span>}
          {trendValue || trendText}
        </span>
      )}
    </div>
    <h4 className="text-slate-400 text-sm font-medium">{title}</h4>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

export default Dashboard;