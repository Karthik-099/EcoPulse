import { create } from 'zustand';
import api from '@/lib/api';

interface User {
  id: string;
  email: string;
  username: string;
  coinBalance: number;
  ecoScore: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    set({ user: response.data.user, isAuthenticated: true });
  },
  
  register: async (email, username, password) => {
    const response = await api.post('/auth/register', { email, username, password });
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    set({ user: response.data.user, isAuthenticated: true });
  },
  
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ user: null, isAuthenticated: false });
  },
  
  fetchProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
