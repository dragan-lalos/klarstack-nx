import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorType } from './error.types';

export interface ProblemDetails {
  type: ErrorType;
  /**
   * Optional, stable error code for clients.
   * Used for simple machine-readable branching (e.g. WORKSPACE_HEADER_REQUIRED).
   */
  code?: string;
  title: string;
  status: HttpStatus;
  detail?: string;
  instance: string;
  traceId: string;
  timestamp: string;
  debug?: Record<string, unknown>;
}

export interface AppExceptionOptions {
  type: ErrorType;
  title: string;
  detail?: string;
  status: HttpStatus;
  meta?: Record<string, unknown>;
  cause?: unknown;
}

/**
 * Base application exception for RFC7807-style problem details.
 * Carries safe, user-facing information; internal metadata stays server-side.
 */
export class AppException extends HttpException {
  readonly type: ErrorType;
  readonly title: string;
  readonly detail?: string;
  readonly meta?: Record<string, unknown>;

  constructor(options: AppExceptionOptions) {
    const { type, title, detail, status, meta, cause } = options;
    const safeDetail = detail ?? title;
    // Pass cause to parent HttpException if provided
    super(
      { type, title, status, detail: safeDetail },
      status,
      cause !== undefined ? { cause } : undefined,
    );
    this.type = type;
    this.title = title;
    this.detail = safeDetail;
    this.meta = meta;
    this.name = 'AppException';
  }

  toProblemDetails(
    instance: string,
    traceId: string,
    debug?: Record<string, unknown>,
  ): ProblemDetails {
    const payload: ProblemDetails = {
      type: this.type,
      title: this.title,
      status: this.getStatus(),
      detail: this.detail,
      instance,
      traceId,
      timestamp: new Date().toISOString(),
    };

    if (debug && Object.keys(debug).length > 0) {
      payload.debug = debug;
    }

    return payload;
  }
}
