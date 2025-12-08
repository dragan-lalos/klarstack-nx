/**
 * HTTP Client
 * Axios instance with interceptors for authentication and error handling
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { toApiError } from './api-error';
import { getToken, clearToken } from './token.storage';

// Create axios instance with default configuration
// The baseURL should be configured by the consuming application using configureHttpClient()
export const httpClient = axios.create({
  baseURL: '',
  withCredentials: false, // We use Bearer token, not cookies
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Configure the HTTP client with a custom base URL
 * This must be called by the consuming application before making any API requests
 * @param baseURL - The base URL for API requests
 * @example
 * ```typescript
 * // In your app initialization:
 * configureHttpClient(import.meta.env.VITE_API_URL);
 * ```
 */
export function configureHttpClient(baseURL: string): void {
  httpClient.defaults.baseURL = baseURL;
}

/**
 * Callback function to be invoked when a 401 Unauthorized response is received
 * This allows the auth system to react to authentication failures
 */
let onUnauthorized: (() => void) | null = null;

/**
 * Set the handler to be called on 401 responses
 * @param fn - Callback function to execute on unauthorized responses
 */
export function setUnauthorizedHandler(fn: () => void): void {
  onUnauthorized = fn;
}

/**
 * Request Interceptor
 * Automatically adds the Bearer token to requests if available
 */
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(toApiError(error));
  },
);

/**
 * Response Interceptor
 * Handles 401 Unauthorized responses and normalizes errors
 */
httpClient.interceptors.response.use(
  (response) => {
    // Pass through successful responses
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      clearToken();
      if (onUnauthorized) {
        onUnauthorized();
      }
    }

    // Always throw normalized ApiError
    return Promise.reject(toApiError(error));
  },
);
