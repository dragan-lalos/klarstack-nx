import { UsersModule } from '@klastack-nx/api/users';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

/**
 * Authentication Module
 * Provides JWT-based authentication for the application
 *
 * Configuration (via environment variables):
 * - JWT_SECRET: Secret key for signing tokens (required in production)
 * - JWT_EXPIRES_IN: Token expiration time (default: 1h)
 *
 * Usage:
 * 1. Import this module in your app module
 * 2. Use POST /api/auth/login to get a token
 * 3. Protect routes with @UseGuards(AuthGuard('jwt'))
 */
@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        const expiresIn = configService.get<string>('JWT_EXPIRES_IN', '1h');

        // In production, JWT_SECRET is required
        if (
          process.env['NODE_ENV'] === 'production' &&
          (!secret || secret === 'dev-secret-key-change-in-production')
        ) {
          throw new Error('JWT_SECRET must be set in production environment');
        }

        return {
          secret: secret || 'dev-secret-key-change-in-production',
          signOptions: {
            expiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
