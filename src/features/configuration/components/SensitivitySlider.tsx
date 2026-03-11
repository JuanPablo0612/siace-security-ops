import React from 'react';

interface SensitivitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const LABELS = ['Conservative', 'Balanced', 'Aggressive', 'Paranoid'];

function getFalsePositiveLabel(value: number): string {
  if (value < 30) return 'Low (~0.3%)';
  if (value < 60) return 'Moderate (~0.7%)';
  if (value < 80) return 'Moderate (~1.2%)';
  return 'High (~2.5%)';
}

function getFalsePositiveColor(value: number): string {
  if (value < 60) return 'text-green-400';
  if (value < 80) return 'text-yellow-400';
  return 'text-red-400';
}

/**
 * SensitivitySlider
 *
 * Interactive range slider for the AI model anomaly-detection threshold.
 * Communicates changes upward via onChange — all state lives in useConfiguration.
 */
const SensitivitySlider: React.FC<SensitivitySliderProps> = ({ value, onChange }) => (
  <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-xl shadow-black/20">
    <div className="flex items-start justify-between mb-6">
      <div className="flex gap-4">
        <div className="p-3 bg-primary/10 rounded-lg h-fit text-primary">
          <span className="material-symbols-outlined">psychology</span>
        </div>
        <div>
          <h3 className="text-white text-lg font-semibold">AI Model Sensitivity</h3>
          <p className="text-slate-400 text-sm mt-1">
            Adjust the neural network's threshold for anomaly flagging. Higher sensitivity increases
            protection but may raise false positives.
          </p>
        </div>
      </div>
      <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20">
        Custom
      </span>
    </div>

    <div className="px-2 py-4">
      <div className="flex justify-between text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">
        {LABELS.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <div className="relative h-12 flex items-center">
        <div className="absolute w-full h-2 bg-border-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 via-primary to-red-500 rounded-full opacity-80"
            style={{ width: `${value}%` }}
          ></div>
        </div>
        <input
          className="w-full absolute z-10 focus:outline-none opacity-0 cursor-pointer h-full"
          id="sensitivity-slider"
          max="100"
          min="1"
          type="range"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-5 w-5 bg-white rounded-full shadow-[0_0_10px_rgba(31,143,255,0.5)] pointer-events-none"
          style={{ left: `${value}%` }}
        ></div>
      </div>

      <div className="mt-4 p-4 bg-background-dark/50 rounded-lg border border-border-dark flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-slate-400">Current Threshold</span>
          <span className="text-2xl font-bold text-white">{value}%</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">Projected False Positive Rate</span>
          <span className={`text-sm font-medium ${getFalsePositiveColor(value)}`}>
            {getFalsePositiveLabel(value)}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default SensitivitySlider;
