import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export const DashboardLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col selection:bg-purple-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area with Sidebar */}
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
        {/* Animated Sidebar for Desktop */}
        <div className="hidden lg:block shrink-0">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>

        {/* Dynamic Page Content View */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
