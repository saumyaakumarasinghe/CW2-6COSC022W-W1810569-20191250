import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';
import { AuthResponse, ApiErrorResponse } from '@/types/api';
import { useRouter } from 'next/navigation';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  username: string;
  email: string;
  mobile: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { login, logout, setError, clearError } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation<AuthResponse, ApiErrorResponse, LoginCredentials>({
    mutationFn: async (credentials) => {
      const { data } = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      login(data.user.email, data.token);
      router.push('/dashboard');
      clearError();
    },
    onError: (error) => {
      setError(error.response?.data?.message || 'Login failed');
    },
  });

  // Signup mutation
  const signupMutation = useMutation<AuthResponse, ApiErrorResponse, SignupCredentials>({
    mutationFn: async (credentials) => {
      const { data } = await axiosInstance.post<AuthResponse>('/auth/signup', credentials);
      return data;
    },
    onSuccess: (data) => {
      login(data.user.email, data.token);
      router.push('/dashboard');
      clearError();
    },
    onError: (error) => {
      setError(error.response?.data?.message || 'Signup failed');
    },
  });

  // Logout function
  const handleLogout = () => {
    logout();
    queryClient.clear(); // Clear all queries from cache
    router.push('/login');
  };

  return {
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout: handleLogout,
    isLoading: loginMutation.isPending || signupMutation.isPending,
    error: useAuthStore((state) => state.error),
    clearError,
  };
}
