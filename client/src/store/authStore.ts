import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '@/lib/axios';

interface User {
  id: number;
  firstName: string | null;
  lastName: string | null;
  userName: string;
  email: string;
  status: boolean;
}

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

interface RegisterData {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setError: (error: string) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setError: (error: string) => set({ error }),
      clearError: () => set({ error: null }),

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const { data } = await axiosInstance.post<LoginResponse>('/v1/oauth/login', {
            email,
            password,
          });

          // Set auth header for future requests
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: unknown) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        try {
          set({ isLoading: true, error: null });
          await axiosInstance.post<LoginResponse>('/v1/oauth/register', data);
          set({ isLoading: false });
        } catch (error: unknown) {
          set({
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        delete axiosInstance.defaults.headers.common['Authorization'];
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Initialize axios headers from stored token
const token = useAuthStore.getState().token;
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
