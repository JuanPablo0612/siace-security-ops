import React from 'react';
import { useReports } from '../hooks/useReports';
import ReportsCharts from '../components/ReportsCharts';
import type { ReportFormat, ReportType, REPORT_TYPE_LABELS, REPORT_FORMAT_LABELS } from '../types/reports.types';

const REPORT_TYPES: { value: ReportType; label: string }[] = [
  { value: 'executive_summary', label: 'Executive Summary' },
  { value: 'threat_analysis', label: 'Threat Analysis Log' },
  { value: 'user_access_audit', label: 'User Access Audit' },
  { value: 'network_traffic', label: 'Network Traffic Patterns' },
  { value: 'compliance', label: 'Compliance Check (ISO 27001)' },
];

const FORMATS: { value: ReportFormat; label: string }[] = [
  { value: 'pdf', label: 'PDF' },
  { value: 'csv', label: 'CSV' },
  { value: 'json', label: 'JSON' },
];

const ReportsPage: React.FC = () => {
  const { documents, scheduledJobs, stats, form, isLoading, error, isGenerating, setForm, handleGenerate, handleDownload } =
    useReports();

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Executive Reporting</h1>
        <p className="text-slate-400">
          Generate, schedule, and download comprehensive security audits and compliance reports.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generator form */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-card-dark border border-border-dark rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">add_chart</span>
              Generate New Report
            </h2>

            <div className="flex flex-col gap-4">
              {/* Report type */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase">Report Type</label>
                <div className="relative">
                  <select
                    className="w-full bg-background-dark border border-border-dark text-white text-sm rounded-lg p-3 appearance-none focus:ring-primary focus:border-primary cursor-pointer"
                    value={form.reportType}
                    onChange={(e) => setForm({ ...form, reportType: e.target.value as ReportType })}
                  >
                    {REPORT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Date range */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    className="w-full bg-background-dark border border-border-dark text-white text-xs rounded-lg p-3 focus:ring-primary focus:border-primary"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  />
                  <input
                    type="date"
                    className="w-full bg-background-dark border border-border-dark text-white text-xs rounded-lg p-3 focus:ring-primary focus:border-primary"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Format selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase">Format</label>
                <div className="flex gap-3">
                  {FORMATS.map((fmt) => (
                    <label key={fmt.value} className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        className="sr-only peer"
                        checked={form.format === fmt.value}
                        onChange={() => setForm({ ...form, format: fmt.value })}
                      />
                      <div className="border border-border-dark bg-background-dark rounded-lg p-3 text-center peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                        <span className="text-sm font-bold">{fmt.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <span className="material-symbols-outlined">auto_fix_high</span>
                  {isGenerating ? 'Generating…' : 'Generate Report'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Archive + stats */}
        {isLoading ? (
          <div className="lg:col-span-2 flex items-center justify-center text-slate-400 text-sm">
            Loading reports…
          </div>
        ) : (
          <ReportsCharts
            documents={documents}
            scheduledJobs={scheduledJobs}
            stats={stats}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
