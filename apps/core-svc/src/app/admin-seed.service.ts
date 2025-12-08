import { AuthService } from '@klastack-nx/api/auth';
import { UsersService } from '@klastack-nx/api/users';
import { UserRole } from '@klastack-nx/shared/users';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Admin Seed Service
 * Seeds an initial admin user for local development
 *
 * Configuration (environment variables):
 * - SEED_ADMIN: Set to 'true' to enable seeding
 * - NODE_ENV: Must NOT be 'production' for seeding to work
 * - ADMIN_EMAIL: Email for admin user (default: admin@local)
 * - ADMIN_PASSWORD: Password for admin user (default: P@ssw@rd1243)
 *
 * SECURITY NOTES:
 * - Never enables in production (NODE_ENV=production)
 * - Password is hashed using bcrypt before storage
 * - Password is never logged
 * - Only creates admin if user doesn't already exist
 */
@Injectable()
export class AdminSeedService implements OnModuleInit {
  private readonly logger = new Logger(AdminSeedService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly em: EntityManager,
  ) {}

  /**
   * Runs on module initialization
   * Seeds admin user if conditions are met
   */
  async onModuleInit() {
    // Use fork() to create a new context for database operations
    await this.em.fork().transactional(async () => {
      await this.seedAdminUser();
    });
  }

  /**
   * Seed admin user for development
   */
  private async seedAdminUser(): Promise<void> {
    // Check if seeding is enabled
    const seedEnabled = this.configService.get<string>('SEED_ADMIN') === 'true';
    if (!seedEnabled) {
      this.logger.log('Admin seeding disabled (SEED_ADMIN != true)');
      return;
    }

    // Never seed in production
    const nodeEnv = this.configService.get<string>('NODE_ENV');
    if (nodeEnv === 'production') {
      this.logger.warn('Admin seeding disabled in production environment');
      return;
    }

    try {
      // Get admin credentials from environment (with defaults for dev)
      const adminEmail = this.configService.get<string>('ADMIN_EMAIL') || 'admin@local';
      const adminPassword = this.configService.get<string>('ADMIN_PASSWORD') || 'P@ssw@rd1243';

      // Check if admin user already exists
      const existingUser = await this.usersService.findByEmail(adminEmail);
      if (existingUser) {
        this.logger.log(`Admin user already exists: ${adminEmail}`);
        return;
      }

      // Hash password
      const passwordHash = await this.authService.hashPassword(adminPassword);

      // Create admin user
      await this.usersService.create(adminEmail, passwordHash, UserRole.ADMIN);

      this.logger.log(`✅ Admin user created successfully: ${adminEmail}`);
      this.logger.log('ℹ️  Use these credentials to login via POST /api/auth/login');
    } catch (error) {
      this.logger.error('Failed to seed admin user', error);
      throw error;
    }
  }
}
