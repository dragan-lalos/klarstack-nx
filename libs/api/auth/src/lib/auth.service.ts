import { UsersService } from '@klastack-nx/api/users';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { JwtPayload, LoginResponseDto } from './auth.types';

/**
 * Authentication Service
 * Handles user login and JWT token generation
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate user credentials and return JWT token
   * @param email - User email
   * @param password - Plaintext password
   * @returns Object containing access_token
   * @throws UnauthorizedException if credentials are invalid
   */
  async login(email: string, password: string): Promise<LoginResponseDto> {
    // Find user by email
    const user = await this.usersService.findByEmail(email);

    // Check if user exists
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('Account is not active');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT payload
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Sign and return token
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }

  /**
   * Hash a password using bcrypt
   * @param password - Plaintext password
   * @returns Bcrypt hash
   */
  async hashPassword(password: string): Promise<string> {
    const BCRYPT_COST = 12;
    return bcrypt.hash(password, BCRYPT_COST);
  }
}
