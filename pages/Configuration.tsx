import React from 'react';

const Configuration: React.FC = () => {
  return (
    <div className="flex flex-col items-center max-w-[1400px] mx-auto w-full">
      {/* Header */}
      <div className="w-full mb-8">
        <nav className="flex mb-4 text-sm font-medium text-slate-400">
          <span className="hover:text-primary transition-colors cursor-pointer">Home</span>
          <span className="mx-2 text-slate-600">/</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Settings</span>
          <span className="mx-2 text-slate-600">/</span>
          <span className="text-white">System Configuration</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">System Configuration</h1>
            <p className="text-slate-400 text-base max-w-2xl">Manage your AI detection parameters, analysis frequency, and system alert preferences.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2.5 rounded-lg border border-border-dark text-slate-400 hover:text-white hover:bg-border-dark transition-colors font-medium text-sm">
              Reset Defaults
            </button>
            <button className="px-4 py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-900/20 transition-all font-medium text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">save</span>
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Primary AI Settings */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Card 1: AI Model Sensitivity */}
          <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-xl shadow-black/20">
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-4">
                <div className="p-3 bg-primary/10 rounded-lg h-fit text-primary">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold">AI Model Sensitivity</h3>
                  <p className="text-slate-400 text-sm mt-1">Adjust the neural network's threshold for anomaly flagging. Higher sensitivity increases protection but may raise false positives.</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20">Custom</span>
            </div>
            
            <div className="px-2 py-4">
              <div className="flex justify-between text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">
                <span>Conservative</span>
                <span>Balanced</span>
                <span>Aggressive</span>
                <span>Paranoid</span>
              </div>
              <div className="relative h-12 flex items-center">
                {/* Custom Slider Track Background Gradient */}
                <div className="absolute w-full h-2 bg-border-dark rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 via-primary to-red-500 w-[75%] rounded-full opacity-80"></div>
                </div>
                <input className="w-full absolute z-10 focus:outline-none opacity-0 cursor-pointer h-full" id="sensitivity-slider" max="100" min="1" type="range" defaultValue="75"/>
                {/* Visual Thumb representation since standard styling is tricky with Tailwind alone */}
                <div className="absolute top-1/2 -translate-y-1/2 h-5 w-5 bg-white rounded-full shadow-[0_0_10px_rgba(31,143,255,0.5)] pointer-events-none" style={{ left: '75%' }}></div>
              </div>
              
              <div className="mt-4 p-4 bg-background-dark/50 rounded-lg border border-border-dark flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Current Threshold</span>
                  <span className="text-2xl font-bold text-white">75%</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Projected False Positive Rate</span>
                  <span className="text-sm font-medium text-yellow-400">Moderate (~1.2%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Analysis Frequency */}
          <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-xl shadow-black/20">
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-4">
                <div className="p-3 bg-primary/10 rounded-lg h-fit text-primary">
                  <span className="material-symbols-outlined">query_stats</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold">Analysis Frequency</h3>
                  <p className="text-slate-400 text-sm mt-1">Define how often the Deep Scan engine analyzes your network traffic patterns.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <label className="block text-sm font-medium text-slate-400 mb-2">Scan Interval</label>
                <div className="relative">
                  <select className="w-full bg-background-dark border border-border-dark text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-3 pr-10 appearance-none cursor-pointer hover:border-primary/50 transition-colors">
                    <option>Real-time (High Load)</option>
                    <option selected>Hourly Batches</option>
                    <option>Every 6 Hours</option>
                    <option>Daily Midnight Scan</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <label className="block text-sm font-medium text-slate-400 mb-2">Retention Policy</label>
                <div className="relative">
                  <select className="w-full bg-background-dark border border-border-dark text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-3 pr-10 appearance-none cursor-pointer hover:border-primary/50 transition-colors">
                    <option>30 Days</option>
                    <option selected>90 Days</option>
                    <option>1 Year</option>
                    <option>Indefinite (S3 Archive)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-200 text-sm">
              <span className="material-symbols-outlined text-blue-400">info</span>
              <span>Changing scan interval to 'Real-time' may impact system performance by up to 15%.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Notifications & Status */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Card 3: Notification Preferences */}
          <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-xl shadow-black/20 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">notifications_active</span>
              </div>
              <h3 className="text-white text-lg font-semibold">Notification Preferences</h3>
            </div>
            <div className="space-y-6">
              {[
                { label: 'Critical Alerts', sub: 'Immediate breach notifications', checked: true },
                { label: 'Weekly Reports', sub: 'Summary of blocked threats', checked: true },
                { label: 'System Health', sub: 'Downtime & maintenance', checked: false },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-sm">{item.label}</span>
                    <span className="text-slate-400 text-xs">{item.sub}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
              
              <hr className="border-border-dark my-4" />
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Channels</h4>
              
              {[
                { icon: 'mail', label: 'Email' },
                { icon: 'smartphone', label: 'Push (Mobile)' },
                { icon: 'webhook', label: 'Slack Webhook' },
              ].map((ch, idx) => (
                <div key={idx} className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">{ch.icon}</span>
                    <span className="text-white text-sm">{ch.label}</span>
                  </div>
                  <span className="text-primary text-xs font-bold cursor-pointer hover:text-white transition-colors">Configure</span>
                </div>
              ))}
            </div>
          </div>

          {/* Small Promo / Status Card */}
          <div className="bg-gradient-to-br from-primary/20 to-purple-600/10 rounded-xl border border-primary/20 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary animate-pulse">
              <span className="material-symbols-outlined text-[32px]">security</span>
            </div>
            <h3 className="text-white font-bold text-lg">System Secure</h3>
            <p className="text-slate-400 text-xs mt-2 mb-4">Your configuration is optimized for enterprise environments.</p>
            <div className="w-full bg-background-dark/50 rounded-full h-2 mb-1">
              <div className="bg-primary h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
            <span className="text-xs text-primary font-bold">94% Health Score</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;