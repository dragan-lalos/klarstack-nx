import { MembershipEntity, UserEntity } from '@klastack-nx/shared/users';
import { LoadStrategy } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';

export interface MeMembershipDto {
  id: string;
  workspaceId: string;
  workspaceName: string;
  role: MembershipEntity['role'];
}

export interface MeUserDto {
  id: string;
  email: string;
  displayName?: string | null;
  timezone?: string | null;
  emailNotifications?: boolean;
}

export interface MeDto {
  user: MeUserDto;
  memberships: MeMembershipDto[];
}

export interface WorkspaceListItemDto {
  id: string;
  name: string;
  role: MembershipEntity['role'];
}

export interface UpdateMeDto {
  displayName?: string;
  timezone?: string;
  emailNotifications?: boolean;
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
    const user = await this.em.findOne(UserEntity, { id: userId }, { fields: ['id', 'email', 'displayName', 'timezone', 'emailNotifications'] });

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
        fields: ['id', 'role', 'workspace.id', 'workspace.name'],
      },
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        timezone: user.timezone,
        emailNotifications: user.emailNotifications,
      },
      memberships: memberships.map((m) => ({
        id: m.id,
        workspaceId: m.workspace.id,
        workspaceName: m.workspace.name,
        role: m.role,
      })),
    };
  }

  async updateMe(userId: string, dto: UpdateMeDto): Promise<MeUserDto> {
    const user = await this.em.findOne(UserEntity, { id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.displayName !== undefined) {
      user.displayName = dto.displayName || null;
    }
    if (dto.timezone !== undefined) {
      user.timezone = dto.timezone || null;
    }
    if (dto.emailNotifications !== undefined) {
      user.emailNotifications = dto.emailNotifications;
    }

    await this.em.flush();

    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      timezone: user.timezone,
      emailNotifications: user.emailNotifications,
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
