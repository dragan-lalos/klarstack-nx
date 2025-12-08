import { MembershipEntity } from '@klastack-nx/shared/users';
import { EntityManager } from '@mikro-orm/postgresql';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { TenancyErrorCodes, WORKSPACE_HEADER_NAME } from './tenancy.constants';

import type { Request } from 'express';

function isUuid(value: string): boolean {
  // Accept UUID v1-v5 (case-insensitive)
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function readHeaderValue(req: Request, headerName: string): string | undefined {
  const raw = req.headers[headerName.toLowerCase()];
  if (raw === undefined) return undefined;
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (typeof v !== 'string') return undefined;
  const trimmed = v.trim();
  return trimmed.length ? trimmed : undefined;
}

function requireWorkspaceId(req: Request): string {
  const workspaceId = readHeaderValue(req, WORKSPACE_HEADER_NAME);
  if (!workspaceId) {
    throw new UnprocessableEntityException({
      code: TenancyErrorCodes.WORKSPACE_HEADER_REQUIRED,
      message: `Missing required header: ${WORKSPACE_HEADER_NAME}`,
    });
  }
  if (!isUuid(workspaceId)) {
    throw new UnprocessableEntityException({
      code: TenancyErrorCodes.WORKSPACE_HEADER_REQUIRED,
      message: `Invalid ${WORKSPACE_HEADER_NAME} format`,
    });
  }
  return workspaceId;
}

/**
 * WorkspaceGuard
 *
 * Server-side enforcement of tenant isolation:
 * - Reads `x-workspace-id`
 * - Verifies a membership exists for (user_id, workspace_id) (single DB hit)
 * - Attaches `req.workspace = { id, role }` for downstream usage
 */
@Injectable()
export class WorkspaceGuard implements CanActivate {
  constructor(private readonly em: EntityManager) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const userId = req.user?.id;
    if (!userId) {
      // Auth guard should run before this guard; treat as forbidden without leaking details.
      throw new ForbiddenException({
        code: TenancyErrorCodes.WORKSPACE_FORBIDDEN,
        message: 'Workspace access forbidden',
      });
    }

    const workspaceId = requireWorkspaceId(req);

    // Single indexed lookup backed by UNIQUE (user_id, workspace_id)
    const membership = await this.em.findOne(
      MembershipEntity,
      { user: userId, workspace: workspaceId },
      { fields: ['role'] },
    );

    if (!membership) {
      throw new ForbiddenException({
        code: TenancyErrorCodes.WORKSPACE_FORBIDDEN,
        message: 'Workspace access forbidden',
      });
    }

    req.workspace = { id: workspaceId, role: membership.role };
    return true;
  }
}
