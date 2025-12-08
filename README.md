# Klarstack-nx

## What is this?

An Nx monorepo template with a NestJS API and two web apps (Next.js frontoffice + React SPA backoffice), built around PostgreSQL + MikroORM and a simple header-based dev-only auth mode.

## Stack

- Nx monorepo
- TypeScript
- NestJS (API)
- Next.js (Frontoffice)
- React SPA (Backoffice)
- PostgreSQL
- MikroORM
- Docker / docker compose
- pnpm

## Quickstart

### Prerequisites

```bash
# Node.js (use the version from .nvmrc)
node --version

# pnpm (see package.json "packageManager")
pnpm --version

# Docker (for Postgres)
docker --version
docker compose version
```

### Install

```bash
pnpm install

# Create local env (example values)
cp .env.example .env
```

### Run (Nx)

```bash
# 1) Start Postgres (required for API)
docker compose up --build

# 2) Prepare DB
pnpm nx run core-svc:db:migrate
pnpm nx run core-svc:db:seed

# 3) Run apps (in separate terminals)
pnpm nx run core-svc:serve
pnpm nx run portal:dev
pnpm nx run web-app:dev
```

### Run (Docker)

```bash
# This template ships with a Postgres service for local development.
docker compose up --build
```

- **Database details**: `docs/database.md`
- **Database library**: `libs/infra/database/README.md`

## Dev Auth (dev-only)

This template includes a **dev-only** header-based auth mode that is **intentionally insecure by design** and only meant to unblock local development.

- **Header**: `x-dev-auth: <token>`
- **Env flags**:
  - `DEV_AUTH_ENABLED` (default: `true` when `NODE_ENV !== 'production'`)
  - `DEV_AUTH_TOKEN` (default: `dev`)
- **Default dev behavior**: enabled in dev unless you explicitly set `DEV_AUTH_ENABLED=false`
- **Production hard-fail**: if `NODE_ENV=production` and `DEV_AUTH_ENABLED=true`, the API refuses to start

Example:

```bash
# <API_URL> example: http://localhost:3000/api
curl -sS "<API_URL>/me" \
  -H "x-dev-auth: dev"
```

- **JWT auth module (separate from dev auth)**: `libs/api/auth/README.md`

## Tenancy (workspaces)

Multi-tenancy is modeled as a **shared schema** with a `workspace_id` column on tenant-bound tables.

- **Header**: `x-workspace-id: <WORKSPACE_ID>`
- **Server-side enforcement**: a guard verifies the authenticated user is a member of the requested workspace; otherwise the request fails with **403**

Example (auth + workspace):

```bash
# <API_URL> example: http://localhost:3000/api
curl -sS "<API_URL>/tenant/ping" \
  -H "x-dev-auth: dev" \
  -H "x-workspace-id: <WORKSPACE_ID>"
```

Expected behavior:

- **Missing `x-dev-auth`**: 401
- **Missing `x-workspace-id` (on tenant routes)**: 400/401/403 (depends on the endpoint)
- **Wrong `x-workspace-id`** (user not a member): 403

- **More details**: `libs/api/tenancy/README.md`, `libs/shared/users/README.md`

## Folder structure

```text
apps/
  api/          # NestJS API (this repo: apps/core-svc)
  backoffice/   # React SPA (this repo: apps/web-app)
  frontoffice/  # Next.js (this repo: apps/portal)
libs/
  domain/*
  data/*
  shared/*
```

In this repository, the concrete projects are:

- **API**: `apps/core-svc`
- **Frontoffice (Next.js)**: `apps/portal`
- **Backoffice (React SPA)**: `apps/web-app`

Related docs:

- **Web UI patterns**: `libs/web/ui/PATTERNS.md`
- **Web auth hooks/components**: `libs/web/auth/README.md`
- **Web UI overview**: `libs/web/ui/README.md`

## Common tasks

```bash
# Lint all projects
pnpm nx run-many -t lint --all

# Typecheck all projects
pnpm nx run-many -t tsc:typecheck --all

# Unit tests for all projects
pnpm nx run-many -t test --all

# Build all projects
pnpm nx run-many -t build --all

# Bring up Postgres (local dev)
docker compose up --build

# Run API DB migrations
pnpm nx run core-svc:db:migrate

# Seed dev data (workspace + user + membership; prints IDs)
pnpm nx run core-svc:db:seed

# Start all 3 apps (no single start:all target in this template)
pnpm nx run core-svc:serve
pnpm nx run portal:dev
pnpm nx run web-app:dev
```

- **Runtime TS path aliases (Node apps)**: `docs/runtime-paths.md`
- **Runtime-paths library**: `libs/infra/runtime-paths/README.md`

## Troubleshooting

### Port conflicts

- Stop the process using the port (or change the app port) and retry.
- For Nx tasks, run the individual app targets (`core-svc:serve`, `portal:dev`, `web-app:dev`) so you can see which one failed.

### Database container not healthy

- Check container health: `docker compose ps`
- Reset the dev database volume (destructive): `docker compose down -v` then `docker compose up --build`

### 401 due to missing `x-dev-auth`

- Ensure `DEV_AUTH_ENABLED=true` (or omit it in dev)
- Add the header: `x-dev-auth: dev`

### 403 due to wrong `x-workspace-id`

- Run `pnpm nx run core-svc:db:seed` and copy the printed workspace ID from logs
- Ensure the user is a member of that workspace (seed creates an OWNER membership)

## License

MIT. See `LICENSE`.
