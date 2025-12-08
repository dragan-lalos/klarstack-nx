import { AuthRequiredGuard } from '@klastack-nx/api/auth';
import { Controller, Get, UseGuards, InternalServerErrorException } from '@nestjs/common';

import { CurrentWorkspace } from './current-workspace.decorator';
import { WorkspaceGuard } from './workspace.guard';

import type { WorkspaceRequestContext } from './tenancy.types';

/**
 * Pattern: "auth + workspace" routes
 *
 * - Requires authentication
 * - Requires `x-workspace-id`
 * - Server verifies membership before trusting the header
 */
@UseGuards(AuthRequiredGuard, WorkspaceGuard)
@Controller('tenant')
export class TenantController {
  /**
   * GET /api/tenant/ping
   *
   * Demonstrates server-side tenant enforcement: only valid memberships can reach this handler.
   */
  @Get('ping')
  ping(@CurrentWorkspace() workspace: WorkspaceRequestContext | undefined): {
    workspaceId: string;
  } {
    // WorkspaceGuard guarantees this exists; fail closed if misconfigured.
    if (!workspace) {
      throw new InternalServerErrorException('Workspace context missing');
    }
    return { workspaceId: workspace.id };
  }
}
