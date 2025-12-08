import { UsersService } from '@klastack-nx/api/users';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from './auth.types';

/**
 * JWT Authentication Strategy
 * Validates JWT tokens and loads user data for protected routes
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'dev-secret-key-change-in-production'),
    });
  }

  /**
   * Validate JWT payload and return user
   * Called automatically by Passport after token verification
   * @param payload - Decoded JWT payload
   * @returns User object (attached to request)
   * @throws UnauthorizedException if user not found or inactive
   */
  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User account is not active');
    }

    // Return user object (will be attached to request.user)
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
