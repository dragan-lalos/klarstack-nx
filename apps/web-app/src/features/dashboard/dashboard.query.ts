import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '../../shared/api/api-client';
import { useAuth } from '../auth/auth.store';
import { useWorkspace } from '../workspaces/workspace.store';

interface WorkspaceStats {
  memberCount: number;
  activeProjects: number;
  pendingInvites: number;
}

/**
 * Fetches workspace-scoped stats (demonstrates x-workspace-id header).
 * This endpoint requires workspace context.
 */
export const useWorkspaceStats = () => {
  const { token } = useAuth();
  const { currentWorkspaceId } = useWorkspace();

  const query = useQuery({
    queryKey: ['workspace-stats', currentWorkspaceId],
    queryFn: () => apiFetch<WorkspaceStats>('/stats'),
    enabled: Boolean(token) && Boolean(currentWorkspaceId),
    staleTime: 30_000,
  });

  return {
    stats: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error,
  };
};
