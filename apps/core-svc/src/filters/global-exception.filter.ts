import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { AppException, ErrorType, ErrorTypes, ProblemDetails } from '../errors';
import { AppLogger } from '../logger/app-logger.service';

import type { TraceableRequest } from '../types/express';
import type { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: AppLogger,
    private readonly debugResolver: () => boolean,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<TraceableRequest & Request>();

    const traceId = request.traceId ?? randomUUID();
    const instance = request.originalUrl ?? request.url ?? 'unknown';
    const timestamp = new Date().toISOString();
    response.setHeader('x-trace-id', traceId);

    const debugEnabled = this.debugResolver();
    const problem = this.buildProblemDetails(
      exception,
      instance,
      traceId,
      timestamp,
      request,
      debugEnabled,
    );

    response.status(problem.status).json(problem);
  }

  private buildProblemDetails(
    exception: unknown,
    instance: string,
    traceId: string,
    timestamp: string,
    request: TraceableRequest & Request,
    debugEnabled: boolean,
  ): ProblemDetails {
    if (exception instanceof AppException) {
      const status = exception.getStatus();
      const debug = debugEnabled
        ? this.buildDebugBlock(exception, exception.meta, (exception as any).cause)
        : undefined;
      const code = this.extractErrorCode(exception);

      this.logger.warn(exception.title, 'GlobalExceptionFilter', {
        type: exception.type,
        status,
        traceId,
      });

      return {
        type: exception.type,
        ...(code ? { code } : {}),
        title: exception.title,
        status,
        detail: exception.detail,
        instance,
        traceId,
        timestamp,
        ...(debug ? { debug } : {}),
      };
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const type = this.deriveHttpErrorType(request, status);
      const detail =
        status >= HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Unexpected error occurred'
          : this.extractSafeDetail(exception);
      const title = this.httpStatusTitle(status);
      const code = this.extractErrorCode(exception);
      const debug = debugEnabled
        ? this.buildDebugBlock(exception, undefined, exception.cause)
        : undefined;

      this.logger.warn(title, 'GlobalExceptionFilter', {
        type,
        status,
        traceId,
      });

      return {
        type,
        ...(code ? { code } : {}),
        title,
        status,
        detail,
        instance,
        traceId,
        timestamp,
        ...(debug ? { debug } : {}),
      };
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const debug = debugEnabled ? this.buildDebugBlock(exception) : undefined;
    const problem: ProblemDetails = {
      type: ErrorTypes.INTERNAL_UNEXPECTED,
      title: 'Internal Server Error',
      status,
      detail: 'Unexpected error occurred',
      instance,
      traceId,
      timestamp,
      ...(debug ? { debug } : {}),
    };

    this.logger.error(
      'Unhandled exception',
      this.extractStack(exception),
      'GlobalExceptionFilter',
      {
        type: ErrorTypes.INTERNAL_UNEXPECTED,
        traceId,
        status,
        cause: this.extractCause(exception),
      },
    );

    return problem;
  }

  private deriveHttpErrorType(request: Request, status: number): ErrorType {
    const namespace = this.extractNamespace(request);
    const suffix =
      status === HttpStatus.BAD_REQUEST
        ? 'badRequest'
        : status === HttpStatus.UNAUTHORIZED
          ? 'unauthorized'
          : status === HttpStatus.FORBIDDEN
            ? 'forbidden'
            : status === HttpStatus.NOT_FOUND
              ? 'notFound'
              : 'error';

    return `${namespace}.${suffix}`;
  }

  private extractNamespace(request: Request): string {
    const path = (request.originalUrl ?? request.url ?? '').split('?')[0];
    const segments = path.split('/').filter(Boolean);
    const apiIndex = segments.indexOf('api');
    const namespace = apiIndex >= 0 ? segments[apiIndex + 1] : segments[0];
    const normalized = namespace ? namespace.toLowerCase() : 'internal';
    return normalized.endsWith('s') && normalized.length > 1 ? normalized.slice(0, -1) : normalized;
  }

  private extractSafeDetail(exception: HttpException): string | undefined {
    const response = exception.getResponse();
    if (typeof response === 'string') {
      return response;
    }

    if (typeof response === 'object' && response !== null) {
      const message = (response as any).message;
      if (Array.isArray(message)) {
        return message.join('; ');
      }
      if (typeof message === 'string') {
        return message;
      }
      const error = (response as any).error;
      if (typeof error === 'string') {
        return error;
      }
    }

    return exception.message;
  }

  /**
   * Extract an optional stable error code from HttpException responses.
   *
   * We intentionally do not rely on `type` for this purpose because `type`
   * is namespaced to the route (e.g. `tenant.forbidden`), while `code` is
   * meant to be stable across endpoints.
   */
  private extractErrorCode(exception: HttpException): string | undefined {
    const response = exception.getResponse();
    if (typeof response === 'object' && response !== null) {
      const code = (response as { code?: unknown }).code;
      return typeof code === 'string' && code.length ? code : undefined;
    }
    return undefined;
  }

  private httpStatusTitle(status: number): string {
    const key = HttpStatus[status] as string | undefined;
    if (!key) {
      return 'Error';
    }
    const formatted = key.toLowerCase().replace(/_/g, ' ');
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  private buildDebugBlock(
    exception: unknown,
    meta?: Record<string, unknown>,
    cause?: unknown,
  ): Record<string, unknown> {
    const debug: Record<string, unknown> = {};
    const stack = this.extractStack(exception);
    if (exception instanceof Error) {
      debug.message = exception.message;
    }
    if (stack) {
      debug.stack = stack;
    }
    const causeSummary = this.extractCause(cause ?? (exception as any)?.cause);
    if (causeSummary) {
      debug.cause = causeSummary;
    }
    if (meta && Object.keys(meta).length) {
      debug.meta = meta;
    }
    return debug;
  }

  private extractStack(exception: unknown): string | undefined {
    if (exception instanceof Error && exception.stack) {
      return exception.stack;
    }
    return undefined;
  }

  private extractCause(cause: unknown): unknown {
    if (!cause) return undefined;
    if (cause instanceof Error) {
      return { name: cause.name, message: cause.message, stack: cause.stack };
    }
    return cause;
  }
}
