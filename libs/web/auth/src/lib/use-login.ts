/**
 * use-login Hook
 * React Query mutation hook for login functionality
 */

import { login as apiLogin, type LoginRequest, ApiError } from '@klastack-nx/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

/**
 * Options for the useAuth hook dependency
 */
interface UseLoginOptions {
  setToken: (token: string) => void;
}

/**
 * Login mutation hook
 * Handles login API call, token storage, and navigation
 */
export function useLogin(options: UseLoginOptions) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<{ access_token: string }, ApiError, LoginRequest>({
    mutationFn: apiLogin,
    onSuccess: (data) => {
      // Store token via AuthProvider
      options.setToken(data.access_token);

      // Navigate to live-ops
      navigate('/live-ops', { replace: true });
    },
    onError: (error) => {
      // Error is already normalized to ApiError by http-client interceptor
      // Component can access via mutation.error
      console.error('Login failed:', error.message);
    },
    // Clear any cached data on logout/login
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });
}
