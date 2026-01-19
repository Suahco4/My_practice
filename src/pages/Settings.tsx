import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Bell, Camera, Mic, Monitor, User } from 'lucide-react';
import { cn } from '@/utils/cn';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'av', label: 'Audio & Video', icon: Camera },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex gap-6">
      <Card className="h-fit w-64 p-2">
        <div className="space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      <div className="flex-1 space-y-6">
        {activeTab === 'profile' && (
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="First Name" defaultValue="John" />
                <Input label="Last Name" defaultValue="Doe" />
              </div>
              <Input label="Email" defaultValue="john.doe@example.com" disabled />
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        )}

        {activeTab === 'av' && (
          <Card>
            <CardHeader>
              <CardTitle>Audio & Video</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Camera</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                  <Camera className="h-4 w-4 text-slate-500" />
                  <select className="flex-1 bg-transparent text-sm outline-none">
                    <option>FaceTime HD Camera</option>
                    <option>External Webcam</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Microphone</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                  <Mic className="h-4 w-4 text-slate-500" />
                  <select className="flex-1 bg-transparent text-sm outline-none">
                    <option>MacBook Pro Microphone</option>
                    <option>External USB Mic</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Speakers</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                  <Monitor className="h-4 w-4 text-slate-500" />
                  <select className="flex-1 bg-transparent text-sm outline-none">
                    <option>MacBook Pro Speakers</option>
                    <option>Headphones</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                 <input type="checkbox" id="noise-cancellation" className="h-4 w-4 rounded border-slate-300" defaultChecked />
                 <label htmlFor="noise-cancellation" className="text-sm">Enable noise cancellation</label>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'notifications' && (
          <Card>
            <CardHeader>
               <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <div className="text-sm font-medium">Meeting reminders</div>
                     <div className="text-xs text-slate-500">Receive notifications before meetings start</div>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
               </div>
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <div className="text-sm font-medium">Chat messages</div>
                     <div className="text-xs text-slate-500">Notify when you receive a message</div>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
               </div>
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <div className="text-sm font-medium">Participant joins</div>
                     <div className="text-xs text-slate-500">Notify when someone joins your meeting</div>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
               </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
