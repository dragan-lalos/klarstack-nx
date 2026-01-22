import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiFetch } from '../../shared/api/api-client';
import { ApiUser } from '../../shared/api/api.types';

interface UpdateMePayload {
  displayName?: string;
  timezone?: string;
  emailNotifications?: boolean;
}

/**
 * Hook to update current user settings.
 */
export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: UpdateMePayload) =>
      apiFetch<ApiUser>('/me', {
        method: 'PATCH',
        body: payload,
        skipWorkspaceHeader: true,
      }),
    onSuccess: () => {
      // Invalidate the /me query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  return {
    updateMe: mutation.mutate,
    updateMeAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
