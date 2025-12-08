import { MembershipEntity, UserEntity } from '@klastack-nx/shared/users';
import { LoadStrategy } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';

export interface MeMembershipDto {
  workspaceId: string;
  workspaceName: string;
  role: MembershipEntity['role'];
}

export interface MeDto {
  id: string;
  email: string;
  memberships: MeMembershipDto[];
}

export interface WorkspaceListItemDto {
  id: string;
  name: string;
  role: MembershipEntity['role'];
}

/**
 * TenancyService
 *
 * Provides membership- and workspace-related reads.
 * All queries are explicitly scoped by the authenticated user.
 */
@Injectable()
export class TenancyService {
  constructor(private readonly em: EntityManager) {}

  async getMe(userId: string): Promise<MeDto> {
    const user = await this.em.findOne(UserEntity, { id: userId }, { fields: ['id', 'email'] });

    if (!user) {
      // Should not happen if auth is correct; keep safe and non-leaky.
      throw new NotFoundException('User not found');
    }

    const memberships = await this.em.find(
      MembershipEntity,
      { user: userId },
      {
        populate: ['workspace'],
        strategy: LoadStrategy.JOINED,
        fields: ['role', 'workspace.id', 'workspace.name'],
      },
    );

    return {
      id: user.id,
      email: user.email,
      memberships: memberships.map((m) => ({
        workspaceId: m.workspace.id,
        workspaceName: m.workspace.name,
        role: m.role,
      })),
    };
  }

  async listWorkspacesForUser(userId: string): Promise<WorkspaceListItemDto[]> {
    const memberships = await this.em.find(
      MembershipEntity,
      { user: userId },
      {
        populate: ['workspace'],
        strategy: LoadStrategy.JOINED,
        fields: ['role', 'workspace.id', 'workspace.name'],
      },
    );

    return memberships.map((m) => ({
      id: m.workspace.id,
      name: m.workspace.name,
      role: m.role,
    }));
  }
}
