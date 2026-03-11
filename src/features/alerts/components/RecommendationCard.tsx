import React from 'react';

interface Step {
  number: number;
  title: string;
  description: React.ReactNode;
  action?: React.ReactNode;
}

interface RecommendationCardProps {
  steps: Step[];
  onMarkReviewed?: () => void;
  onFalseAlarm?: () => void;
}

/**
 * RecommendationCard
 *
 * Displays AI-generated remediation steps for an alert.
 * Used in the AlertDetailPage right column.
 */
const RecommendationCard: React.FC<RecommendationCardProps> = ({
  steps,
  onMarkReviewed,
  onFalseAlarm,
}) => (
  <div className="bg-surface-dark border border-border-dark rounded-xl flex flex-col flex-1 shadow-lg shadow-black/20">
    <div className="p-5 border-b border-border-dark">
      <h3 className="text-white font-semibold flex items-center gap-2 text-lg">
        <span className="material-symbols-outlined text-emerald-400">verified_user</span>
        Recommended Actions
      </h3>
    </div>

    <div className="p-5 flex flex-col gap-4">
      {steps.map((step, idx) => (
        <React.Fragment key={step.number}>
          {idx > 0 && <div className="h-px bg-border-dark ml-12 w-[calc(100%-3rem)]"></div>}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm border border-primary/30">
              {step.number}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white font-medium text-sm">{step.title}</span>
              <p className="text-slate-400 text-sm">{step.description}</p>
              {step.action}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>

    <div className="mt-auto p-5 border-t border-border-dark bg-white/5">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onMarkReviewed}
          className="flex-1 px-4 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all font-medium text-sm flex items-center justify-center gap-2 group"
        >
          <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
            check_circle
          </span>
          Mark as Reviewed
        </button>
        <button
          onClick={onFalseAlarm}
          className="flex-1 px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all font-medium text-sm flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">close</span>
          False Alarm
        </button>
      </div>
      <p className="text-center text-xs text-slate-400 mt-3">
        Marking as reviewed will archive this alert and update the threat model.
      </p>
    </div>
  </div>
);

export default RecommendationCard;
