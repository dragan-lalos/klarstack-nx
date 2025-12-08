/**
 * API Error
 * Normalized error class for API responses
 */

import { AxiosError } from 'axios';

/**
 * ApiError class
 * Provides a consistent error structure for API failures
 */
export class ApiError extends Error {
  status?: number;
  code?: string;
  details?: unknown;

  constructor(message: string, status?: number, code?: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

/**
 * Normalize axios errors into ApiError instances
 * @param err - Unknown error from axios or elsewhere
 * @returns Normalized ApiError
 */
export function toApiError(err: unknown): ApiError {
  // Already an ApiError
  if (err instanceof ApiError) {
    return err;
  }

  // Axios error with response
  if (err && typeof err === 'object' && 'isAxiosError' in err) {
    const axiosError = err as AxiosError<{
      message?: string;
      error?: string;
      code?: string;
    }>;

    if (axiosError.response) {
      const { status, data } = axiosError.response;
      const message = data?.message || data?.error || `Request failed with status ${status}`;
      return new ApiError(message, status, data?.code, data);
    }

    // Network error (no response)
    if (axiosError.request) {
      return new ApiError(
        'Network error - please check your connection',
        undefined,
        'NETWORK_ERROR',
        { originalError: axiosError.message },
      );
    }
  }

  // Generic error
  if (err instanceof Error) {
    return new ApiError(err.message, undefined, undefined, { originalError: err });
  }

  // Unknown error type
  return new ApiError('An unexpected error occurred', undefined, undefined, { originalError: err });
}
