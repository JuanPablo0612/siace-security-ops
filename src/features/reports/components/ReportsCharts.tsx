import React from 'react';
import type { ReportDocument, ScheduledJob, ReportsStats } from '../types/reports.types';

interface ReportsChartsProps {
  documents: ReportDocument[];
  scheduledJobs: ScheduledJob[];
  stats: ReportsStats | null;
  onDownload?: (reportId: string) => void;
}

const ReportsCharts: React.FC<ReportsChartsProps> = ({ documents, scheduledJobs, stats, onDownload }) => (
  <div className="lg:col-span-2 flex flex-col gap-4">
    <h2 className="text-lg font-semibold text-white flex items-center gap-2 px-1">
      <span className="material-symbols-outlined text-slate-400">history</span>
      Recent Archives
    </h2>

    {/* Document grid */}
    {documents.length === 0 ? (
      <div className="text-slate-400 text-sm text-center py-8 border border-dashed border-border-dark rounded-xl">
        No reports generated yet
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="group bg-surface-dark border border-border-dark rounded-xl p-4 hover:bg-card-dark hover:border-slate-600 transition-all cursor-pointer flex items-start gap-4"
            onClick={() => onDownload?.(doc.id)}
          >
            <div
              className={`p-3 rounded-lg bg-${doc.color}-500/10 text-${doc.color}-500 border border-${doc.color}-500/20 group-hover:bg-${doc.color}-500/20 transition-colors`}
            >
              <span className="material-symbols-outlined text-3xl">{doc.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium truncate group-hover:text-primary transition-colors">
                {doc.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {doc.date} • {doc.type}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-xs text-slate-500 font-mono bg-background-dark px-1.5 py-0.5 rounded border border-border-dark uppercase">
                  {doc.format}
                </span>
                <button
                  className="text-xs font-bold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); onDownload?.(doc.id); }}
                >
                  Download{' '}
                  <span className="material-symbols-outlined text-[16px]">download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Aggregate stats */}
    {stats && (
      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border-dark pt-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{stats.totalGenerated}</p>
          <p className="text-xs text-slate-400 uppercase tracking-wider">Reports Generated</p>
        </div>
        <div className="text-center border-l border-border-dark">
          <p className="text-2xl font-bold text-white">{stats.scheduledTasks}</p>
          <p className="text-xs text-slate-400 uppercase tracking-wider">Active Scheduled Tasks</p>
        </div>
      </div>
    )}

    {/* Scheduled jobs mini-panel */}
    <div className="bg-surface-dark border border-border-dark rounded-xl p-5 mt-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white">Scheduled Jobs</h3>
      </div>
      {scheduledJobs.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-4">No scheduled jobs</p>
      ) : (
        <div className="space-y-3">
          {scheduledJobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between p-3 bg-background-dark rounded-lg border border-border-dark/50"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-200">{job.name}</span>
                <span className="text-xs text-slate-500">{job.schedule} • {job.format.toUpperCase()}</span>
              </div>
              <div
                className={`h-2 w-2 rounded-full ${
                  job.status === 'Active'
                    ? 'bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                    : 'bg-slate-600'
                }`}
              ></div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default ReportsCharts;
