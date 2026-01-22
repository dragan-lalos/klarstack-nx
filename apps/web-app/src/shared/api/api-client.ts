import { ApiError, type ApiErrorPayload } from './api.types';
import { appStorage } from './storage';
import { authStore } from '../../features/auth/auth.store';

const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  /**
   * If true, skip sending the x-workspace-id header.
   * Use for endpoints that don't require workspace context (e.g., /workspaces, /me).
   */
  skipWorkspaceHeader?: boolean;
}

/**
 * Typed API client wrapper around fetch.
 */
export const apiFetch = async <T>(path: string, options: ApiRequestOptions = {}): Promise<T> => {
  const { body, headers, skipWorkspaceHeader, ...rest } = options;
  const token = appStorage.get('devAuthToken');
  const workspaceId = appStorage.get('currentWorkspaceId');

  const requestHeaders = new Headers(headers);
  requestHeaders.set('accept', 'application/json');

  if (token) {
    requestHeaders.set('x-dev-auth', token);
  }
  if (workspaceId && !skipWorkspaceHeader) {
    requestHeaders.set('x-workspace-id', workspaceId);
  }

  const requestBody =
    body === undefined || body instanceof FormData ? body : JSON.stringify(body);
  if (requestBody && !(requestBody instanceof FormData)) {
    requestHeaders.set('content-type', 'application/json');
  }

  const url = baseUrl ? `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}` : path;

  const response = await fetch(url, {
    ...rest,
    headers: requestHeaders,
    body: requestBody as BodyInit | null | undefined,
  });

  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (response.status === 401) {
      authStore.logout();
    }
    const message =
      typeof payload === 'object' && payload !== null && 'message' in payload
        ? String((payload as ApiErrorPayload).message ?? 'Request failed')
        : 'Request failed';
    throw new ApiError(response.status, message, payload as ApiErrorPayload);
  }

  return payload as T;
};
