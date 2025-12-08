import { IS_PUBLIC_ROUTE } from '@klastack-nx/api/auth';
import { UserEntity, UserRole } from '@klastack-nx/shared/users';
import { EntityManager } from '@mikro-orm/postgresql';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { timingSafeEqual } from 'node:crypto';
/**
 * Development Authentication Guard
 *
 * Provides a simple token-based authentication for development environments.
 * This guard is designed to be DISABLED in production via environment variables.
 *
 * Environment Variables:
 * - DEV_AUTH_ENABLED: 'true' to enable, 'false' to disable (default: true when NODE_ENV !== 'production')
 * - DEV_AUTH_TOKEN: The token to match against (default: 'dev')
 *
 * Usage:
 * - Header: x-dev-auth: <token>
 * - If DEV_AUTH_ENABLED=false, this guard allows all requests through
 * - If DEV_AUTH_ENABLED=true, requests must include valid x-dev-auth header
 * - If header matches token, attaches req.user to the request
 * - If header is missing or mismatched, returns 401 Unauthorized
 *
 * Security:
 * - Production hard fail: If NODE_ENV=production and DEV_AUTH_ENABLED=true,
 *   the app will throw an error during bootstrap (handled in main.ts)
 * - Uses timingSafeEqual for constant-time string comparison
 * - Loads a real user from DB (fallback to first admin user)
 *
 * @example
 * // Apply globally in AppModule
 * providers: [
 *   { provide: APP_GUARD, useClass: DevAuthGuard },
 * ]
 *
 * @example
 * // Or apply to specific controllers/routes
 * @UseGuards(DevAuthGuard)
 * @Controller('api')
 * export class ApiController {}
 */
@Injectable()
export class DevAuthGuard implements CanActivate {
  private readonly logger = new Logger(DevAuthGuard.name);
  private readonly enabled: boolean;
  private readonly token: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly em: EntityManager,
    private readonly reflector: Reflector,
  ) {
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');

    // Default: enabled in dev, disabled in production
    const devAuthEnabled = this.configService.get<string>('DEV_AUTH_ENABLED');

    if (devAuthEnabled !== undefined) {
      this.enabled = devAuthEnabled.toLowerCase() === 'true';
    } else {
      // If not explicitly set, enable for non-production
      this.enabled = nodeEnv !== 'production';
    }

    this.token = this.configService.get<string>('DEV_AUTH_TOKEN', 'dev');

    if (this.enabled) {
      this.logger.warn('⚠️  DEV_AUTH is ENABLED. This should NOT be used in production!');
      this.logger.log(`🔑 Dev auth token configured (length: ${this.token.length})`);
    } else {
      this.logger.log('✅ DEV_AUTH is DISABLED. All requests will pass through.');
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Allow explicitly-public routes (e.g. /health) even when dev auth is enabled
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ROUTE, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // If dev auth is disabled, allow all requests
    if (!this.enabled) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const headerToken = request.headers['x-dev-auth'];

    // Missing header
    if (!headerToken) {
      this.logger.warn('Missing x-dev-auth header');
      throw new UnauthorizedException('Missing x-dev-auth header');
    }

    // Validate token using timing-safe comparison
    const isValid = this.validateToken(
      typeof headerToken === 'string' ? headerToken : headerToken[0],
    );

    if (!isValid) {
      this.logger.warn('Invalid x-dev-auth token');
      throw new UnauthorizedException('Invalid x-dev-auth token');
    }

    // Load dev user from database
    const user = await this.loadDevUser();

    if (!user) {
      this.logger.error('No dev user found in database. Run seed first.');
      throw new UnauthorizedException('No dev user available');
    }

    // Attach user to request
    (request as any).user = {
      // Keep `id` as the canonical key (matches JwtStrategy output)
      id: user.id,
      // Back-compat for any existing code that used `userId`
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return true;
  }

  /**
   * Validate token using constant-time comparison to prevent timing attacks
   */
  private validateToken(providedToken: string): boolean {
    try {
      const expectedBuffer = Buffer.from(this.token);
      const providedBuffer = Buffer.from(providedToken);

      // If lengths don't match, return false immediately
      // (timingSafeEqual requires equal lengths)
      if (expectedBuffer.length !== providedBuffer.length) {
        return false;
      }

      return timingSafeEqual(expectedBuffer, providedBuffer);
    } catch (error) {
      this.logger.error('Token validation error:', error);
      return false;
    }
  }

  /**
   * Load dev user from database
   * Uses fork() to create isolated EntityManager
   */
  private async loadDevUser(): Promise<UserEntity | null> {
    try {
      // Use fork() to avoid global context issues
      const em = this.em.fork();

      // Try to find admin user with specific email
      const adminEmail = this.configService.get<string>('SEED_ADMIN_EMAIL', 'admin@local');

      let user = await em.findOne(UserEntity, { email: adminEmail });

      // Fallback: find first admin user
      if (!user) {
        user = await em.findOne(UserEntity, { role: UserRole.ADMIN });
      }

      return user;
    } catch (error) {
      this.logger.error('Failed to load dev user:', error);
      return null;
    }
  }
}
