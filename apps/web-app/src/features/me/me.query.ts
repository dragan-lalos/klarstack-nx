import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '../../shared/api/api-client';
import { type ApiMeResponse } from '../../shared/api/api.types';
import { useAuth } from '../auth/auth.store';
import { useWorkspace } from '../workspaces/workspace.store';

/**
 * Fetches the current user and memberships.
 */
export const useMe = () => {
  const { token } = useAuth();
  const { currentWorkspaceId } = useWorkspace();

  const query = useQuery({
    queryKey: ['me', currentWorkspaceId],
    queryFn: () => apiFetch<ApiMeResponse>('/me', { skipWorkspaceHeader: true }),
    enabled: Boolean(token),
    staleTime: 30_000,
  });

  return {
    user: query.data?.user ?? null,
    memberships: query.data?.memberships ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
};
