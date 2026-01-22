import { useQuery } from '@tanstack/react-query';
import { useEffect, useSyncExternalStore } from 'react';

import { apiFetch } from '../../shared/api/api-client';
import { type ApiWorkspace } from '../../shared/api/api.types';
import { appStorage } from '../../shared/api/storage';
import { useAuth } from '../auth/auth.store';

interface WorkspaceState {
  currentWorkspaceId: string | null;
  workspaces: ApiWorkspace[];
}

const listeners = new Set<() => void>();

let state: WorkspaceState = {
  currentWorkspaceId: appStorage.get('currentWorkspaceId'),
  workspaces: [],
};

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const setState = (next: WorkspaceState) => {
  state = next;
  emitChange();
};

/**
 * Store for workspace selection and cached list.
 */
export const workspaceStore = {
  getState: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  setWorkspaceId: (workspaceId: string | null) => {
    state = { ...state, currentWorkspaceId: workspaceId };
    if (workspaceId) {
      appStorage.set('currentWorkspaceId', workspaceId);
    } else {
      appStorage.remove('currentWorkspaceId');
    }
    emitChange();
  },
  setWorkspaces: (workspaces: ApiWorkspace[]) => {
    setState({ ...state, workspaces });
  },
};

/**
 * Hook to access workspace state and fetch available workspaces.
 */
export const useWorkspace = () => {
  const snapshot = useSyncExternalStore(workspaceStore.subscribe, workspaceStore.getState);
  const { token } = useAuth();

  const workspacesQuery = useQuery({
    queryKey: ['workspaces'],
    queryFn: () => apiFetch<ApiWorkspace[]>('/workspaces', { skipWorkspaceHeader: true }),
    enabled: Boolean(token),
    staleTime: 60_000,
  });

  useEffect(() => {
    if (workspacesQuery.data) {
      workspaceStore.setWorkspaces(workspacesQuery.data);
    }
  }, [workspacesQuery.data]);

  useEffect(() => {
    if (!workspacesQuery.data) {
      return;
    }
    const list = workspacesQuery.data;
    if (!snapshot.currentWorkspaceId && list.length > 0) {
      workspaceStore.setWorkspaceId(list[0].id);
      return;
    }
    if (snapshot.currentWorkspaceId && !list.find((ws) => ws.id === snapshot.currentWorkspaceId)) {
      workspaceStore.setWorkspaceId(list[0]?.id ?? null);
    }
  }, [snapshot.currentWorkspaceId, workspacesQuery.data]);

  return {
    currentWorkspaceId: snapshot.currentWorkspaceId,
    workspaces: workspacesQuery.data ?? snapshot.workspaces,
    setWorkspaceId: workspaceStore.setWorkspaceId,
    isLoading: workspacesQuery.isLoading,
    error: workspacesQuery.error,
  };
};
