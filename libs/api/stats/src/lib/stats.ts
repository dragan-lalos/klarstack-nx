import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { WorkspaceStatsEntity } from './entities/workspace-stats.entity';

/**
 * Service for managing workspace statistics.
 */
@Injectable()
export class StatsService {
  constructor(private readonly em: EntityManager) {}

  /**
   * Get stats for a workspace. Creates default stats if none exist.
   */
  async getWorkspaceStats(workspaceId: string): Promise<WorkspaceStatsEntity> {
    let stats = await this.em.findOne(WorkspaceStatsEntity, { workspaceId });

    if (!stats) {
      stats = new WorkspaceStatsEntity(workspaceId);
      await this.em.persistAndFlush(stats);
    }

    return stats;
  }

  /**
   * Update member count for a workspace.
   */
  async updateMemberCount(workspaceId: string, count: number): Promise<void> {
    const stats = await this.getWorkspaceStats(workspaceId);
    stats.memberCount = count;
    await this.em.flush();
  }

  /**
   * Increment active projects count.
   */
  async incrementActiveProjects(workspaceId: string): Promise<void> {
    const stats = await this.getWorkspaceStats(workspaceId);
    stats.activeProjects += 1;
    await this.em.flush();
  }

  /**
   * Update pending invites count.
   */
  async updatePendingInvites(workspaceId: string, count: number): Promise<void> {
    const stats = await this.getWorkspaceStats(workspaceId);
    stats.pendingInvites = count;
    await this.em.flush();
  }
}
