# api-tenancy

Workspace-based multi-tenancy for the NestJS API.

## Concepts

- **Shared schema**: tenant-bound tables include a `workspace_id` column.
- **Workspace selection**: requests use the `x-workspace-id` header.
- **Enforcement**: `WorkspaceGuard` verifies the authenticated user has a membership for the given workspace (otherwise **403**).

## HTTP endpoints (core template)

All routes are under the API global prefix (`/api`):

- `GET /api/health` (public)
- `GET /api/me` (auth required; no workspace header)
- `GET /api/workspaces` (auth required; no workspace header)
- `GET /api/tenant/ping` (auth + workspace required)

## Usage in an app

```ts
import { TenancyModule } from '@klastack-nx/api/tenancy';
```
