import type { MembershipRole } from '@klastack-nx/shared/users';
import type { Request } from 'express';

// Import Express.User type from auth library
import '@klastack-nx/api/auth';

/**
 * Express request augmented with a correlation/trace ID.
 *
 * The `TraceIdMiddleware` attaches `traceId` so downstream handlers can log and
 * return it to clients (e.g. via `x-trace-id`).
 */
export interface TraceableRequest extends Request {
  traceId?: string;
}

export interface WorkspaceRequestContext {
  id: string;
  role: MembershipRole;
}

/**
 * Extend Express.Request with workspace and traceId
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      traceId?: string;
      workspace?: WorkspaceRequestContext;
    }
  }
}

export {};
