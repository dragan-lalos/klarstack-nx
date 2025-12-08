/**
 * use-logout Hook
 * Hook for logout functionality
 */

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

/**
 * Options for the useLogout hook
 */
interface UseLogoutOptions {
  clearToken: () => void;
}

/**
 * Logout hook
 * Handles token clearing, cache clearing, and navigation
 */
export function useLogout(options: UseLogoutOptions) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    // Clear token via AuthProvider
    options.clearToken();

    // Clear React Query cache
    queryClient.clear();

    // Navigate to login
    navigate('/login', { replace: true });
  };
}
