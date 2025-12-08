/**
 * API Client Library
 * Pure data-access layer for HTTP communication
 */

// Token storage
export { getToken, setToken, clearToken } from './lib/token.storage';

// Error handling
export { ApiError, toApiError } from './lib/api-error';

// HTTP client
export { httpClient, setUnauthorizedHandler, configureHttpClient } from './lib/http-client';

// API endpoints
export { login } from './lib/auth.api';
export type { LoginRequest, LoginResponse } from './lib/auth.api';
