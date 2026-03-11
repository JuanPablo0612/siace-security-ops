import { useState, useEffect } from 'react';
import { reportsService } from '../services/reportsService';
import type {
  ReportDocument,
  ScheduledJob,
  ReportsStats,
  ReportFormState,
} from '../types/reports.types';

interface UseReportsResult {
  documents: ReportDocument[];
  scheduledJobs: ScheduledJob[];
  stats: ReportsStats | null;
  form: ReportFormState;
  isLoading: boolean;
  isGenerating: boolean;
  setForm: (f: ReportFormState) => void;
  handleGenerate: () => Promise<void>;
}

/**
 * useReports
 *
 * Manages report generation form state and fetches archive data.
 */
export function useReports(): UseReportsResult {
  const [documents, setDocuments] = useState<ReportDocument[]>([]);
  const [scheduledJobs, setScheduledJobs] = useState<ScheduledJob[]>([]);
  const [stats, setStats] = useState<ReportsStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [form, setForm] = useState<ReportFormState>({
    reportType: 'Executive Summary',
    startDate: '',
    endDate: '',
    format: 'PDF',
  });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      const [docs, jobs, s] = await Promise.all([
        reportsService.getRecentDocuments(),
        reportsService.getScheduledJobs(),
        reportsService.getStats(),
      ]);
      if (cancelled) return;
      setDocuments(docs);
      setScheduledJobs(jobs);
      setStats(s);
      setIsLoading(false);
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await reportsService.generateReport();
    } finally {
      setIsGenerating(false);
    }
  };

  return { documents, scheduledJobs, stats, form, isLoading, isGenerating, setForm, handleGenerate };
}
