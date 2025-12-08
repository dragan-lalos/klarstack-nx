import { Entity, Enum, Index, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { randomUUID } from 'node:crypto';

import { UserEntity } from './user.entity';
import { WorkspaceEntity } from './workspace.entity';

/**
 * Membership Role Enum
 */
export enum MembershipRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

/**
 * Membership Entity
 * Represents the relationship between a user and a workspace
 */
@Entity({ tableName: 'memberships' })
// Query patterns:
// - Membership check (WorkspaceGuard): WHERE user_id = ? AND workspace_id = ? (must be unique / indexed)
// - Listing memberships: WHERE user_id = ? OR WHERE workspace_id = ?
@Unique({ properties: ['user', 'workspace'] })
@Index({ properties: ['user'] })
@Index({ properties: ['workspace'] })
export class MembershipEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @ManyToOne(() => UserEntity, { deleteRule: 'cascade' })
  user!: UserEntity;

  @ManyToOne(() => WorkspaceEntity, { deleteRule: 'cascade' })
  workspace!: WorkspaceEntity;

  @Enum(() => MembershipRole)
  @Property({ default: MembershipRole.MEMBER })
  role: MembershipRole = MembershipRole.MEMBER;

  @Property({ type: 'boolean', default: true })
  isActive = true;

  @Property({ type: 'datetime', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(user: UserEntity, workspace: WorkspaceEntity, role?: MembershipRole) {
    this.user = user;
    this.workspace = workspace;
    if (role) this.role = role;
  }
}
