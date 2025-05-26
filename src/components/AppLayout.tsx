
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const AppLayout: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex h-screen bg-gray-50">
      {!isMobile && (
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
