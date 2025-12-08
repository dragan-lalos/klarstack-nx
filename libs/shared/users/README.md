# shared-users

Shared user/workspace entities used across the API.

In this template, multi-tenancy is modeled via:

- `Workspace` (workspace/tenant)
- `Membership` (user ↔ workspace, with a role)
- tenant-bound tables include a `workspace_id` column

Related:

- `README.md` → “Tenancy (workspaces)”
- `libs/api/tenancy/README.md`
