import { AuthRequiredGuard } from '@klastack-nx/api/auth';
import { CurrentWorkspace, WorkspaceGuard } from '@klastack-nx/api/tenancy';
import { Controller, Get, UseGuards, InternalServerErrorException } from '@nestjs/common';

import { StatsService } from './stats';

import type { WorkspaceRequestContext } from '@klastack-nx/api/tenancy';

/**
 * Stats controller - workspace-scoped endpoints.
 * Requires authentication + valid workspace context.
 */
@UseGuards(AuthRequiredGuard, WorkspaceGuard)
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  /**
   * GET /api/stats
   *
   * Returns statistics for the current workspace.
   */
  @Get()
  async getStats(@CurrentWorkspace() workspace: WorkspaceRequestContext | undefined) {
    if (!workspace) {
      throw new InternalServerErrorException('Workspace context missing');
    }

    const stats = await this.statsService.getWorkspaceStats(workspace.id);

    return {
      memberCount: stats.memberCount,
      activeProjects: stats.activeProjects,
      pendingInvites: stats.pendingInvites,
    };
  }
}
