import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';
import MainLayout from '@/shared/layout/MainLayout';

// Feature pages — lazily imported to keep the bundle split per feature
import LoginPage from '@/features/auth/pages/LoginPage';
import DashboardPage from '@/features/dashboard/pages/DashboardPage';
import AlertsPage from '@/features/alerts/pages/AlertsPage';
import AlertDetailPage from '@/features/alerts/pages/AlertDetailPage';
import EventsPage from '@/features/events/pages/EventsPage';
import ReportsPage from '@/features/reports/pages/ReportsPage';
import ConfigurationPage from '@/features/configuration/pages/ConfigurationPage';
import SystemHealthPage from '@/features/system-health/pages/SystemHealthPage';

/**
 * AppRoutes
 *
 * Centralised routing configuration for SIACE.
 * The login route renders without the authenticated shell layout.
 * Every other route is wrapped inside MainLayout which provides
 * the Sidebar + Header chrome.
 */
const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === ROUTES.LOGIN;

  if (isLoginPage) {
    return (
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.ALERTS} element={<AlertsPage />} />
        <Route path={ROUTES.ALERT_DETAIL} element={<AlertDetailPage />} />
        <Route path={ROUTES.EVENTS} element={<EventsPage />} />
        <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
        <Route path={ROUTES.CONFIGURATION} element={<ConfigurationPage />} />
        <Route path={ROUTES.HEALTH} element={<SystemHealthPage />} />
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;
