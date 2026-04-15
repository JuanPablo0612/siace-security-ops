import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { tokenStorage } from '@/shared/services/apiClient';
import MainLayout from '@/shared/layout/MainLayout';

import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import DashboardPage from '@/features/dashboard/pages/DashboardPage';
import AlertsPage from '@/features/alerts/pages/AlertsPage';
import AlertDetailPage from '@/features/alerts/pages/AlertDetailPage';
import EventsPage from '@/features/events/pages/EventsPage';
import ReportsPage from '@/features/reports/pages/ReportsPage';
import ConfigurationPage from '@/features/configuration/pages/ConfigurationPage';
import SystemHealthPage from '@/features/system-health/pages/SystemHealthPage';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = !!tokenStorage.getAccessToken();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isPublicPage =
    location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.REGISTER;

  if (isPublicPage) {
    return (
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Routes>
    );
  }

  return (
    <RequireAuth>
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
    </RequireAuth>
  );
};

export default AppRoutes;
