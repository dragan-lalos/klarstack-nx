import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';
import { randomUUID } from 'node:crypto';

/**
 * WorkspaceStats Entity
 * Stores statistics and metrics for a workspace
 */
@Entity({ tableName: 'workspace_stats' })
export class WorkspaceStatsEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @Index()
  @Property({ type: 'uuid' })
  workspaceId!: string;

  @Property({ type: 'integer', default: 0 })
  memberCount = 0;

  @Property({ type: 'integer', default: 0 })
  activeProjects = 0;

  @Property({ type: 'integer', default: 0 })
  pendingInvites = 0;

  @Property({ type: 'datetime', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(workspaceId: string) {
    this.workspaceId = workspaceId;
  }
}
