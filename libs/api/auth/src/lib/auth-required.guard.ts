import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import type { ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

// Import the global Express.User type definition
import './auth.types';

/**
 * Requires authentication, but supports both:
 * - DevAuthGuard (attaches `req.user` in development)
 * - JWT AuthGuard('jwt') (passport-jwt) in environments where dev auth is disabled
 */
@Injectable()
export class AuthRequiredGuard extends AuthGuard('jwt') {
  override canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    // If a previous guard (e.g. DevAuthGuard) already authenticated the request,
    // don't force JWT.
    if (req.user && typeof req.user === 'object' && typeof req.user.id === 'string') {
      return true;
    }

    return super.canActivate(context);
  }
}
