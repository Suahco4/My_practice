import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Video, Users, Clock, ArrowUpRight, Plus, MoreVertical } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const data = [
  { name: 'Mon', sessions: 4 },
  { name: 'Tue', sessions: 3 },
  { name: 'Wed', sessions: 7 },
  { name: 'Thu', sessions: 5 },
  { name: 'Fri', sessions: 8 },
  { name: 'Sat', sessions: 2 },
  { name: 'Sun', sessions: 4 },
];

const RECENT_SESSIONS = [
  { id: 1, title: 'Q3 Product Roadmap Review', date: new Date(2023, 10, 15, 10, 0), duration: '45m', participants: 4 },
  { id: 2, title: 'Design System Sync', date: new Date(2023, 10, 14, 14, 30), duration: '1h 15m', participants: 6 },
  { id: 3, title: 'Weekly Team Standup', date: new Date(2023, 10, 14, 9, 0), duration: '15m', participants: 8 },
  { id: 4, title: 'Client Onboarding', date: new Date(2023, 10, 13, 11, 0), duration: '30m', participants: 2 },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Overview of your screen sharing activity.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Schedule</Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Session
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Sessions</p>
              <Video className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">128</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="h-4 w-4" /> +12%
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Duration</p>
              <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">42h 15m</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="h-4 w-4" /> +4%
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Participants</p>
              <Users className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">14</div>
              <div className="text-xs text-slate-500">Across 3 teams</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Upcoming</p>
              <Video className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </div>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-slate-500">Next: Tomorrow 10:00 AM</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-slate-800" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="sessions" stroke="#6366f1" fillOpacity={1} fill="url(#colorSessions)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {RECENT_SESSIONS.map((session) => (
                <div key={session.id} className="flex items-center">
                  <Avatar className="h-9 w-9" fallback={session.title[0]} />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{session.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {format(session.date, 'MMM d, h:mm a')}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-4">
                     <span className="text-sm text-slate-500">{session.duration}</span>
                     <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                     </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
