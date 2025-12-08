import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './auth.types';

/**
 * Authentication Controller
 * Handles authentication-related HTTP endpoints
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /api/auth/login
   * Authenticate user and return JWT token
   *
   * @param loginDto - Login credentials
   * @returns JWT access token
   * @throws UnauthorizedException (401) if credentials are invalid
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
