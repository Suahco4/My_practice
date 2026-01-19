import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';

export const Header = () => {
  const { user } = useAuthStore();
  const { theme, setTheme, notifications } = useUIStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b border-slate-200 bg-white/80 px-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <Input
            placeholder="Search..."
            className="pl-9"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
          )}
        </Button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4 dark:border-slate-800">
          <div className="hidden text-right md:block">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
          </div>
          <Avatar src={user?.avatar} fallback={user?.name || 'U'} />
        </div>
      </div>
    </header>
  );
};
