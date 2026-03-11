import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout
 *
 * Shell layout rendered for every authenticated route.
 * Composes the persistent Sidebar and top Header, then
 * renders the active page content inside the scrollable
 * main region.
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-dark text-white">
      <Sidebar />
      <div className="flex flex-1 flex-col h-full overflow-hidden relative">
        {/* Abstract background pattern for authenticated pages */}
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, #1f8fff 0%, transparent 25%), radial-gradient(circle at 10% 80%, #0B3C5D 0%, transparent 30%)',
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

export default MainLayout;
