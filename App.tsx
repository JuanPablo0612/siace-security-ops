import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import AlertDetail from './pages/AlertDetail';
import Configuration from './pages/Configuration';
import SystemHealth from './pages/SystemHealth';
import Events from './pages/Events';
import Reports from './pages/Reports';
import Login from './pages/Login';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-dark text-white">
      <Sidebar />
      <div className="flex flex-1 flex-col h-full overflow-hidden relative">
        {/* Abstract Background Pattern for all authenticated pages */}
        <div 
          className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 20%, #1f8fff 0%, transparent 25%), radial-gradient(circle at 10% 80%, #0B3C5D 0%, transparent 30%)'
          }}
        />
        <Header />
        <main className="z-10 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/alerts/:id" element={<AlertDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/health" element={<SystemHealth />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}