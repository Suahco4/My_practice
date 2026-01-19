import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  teamId?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async (email) => {
    set({ isLoading: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    set({
      isLoading: false,
      isAuthenticated: true,
      user: {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        role: 'user',
        teamId: 'team-1',
      },
    });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  updateProfile: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),
}));
