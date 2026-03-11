import React from 'react';
import { HashRouter } from 'react-router-dom';
import AppRoutes from './routes';

/**
 * App
 *
 * Application entry point. Wraps the router provider and mounts
 * the centralised route configuration. Additional global providers
 * (e.g. AuthContext, ThemeContext, QueryClientProvider) should be
 * added here, wrapping AppRoutes.
 */
const App: React.FC = () => {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
};

export default App;
