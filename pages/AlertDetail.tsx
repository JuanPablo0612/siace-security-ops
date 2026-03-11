import React from 'react';

const AlertDetail: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30 uppercase tracking-wide">Critical</span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Open Investigation
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white leading-tight">Suspicious Outbound Traffic Detected</h1>
          <p className="text-slate-400 flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-lg">dns</span>
            Asset: <span className="text-white font-medium">Finance-Server-01</span>
            <span className="w-1 h-1 rounded-full bg-slate-500 mx-1"></span>
            ID: #AL-8932
          </p>
        </div>
        <div className="flex gap-3 mt-2 md:mt-0">
          <button className="px-4 py-2 rounded-lg border border-border-dark bg-surface-dark text-slate-400 hover:text-white hover:border-primary/50 transition-all flex items-center gap-2 text-sm font-medium shadow-sm">
            <span className="material-symbols-outlined text-lg">share</span>
            Share
          </button>
          <button className="px-4 py-2 rounded-lg border border-border-dark bg-surface-dark text-slate-400 hover:text-white hover:border-primary/50 transition-all flex items-center gap-2 text-sm font-medium shadow-sm">
            <span className="material-symbols-outlined text-lg">history</span>
            History
          </button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Technical Facts (7/12) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Risk Score Card */}
            <div className="bg-surface-dark border border-border-dark rounded-xl p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary">speed</span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">Risk Score</h3>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-white">88</span>
                <span className="text-sm text-slate-400 mb-1.5">/ 100</span>
              </div>
              <div className="w-full bg-gray-700 h-1.5 rounded-full mt-4 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full" style={{ width: '88%' }}></div>
              </div>
              <p className="text-xs text-red-400 mt-2 font-medium">High Probability of Exfiltration</p>
            </div>
            
            {/* Timestamp Card */}
            <div className="bg-surface-dark border border-border-dark rounded-xl p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary">schedule</span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">Timestamp</h3>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Oct 24, 2023</span>
                <span className="text-lg font-medium text-white/80">14:32:05 UTC</span>
              </div>
              <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">history_toggle_off</span>
                2 mins ago
              </p>
            </div>
          </div>

          {/* Network Entity Card */}
          <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border-dark bg-white/5 flex justify-between items-center">
              <h3 className="text-white font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">hub</span>
                Connection Details
              </h3>
              <button className="text-xs text-primary hover:text-white transition-colors">View Topology</button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              {/* Source */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Source (Internal)</span>
                <div className="text-lg font-mono text-white">192.168.1.45</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="material-symbols-outlined text-slate-400 text-sm">computer</span>
                  <span className="text-sm text-slate-400">Finance-Server-01</span>
                </div>
              </div>
              {/* Flow Arrow */}
              <div className="flex flex-col items-center justify-center text-slate-400 gap-1">
                <span className="text-xs font-mono bg-border-dark/50 px-2 py-0.5 rounded text-white">TCP / 443</span>
                <div className="h-px w-full bg-border-dark relative min-w-[60px]">
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-border-dark transform rotate-45"></span>
                </div>
                <span className="text-[10px] uppercase text-red-400 font-bold">Data Upload</span>
              </div>
              {/* Destination */}
              <div className="flex flex-col gap-1 md:text-right">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Destination (External)</span>
                <div className="text-lg font-mono text-red-400">45.33.22.11</div>
                <div className="flex items-center gap-1.5 mt-1 md:justify-end">
                  <span className="text-sm text-slate-400">Unknown Host</span>
                  <span className="material-symbols-outlined text-slate-400 text-sm">public</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border-dark">
              <div className="p-4 flex flex-col gap-1">
                <span className="text-xs text-slate-400">Protocol</span>
                <span className="text-sm font-medium text-white">TCP (HTTPS)</span>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <span className="text-xs text-slate-400">Attack Vector</span>
                <span className="text-sm font-medium text-white">Data Exfiltration</span>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <span className="text-xs text-slate-400">Payload Size</span>
                <span className="text-sm font-medium text-white">2.4 GB</span>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <span className="text-xs text-slate-400">Process ID</span>
                <span className="text-sm font-medium text-white">svchost.exe (PID: 4421)</span>
              </div>
            </div>
          </div>

          {/* Raw Log Snippet */}
          <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-border-dark bg-white/5 flex justify-between items-center cursor-pointer hover:bg-white/10 transition-colors">
              <span className="text-sm font-medium text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400 text-base">code</span>
                Raw Log Payload
              </span>
              <span className="material-symbols-outlined text-slate-400">expand_more</span>
            </div>
            <div className="bg-[#0b1219] p-4 overflow-x-auto">
              <code className="text-xs font-mono text-slate-400 leading-relaxed whitespace-pre block">
                <span className="text-blue-400">Oct 24 14:32:05</span> finance-server-01 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:16:3e:.. SRC=192.168.1.45 DST=45.33.22.11 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=4321 DF PROTO=TCP SPT=49213 DPT=443 WINDOW=29200 RES=0x00 SYN URGP=0
              </code>
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis & Action (5/12) */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full">
          {/* AI Insight Box */}
          <div className="bg-gradient-to-b from-primary/10 to-transparent border border-primary/30 rounded-xl p-6 relative">
            <div className="absolute -top-3 left-6">
              <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-primary/20 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                SIACE Insight
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-4">
              <p className="text-white text-base leading-relaxed">
                Our AI detected an <span className="text-primary font-semibold">unusually large data transfer</span> from your internal finance server to a known malicious IP address associated with ransomware groups. 
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                This behavior deviates <strong className="text-white">400% from the server's normal baseline</strong> for outbound traffic on a Thursday afternoon. No prior connections to this IP have been recorded in the last 90 days.
              </p>
              <div className="flex items-start gap-3 bg-surface-dark/50 p-3 rounded-lg border border-border-dark/50">
                <span className="material-symbols-outlined text-yellow-500 mt-0.5 text-lg">warning</span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-white">Similarity Analysis</span>
                  <span className="text-xs text-slate-400">Matches pattern of "BlackCat" ransomware pre-encryption exfiltration (92% confidence).</span>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Recommendation Card */}
          <div className="bg-surface-dark border border-border-dark rounded-xl flex flex-col flex-1 shadow-lg shadow-black/20">
            <div className="p-5 border-b border-border-dark">
              <h3 className="text-white font-semibold flex items-center gap-2 text-lg">
                <span className="material-symbols-outlined text-emerald-400">verified_user</span>
                Recommended Actions
              </h3>
            </div>
            <div className="p-5 flex flex-col gap-4">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm border border-primary/30">1</div>
                <div className="flex flex-col gap-1">
                  <span className="text-white font-medium text-sm">Isolate the Asset</span>
                  <p className="text-slate-400 text-sm">Disconnect <strong>Finance-Server-01</strong> from the network immediately to stop data flow.</p>
                  <button className="mt-2 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded w-fit transition-colors font-medium">
                    Execute Isolation Script
                  </button>
                </div>
              </div>
              <div className="h-px bg-border-dark ml-12 w-[calc(100%-3rem)]"></div>
              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 text-slate-400 flex items-center justify-center font-bold text-sm border border-border-dark">2</div>
                <div className="flex flex-col gap-1">
                  <span className="text-white font-medium text-sm">Block IP Address</span>
                  <p className="text-slate-400 text-sm">Add <span className="font-mono text-xs">45.33.22.11</span> to the firewall blocklist.</p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 text-slate-400 flex items-center justify-center font-bold text-sm border border-border-dark">3</div>
                <div className="flex flex-col gap-1">
                  <span className="text-white font-medium text-sm">Password Rotation</span>
                  <p className="text-slate-400 text-sm">Reset credentials for all admin accounts active on the server.</p>
                </div>
              </div>
            </div>
            
            {/* Actions Footer */}
            <div className="mt-auto p-5 border-t border-border-dark bg-white/5">
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 px-4 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all font-medium text-sm flex items-center justify-center gap-2 group">
                  <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">check_circle</span>
                  Mark as Reviewed
                </button>
                <button className="flex-1 px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all font-medium text-sm flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">close</span>
                  False Alarm
                </button>
              </div>
              <p className="text-center text-xs text-slate-400 mt-3">
                Marking as reviewed will archive this alert and update the threat model.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDetail;