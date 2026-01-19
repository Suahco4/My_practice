import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/utils/cn';

export const AppLayout = () => {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      <div
        className={cn(
          'flex min-h-screen flex-col transition-all duration-300',
          isSidebarOpen ? 'ml-64' : 'ml-20'
        )}
      >
        <Header />
        <main className="flex-1 p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
