import { AuthRequiredGuard } from '@klastack-nx/api/auth';
import { Body, Controller, Get, Patch, Req, UnauthorizedException, UseGuards } from '@nestjs/common';

import { TenancyService, MeDto, MeUserDto, UpdateMeDto, WorkspaceListItemDto } from './tenancy.service';

import type { Request } from 'express';
/**
 * Pattern: "auth-only" routes
 *
 * - Requires authentication
 * - Does NOT require `x-workspace-id` because the user may belong to multiple workspaces
 */
@UseGuards(AuthRequiredGuard)
@Controller()
export class MeController {
  constructor(private readonly tenancyService: TenancyService) {}

  /**
   * GET /api/me
   */
  @Get('me')
  async me(@Req() req: Request): Promise<MeDto> {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.tenancyService.getMe(userId);
  }

  /**
   * PATCH /api/me
   */
  @Patch('me')
  async updateMe(@Req() req: Request, @Body() dto: UpdateMeDto): Promise<MeUserDto> {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.tenancyService.updateMe(userId, dto);
  }

  /**
   * GET /api/workspaces
   */
  @Get('workspaces')
  async workspaces(@Req() req: Request): Promise<WorkspaceListItemDto[]> {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.tenancyService.listWorkspacesForUser(userId);
  }
}
