import React from 'react';

interface RiskGaugeProps {
  score: number;
  grade: string;
  lastScan: string;
}

/**
 * RiskGauge
 *
 * SVG circular gauge displaying the organisation's current global risk score.
 * The stroke offset is statically derived from the design — connect to real
 * metric data via the dashboardService when live analytics are available.
 */
const RiskGauge: React.FC<RiskGaugeProps> = ({ score, grade, lastScan }) => {
  // Full circumference for r=45: 2π×45 ≈ 283. Offset represents the "empty" arc.
  const circumference = 283;
  const offset = Math.round(circumference - (score / 100) * circumference);

  return (
    <div className="col-span-1 lg:col-span-1 rounded-xl border border-border-dark bg-card-dark p-6 shadow-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-white">Global Risk Level</h3>
          <span className="material-symbols-outlined text-slate-500 cursor-help">info</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center py-4">
          <div className="relative h-40 w-40">
            <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="none" r="45" stroke="#1F2933" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                fill="none"
                r="45"
                stroke="#10b981"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                strokeWidth="8"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold text-white tracking-tighter">{score}</span>
              <span className="text-xs uppercase font-semibold text-success mt-1">Low Risk</span>
            </div>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-4 border-t border-border-dark pt-4">
          <div>
            <p className="text-xs text-slate-400">Security Score</p>
            <p className="text-lg font-bold text-white">{grade}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Last Scan</p>
            <p className="text-sm font-medium text-white">{lastScan}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskGauge;
