import type { UserRole } from '@klastack-nx/shared/users';

/**
 * Login DTO
 */
export interface LoginDto {
  email: string;
  password: string;
}

/**
 * Login Response DTO
 */
export interface LoginResponseDto {
  access_token: string;
}

/**
 * JWT Payload Interface
 * Defines the structure of data encoded in JWT tokens
 */
export interface JwtPayload {
  /**
   * Subject: user ID (UUID)
   */
  sub: string;

  /**
   * User email
   */
  email: string;

  /**
   * User role (for authorization)
   */
  role: string;
}

/**
 * Global Express type augmentations for authentication
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    /**
     * Authenticated user shape attached to `req.user` by either:
     * - JwtStrategy (passport-jwt)
     * - DevAuthGuard (development-only)
     */
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface User {
      id: string;
      email: string;
      role?: UserRole;
      // Back-compat (dev auth previously used `userId`)
      userId?: string;
    }
  }
}

export {};
