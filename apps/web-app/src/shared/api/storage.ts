export type StorageKey = 'devAuthToken' | 'currentWorkspaceId';

type StorageValueMap = {
  devAuthToken: string;
  currentWorkspaceId: string;
};

/**
 * Typed localStorage helper for auth/workspace state.
 */
export const appStorage = {
  get<K extends StorageKey>(key: K): StorageValueMap[K] | null {
    try {
      const value = localStorage.getItem(key);
      return value ? (value as StorageValueMap[K]) : null;
    } catch {
      return null;
    }
  },
  set<K extends StorageKey>(key: K, value: StorageValueMap[K]): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore storage write errors (private mode or quota).
    }
  },
  remove(key: StorageKey): void {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore storage removal errors.
    }
  },
};
