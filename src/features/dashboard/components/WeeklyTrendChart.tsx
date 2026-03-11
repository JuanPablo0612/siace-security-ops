import React from 'react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { WeeklyThreatDataPoint } from '../types/dashboard.types';

interface WeeklyTrendChartProps {
  data: WeeklyThreatDataPoint[];
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

const TIME_RANGE_OPTIONS = ['Last 7 Days', 'Last 24 Hours', 'Last 30 Days'];

/**
 * WeeklyTrendChart
 *
 * Area chart showing weekly threat traffic trends with a time-range
 * selector. Uses Recharts ResponsiveContainer for fluid sizing.
 */
const WeeklyTrendChart: React.FC<WeeklyTrendChartProps> = ({
  data,
  timeRange,
  onTimeRangeChange,
}) => (
  <div className="col-span-1 xl:col-span-2 rounded-xl border border-border-dark bg-card-dark p-6 shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-base font-semibold text-white">Weekly Threat Traffic</h3>
        <p className="text-xs text-slate-400">Inbound vs Outbound Anomalies</p>
      </div>
      <select
        value={timeRange}
        onChange={(e) => onTimeRangeChange(e.target.value)}
        className="bg-background-dark border border-slate-700 text-white text-xs rounded-lg px-2 py-1 focus:ring-primary focus:border-primary"
      >
        {TIME_RANGE_OPTIONS.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>

    <div className="h-64 w-full bg-slate-800/20 rounded-lg border border-border-dark/50 relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1f8fff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#1f8fff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#1f8fff"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Visual annotation from design */}
      <div className="absolute top-[30%] left-[65%] pointer-events-none">
        <div className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white shadow-lg mb-2 whitespace-nowrap">
          <span className="font-bold">42</span> threats
        </div>
        <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20 mx-auto"></div>
      </div>
    </div>
  </div>
);

export default WeeklyTrendChart;
