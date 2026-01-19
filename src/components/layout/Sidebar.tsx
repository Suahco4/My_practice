import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUIStore } from '@/store/useUIStore';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/utils/cn';
import { 
  LayoutDashboard, 
  Video, 
  MessageSquare, 
  Settings, 
  Users, 
  Clock, 
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const { logout } = useAuthStore();

  const links = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/session/new', label: 'New Session', icon: Video },
    { href: '/chat', label: 'Messages', icon: MessageSquare },
    { href: '/team', label: 'Team', icon: Users },
    { href: '/history', label: 'History', icon: Clock },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-white transition-all duration-300 border-r border-slate-200 dark:bg-slate-950 dark:border-slate-800',
        isSidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex h-full flex-col justify-between p-4">
        <div className="space-y-8">
          <div className="flex h-12 items-center justify-between">
            {isSidebarOpen ? (
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Nexus Share</span>
            ) : (
              <span className="mx-auto text-xl font-bold text-indigo-600 dark:text-indigo-400">NS</span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={cn("hidden md:flex", !isSidebarOpen && "mx-auto")}
            >
              <ChevronLeft className={cn("transition-transform", !isSidebarOpen && "rotate-180")} />
            </Button>
          </div>

          <nav className="space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center rounded-lg px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50',
                    isActive && 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
                    !isSidebarOpen && 'justify-center'
                  )
                }
              >
                <link.icon className={cn("h-5 w-5", isSidebarOpen && "mr-3")} />
                {isSidebarOpen && <span>{link.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20",
              !isSidebarOpen && "px-0 justify-center"
            )}
            onClick={logout}
          >
            <LogOut className={cn("h-5 w-5", isSidebarOpen && "mr-3")} />
            {isSidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};
