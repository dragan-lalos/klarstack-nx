import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import type { WorkspaceRequestContext } from './tenancy.types';
import type { Request } from 'express';

/**
 * Extracts the verified workspace context from the request.
 *
 * Requires `WorkspaceGuard` to have run for the route.
 */
export const CurrentWorkspace = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): WorkspaceRequestContext | undefined => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return req.workspace;
  },
);
