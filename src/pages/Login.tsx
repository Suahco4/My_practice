import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Video } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await login(email);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-2xl bg-indigo-600 p-4">
              <Video className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl">Welcome back</CardTitle>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Enter your email to sign in to your account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="name@example.com"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" onClick={() => setEmail('demo@nexus.com')}>
                Demo User
              </Button>
              <Button variant="outline" type="button" onClick={() => setEmail('admin@nexus.com')}>
                Admin
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
