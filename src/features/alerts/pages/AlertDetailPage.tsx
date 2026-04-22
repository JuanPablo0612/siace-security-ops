import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { alertsService } from '../services/alertsService';
import RecommendationCard from '../components/RecommendationCard';
import type { AlertDetail } from '../types/alerts.types';

const SEVERITY_BADGE: Record<string, string> = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const AlertDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<AlertDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    alertsService.getAlertById(id)
      .then(setAlert)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load alert'))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleMarkReviewed = async () => {
    if (!alert || isUpdating) return;
    setIsUpdating(true);
    try {
      await alertsService.updateAlert(alert.id, { status: 'resolved', is_acknowledged: true });
      setAlert((prev) => prev ? { ...prev, status: 'resolved', isAcknowledged: true } : prev);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFalseAlarm = async () => {
    if (!alert || isUpdating) return;
    setIsUpdating(true);
    try {
      await alertsService.updateAlert(alert.id, { status: 'closed', notes: 'Marked as false alarm' });
      navigate(-1);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
        Loading alert details…
      </div>
    );
  }

  if (error || !alert) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-4">
        <p className="text-red-400 text-sm">{error ?? 'Alert not found'}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-primary text-sm hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const recommendationSteps = alert.recommendations.length > 0
    ? alert.recommendations.map((r, idx) => ({
        number: idx + 1,
        title: r.recommendationType,
        description: r.actionText,
        action: r.isImplemented ? (
          <span className="mt-1 inline-flex items-center gap-1 text-xs text-green-400">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            Implemented
          </span>
        ) : undefined,
      }))
    : alert.recommendedActions.map((action, idx) => ({
        number: idx + 1,
        title: `Action ${idx + 1}`,
        description: action,
      }));

  const severityClass = SEVERITY_BADGE[alert.severity] ?? SEVERITY_BADGE.low;

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border uppercase tracking-wide ${severityClass}`}>
              {alert.severity}
            </span>
            <span className={`flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded border ${
              alert.status === 'resolved' || alert.status === 'closed'
                ? 'text-slate-400 bg-slate-500/10 border-slate-500/20'
                : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                alert.status === 'resolved' || alert.status === 'closed'
                  ? 'bg-slate-400'
                  : 'bg-emerald-400 animate-pulse'
              }`}></span>
              {alert.status === 'investigating' ? 'Open Investigation' : alert.status}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white leading-tight">
            {alert.title}
          </h1>
          <p className="text-slate-400 flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-lg">dns</span>
            Source: <span className="text-white font-medium">{alert.sourceIp}</span>
            <span className="w-1 h-1 rounded-full bg-slate-500 mx-1"></span>
            ID: <span className="font-mono text-xs">{alert.id}</span>
          </p>
        </div>
        <div className="flex gap-3 mt-2 md:mt-0">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg border border-border-dark bg-surface-dark text-slate-400 hover:text-white hover:border-primary/50 transition-all flex items-center gap-2 text-sm font-medium shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back
          </button>
          <button
            disabled
            title="Alert history coming soon"
            className="px-4 py-2 rounded-lg border border-border-dark bg-surface-dark text-slate-400 flex items-center gap-2 text-sm font-medium shadow-sm opacity-40 cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-lg">history</span>
            History
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface-dark border border-border-dark rounded-xl p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary">speed</span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">Confidence Score</h3>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-white">{alert.confidenceScore}</span>
                <span className="text-sm text-slate-400 mb-1.5">/ 100</span>
              </div>
              <div className="w-full bg-gray-700 h-1.5 rounded-full mt-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full"
                  style={{ width: `${alert.confidenceScore}%` }}
                ></div>
              </div>
              <p className={`text-xs mt-2 font-medium ${alert.confidenceScore >= 80 ? 'text-red-400' : alert.confidenceScore >= 50 ? 'text-yellow-400' : 'text-blue-400'}`}>
                {alert.alertType}
              </p>
            </div>

            <div className="bg-surface-dark border border-border-dark rounded-xl p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary">schedule</span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">Timestamp</h3>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  {new Date(alert.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-lg font-medium text-white/80">
                  {new Date(alert.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">history_toggle_off</span>
                {new Date(alert.updatedAt).toLocaleString()}
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
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Source
                </span>
                <div className="text-lg font-mono text-white">{alert.sourceIp}</div>
              </div>
              <div className="flex flex-col items-center justify-center text-slate-400 gap-1">
                <span className="text-xs font-mono bg-border-dark/50 px-2 py-0.5 rounded text-white">
                  {alert.protocol ?? 'TCP'} {alert.port ? `/ ${alert.port}` : ''}
                </span>
                <div className="h-px w-full bg-border-dark relative min-w-[60px]">
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-border-dark transform rotate-45"></span>
                </div>
              </div>
              <div className="flex flex-col gap-1 md:text-right">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Destination
                </span>
                <div className={`text-lg font-mono ${alert.destinationIp ? 'text-red-400' : 'text-slate-500'}`}>
                  {alert.destinationIp ?? 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border-dark">
              {[
                { label: 'Protocol', value: alert.protocol ?? 'N/A' },
                { label: 'Alert Type', value: alert.alertType },
                { label: 'Port', value: alert.port ? String(alert.port) : 'N/A' },
                { label: 'Assigned To', value: alert.assignedTo ?? 'Unassigned' },
              ].map((item, i) => (
                <div key={i} className="p-4 flex flex-col gap-1">
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className="text-sm font-medium text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          {alert.description && (
            <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border-dark bg-white/5">
                <span className="text-sm font-medium text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-400 text-base">description</span>
                  Description
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm text-slate-400 leading-relaxed">{alert.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full">
          {/* AI insight */}
          <div className="bg-gradient-to-b from-primary/10 to-transparent border border-primary/30 rounded-xl p-6 relative">
            <div className="absolute -top-3 left-6">
              <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-primary/20 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                SIACE Insight
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-4">
              <p className="text-white text-base leading-relaxed">
                Alert detected with a{' '}
                <span className="text-primary font-semibold">{alert.confidenceScore}% confidence score</span>.{' '}
                {alert.description}
              </p>
              {alert.notes && (
                <div className="flex items-start gap-3 bg-surface-dark/50 p-3 rounded-lg border border-border-dark/50">
                  <span className="material-symbols-outlined text-yellow-500 mt-0.5 text-lg">sticky_note_2</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-white">Analyst Notes</span>
                    <span className="text-xs text-slate-400">{alert.notes}</span>
                  </div>
                </div>
              )}
              {alert.isAcknowledged && (
                <div className="flex items-center gap-2 text-green-400 text-xs font-medium">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Acknowledged
                </div>
              )}
            </div>
          </div>

          {recommendationSteps.length > 0 && (
            <RecommendationCard
              steps={recommendationSteps}
              onMarkReviewed={handleMarkReviewed}
              onFalseAlarm={handleFalseAlarm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertDetailPage;
