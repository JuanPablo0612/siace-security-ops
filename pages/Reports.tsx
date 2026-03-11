import React from 'react';

const Reports: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Executive Reporting</h1>
        <p className="text-slate-400">Generate, schedule, and download comprehensive security audits and compliance reports.</p>
      </div>

      {/* Main Generator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Generator Form */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-card-dark border border-border-dark rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">add_chart</span>
              Generate New Report
            </h2>
            
            <div className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase">Report Type</label>
                <div className="relative">
                  <select className="w-full bg-background-dark border border-border-dark text-white text-sm rounded-lg p-3 appearance-none focus:ring-primary focus:border-primary cursor-pointer">
                    <option>Executive Summary</option>
                    <option>Threat Analysis Log</option>
                    <option>User Access Audit</option>
                    <option>Network Traffic Patterns</option>
                    <option>Compliance Check (ISO 27001)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                   <div className="relative">
                      <input type="date" className="w-full bg-background-dark border border-border-dark text-white text-xs rounded-lg p-3 focus:ring-primary focus:border-primary" />
                   </div>
                   <div className="relative">
                      <input type="date" className="w-full bg-background-dark border border-border-dark text-white text-xs rounded-lg p-3 focus:ring-primary focus:border-primary" />
                   </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase">Format</label>
                <div className="flex gap-3">
                  <label className="flex-1 cursor-pointer">
                    <input type="radio" name="format" className="sr-only peer" defaultChecked />
                    <div className="border border-border-dark bg-background-dark rounded-lg p-3 text-center peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                      <span className="text-sm font-bold">PDF</span>
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input type="radio" name="format" className="sr-only peer" />
                    <div className="border border-border-dark bg-background-dark rounded-lg p-3 text-center peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                      <span className="text-sm font-bold">CSV</span>
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input type="radio" name="format" className="sr-only peer" />
                    <div className="border border-border-dark bg-background-dark rounded-lg p-3 text-center peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                      <span className="text-sm font-bold">JSON</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                   <span className="material-symbols-outlined">auto_fix_high</span>
                   Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* Scheduled Reports Mini-Panel */}
          <div className="bg-surface-dark border border-border-dark rounded-xl p-5">
             <div className="flex items-center justify-between mb-3">
               <h3 className="text-sm font-semibold text-white">Scheduled Jobs</h3>
               <button className="text-primary text-xs font-medium">Manage</button>
             </div>
             <div className="space-y-3">
               {[
                 { name: 'Weekly Exec Summary', schedule: 'Every Mon, 9:00 AM', status: 'Active' },
                 { name: 'Monthly Compliance', schedule: '1st of Month', status: 'Paused' }
               ].map((job, i) => (
                 <div key={i} className="flex items-center justify-between p-3 bg-background-dark rounded-lg border border-border-dark/50">
                    <div className="flex flex-col">
                       <span className="text-sm font-medium text-slate-200">{job.name}</span>
                       <span className="text-xs text-slate-500">{job.schedule}</span>
                    </div>
                    <div className={`h-2 w-2 rounded-full ${job.status === 'Active' ? 'bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-600'}`}></div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Right: Recent Reports Grid */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 px-1">
             <span className="material-symbols-outlined text-slate-400">history</span>
             Recent Archives
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'October Security Audit', date: 'Oct 24, 2023', type: 'Full Audit', size: '2.4 MB', icon: 'picture_as_pdf', color: 'red' },
              { title: 'Q3 Incident Log', date: 'Oct 01, 2023', type: 'Incidents', size: '856 KB', icon: 'table_view', color: 'green' },
              { title: 'User Access Review', date: 'Sep 28, 2023', type: 'IAM', size: '1.1 MB', icon: 'picture_as_pdf', color: 'red' },
              { title: 'Firewall Config Backup', date: 'Sep 15, 2023', type: 'Config', size: '45 KB', icon: 'data_object', color: 'yellow' },
              { title: 'September Exec Summary', date: 'Sep 30, 2023', type: 'Summary', size: '3.2 MB', icon: 'picture_as_pdf', color: 'red' },
              { title: 'Penetration Test Results', date: 'Aug 22, 2023', type: 'External', size: '12.8 MB', icon: 'lock', color: 'blue' },
            ].map((doc, i) => (
              <div key={i} className="group bg-surface-dark border border-border-dark rounded-xl p-4 hover:bg-card-dark hover:border-slate-600 transition-all cursor-pointer flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-${doc.color}-500/10 text-${doc.color}-500 border border-${doc.color}-500/20 group-hover:bg-${doc.color}-500/20 transition-colors`}>
                   <span className="material-symbols-outlined text-3xl">{doc.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                   <h4 className="text-white font-medium truncate group-hover:text-primary transition-colors">{doc.title}</h4>
                   <p className="text-xs text-slate-400 mt-1">{doc.date} • {doc.type}</p>
                   <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-slate-500 font-mono bg-background-dark px-1.5 py-0.5 rounded border border-border-dark">{doc.size}</span>
                      <button className="text-xs font-bold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                        Download <span className="material-symbols-outlined text-[16px]">download</span>
                      </button>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border-dark pt-6">
             <div className="text-center">
                <p className="text-2xl font-bold text-white">124</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Reports Generated</p>
             </div>
             <div className="text-center border-l border-border-dark">
                <p className="text-2xl font-bold text-white">12GB</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Archive Size</p>
             </div>
             <div className="text-center border-l border-border-dark">
                <p className="text-2xl font-bold text-white">4</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Scheduled Tasks</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;