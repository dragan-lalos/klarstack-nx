import { useSyncExternalStore } from 'react';

import { appStorage } from '../../shared/api/storage';

interface AuthState {
  token: string | null;
}

const listeners = new Set<() => void>();

let state: AuthState = {
  token: appStorage.get('devAuthToken'),
};

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

/**
 * Minimal auth store for dev-token auth.
 */
export const authStore = {
  getState: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  login: (token: string) => {
    state = { token };
    appStorage.set('devAuthToken', token);
    emitChange();
  },
  logout: () => {
    state = { token: null };
    appStorage.remove('devAuthToken');
    emitChange();
  },
};

/**
 * Hook to access auth state and actions.
 */
export const useAuth = () => {
  const snapshot = useSyncExternalStore(authStore.subscribe, authStore.getState);
  const isAuthenticated = Boolean(snapshot.token);

  return {
    token: snapshot.token,
    isAuthenticated,
    login: authStore.login,
    logout: authStore.logout,
  };
};
