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
  error: string | null;
  isGenerating: boolean;
  setForm: (f: ReportFormState) => void;
  handleGenerate: () => Promise<void>;
  handleDownload: (reportId: string) => void;
}

export function useReports(): UseReportsResult {
  const [documents, setDocuments] = useState<ReportDocument[]>([]);
  const [scheduledJobs, setScheduledJobs] = useState<ScheduledJob[]>([]);
  const [stats, setStats] = useState<ReportsStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [form, setForm] = useState<ReportFormState>({
    reportType: 'executive_summary',
    startDate: '',
    endDate: '',
    format: 'pdf',
  });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [docs, jobs] = await Promise.all([
          reportsService.getRecentDocuments(),
          reportsService.getScheduledJobs(),
        ]);
        if (cancelled) return;
        setDocuments(docs);
        setScheduledJobs(jobs);
        setStats(await reportsService.getStats(docs, jobs));
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load reports');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await reportsService.generateReport(form);
      // Reload documents after generation
      const docs = await reportsService.getRecentDocuments();
      setDocuments(docs);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (reportId: string) => {
    reportsService.downloadReport(reportId);
  };

  return { documents, scheduledJobs, stats, form, isLoading, error, isGenerating, setForm, handleGenerate, handleDownload };
}
