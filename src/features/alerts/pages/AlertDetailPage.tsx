import React from 'react';
import RecommendationCard from '../components/RecommendationCard';

/**
 * AlertDetailPage
 *
 * Detailed view for a single security alert.
 * Composes connection details, AI insights, and the RecommendationCard.
 * All static data will be replaced by a useAlertDetail hook once
 * the backend provides a GET /api/alerts/:id endpoint.
 */
const AlertDetailPage: React.FC = () => {
  const recommendationSteps = [
    {
      number: 1,
      title: 'Isolate the Asset',
      description: (
        <>
          Disconnect <strong>Finance-Server-01</strong> from the network immediately to stop data
          flow.
        </>
      ),
      action: (
        <button className="mt-2 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded w-fit transition-colors font-medium">
          Execute Isolation Script
        </button>
      ),
    },
    {
      number: 2,
      title: 'Block IP Address',
      description: (
        <>
          Add <span className="font-mono text-xs">45.33.22.11</span> to the firewall blocklist.
        </>
      ),
    },
    {
      number: 3,
      title: 'Password Rotation',
      description: 'Reset credentials for all admin accounts active on the server.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30 uppercase tracking-wide">
              Critical
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Open Investigation
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white leading-tight">
            Suspicious Outbound Traffic Detected
          </h1>
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

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: Technical facts (7/12) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full"
                  style={{ width: '88%' }}
                ></div>
              </div>
              <p className="text-xs text-red-400 mt-2 font-medium">High Probability of Exfiltration</p>
            </div>

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

          {/* Connection details */}
          <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border-dark bg-white/5 flex justify-between items-center">
              <h3 className="text-white font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">hub</span>
                Connection Details
              </h3>
              <button className="text-xs text-primary hover:text-white transition-colors">
                View Topology
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Source (Internal)
                </span>
                <div className="text-lg font-mono text-white">192.168.1.45</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="material-symbols-outlined text-slate-400 text-sm">computer</span>
                  <span className="text-sm text-slate-400">Finance-Server-01</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center text-slate-400 gap-1">
                <span className="text-xs font-mono bg-border-dark/50 px-2 py-0.5 rounded text-white">
                  TCP / 443
                </span>
                <div className="h-px w-full bg-border-dark relative min-w-[60px]">
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-border-dark transform rotate-45"></span>
                </div>
                <span className="text-[10px] uppercase text-red-400 font-bold">Data Upload</span>
              </div>
              <div className="flex flex-col gap-1 md:text-right">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Destination (External)
                </span>
                <div className="text-lg font-mono text-red-400">45.33.22.11</div>
                <div className="flex items-center gap-1.5 mt-1 md:justify-end">
                  <span className="text-sm text-slate-400">Unknown Host</span>
                  <span className="material-symbols-outlined text-slate-400 text-sm">public</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata grid */}
          <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border-dark">
              {[
                { label: 'Protocol', value: 'TCP (HTTPS)' },
                { label: 'Attack Vector', value: 'Data Exfiltration' },
                { label: 'Payload Size', value: '2.4 GB' },
                { label: 'Process ID', value: 'svchost.exe (PID: 4421)' },
              ].map((item, i) => (
                <div key={i} className="p-4 flex flex-col gap-1">
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className="text-sm font-medium text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Raw log */}
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

        {/* Right column: AI analysis + actions (5/12) */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full">
          {/* AI insight box */}
          <div className="bg-gradient-to-b from-primary/10 to-transparent border border-primary/30 rounded-xl p-6 relative">
            <div className="absolute -top-3 left-6">
              <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-primary/20 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                SIACE Insight
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-4">
              <p className="text-white text-base leading-relaxed">
                Our AI detected an{' '}
                <span className="text-primary font-semibold">unusually large data transfer</span>{' '}
                from your internal finance server to a known malicious IP address associated with
                ransomware groups.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                This behavior deviates{' '}
                <strong className="text-white">400% from the server's normal baseline</strong> for
                outbound traffic on a Thursday afternoon. No prior connections to this IP have been
                recorded in the last 90 days.
              </p>
              <div className="flex items-start gap-3 bg-surface-dark/50 p-3 rounded-lg border border-border-dark/50">
                <span className="material-symbols-outlined text-yellow-500 mt-0.5 text-lg">warning</span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-white">Similarity Analysis</span>
                  <span className="text-xs text-slate-400">
                    Matches pattern of "BlackCat" ransomware pre-encryption exfiltration (92%
                    confidence).
                  </span>
                </div>
              </div>
            </div>
          </div>

          <RecommendationCard steps={recommendationSteps} />
        </div>
      </div>
    </div>
  );
};

export default AlertDetailPage;
