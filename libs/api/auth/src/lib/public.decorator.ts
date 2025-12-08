import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ROUTE = 'isPublicRoute';

/**
 * Marks a route as public (no auth required).
 *
 * Used primarily to bypass the global DevAuthGuard for endpoints like `/health`.
 */
export const Public = (): ReturnType<typeof SetMetadata> => SetMetadata(IS_PUBLIC_ROUTE, true);
