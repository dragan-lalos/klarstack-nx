/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it } from 'vitest';

import { appStorage } from './storage';

describe('appStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and retrieves the dev auth token', () => {
    appStorage.set('devAuthToken', 'dev');
    expect(appStorage.get('devAuthToken')).toBe('dev');
  });

  it('stores and removes the workspace id', () => {
    appStorage.set('currentWorkspaceId', 'workspace-1');
    appStorage.remove('currentWorkspaceId');
    expect(appStorage.get('currentWorkspaceId')).toBeNull();
  });
});
