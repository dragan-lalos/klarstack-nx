# Database (PostgreSQL + MikroORM)

This repo uses PostgreSQL + MikroORM. Local development runs Postgres via `docker compose`, and schema changes are managed via migrations (no auto-sync).

## Prerequisites

- Docker + Docker Compose
- A local `.env` file (copy from `.env.example`)

## Start Postgres

```bash
docker compose up --build
```

Check health:

```bash
docker compose ps
```

## Migrations

### Create a migration

```bash
pnpm migration:create
```

Migration files live under `libs/infra/database/src/migrations/`.

### Apply migrations (API target)

The API provides an Nx target that runs migrations against the configured database:

```bash
pnpm nx run core-svc:db:migrate
```

## Seeding (dev)

Seed is designed for local development and is safe to run multiple times.

```bash
pnpm nx run core-svc:db:seed
```

Expected behavior:

- Creates **1 workspace**, **1 user**, **1 membership** (OWNER)
- Prints `workspaceId` and `userId` in logs

## Reset (destructive, dev-only)

```bash
docker compose down -v
docker compose up --build

pnpm nx run core-svc:db:migrate
pnpm nx run core-svc:db:seed
```

## Context handling (MikroORM)

This template disables global ORM context outside of tests:

- **Dev/Prod**: request-scoped context (Nest middleware creates a `RequestContext` per HTTP request)
- **Tests**: global context is enabled to simplify unit tests

If you run database work outside an HTTP request (scripts, background jobs), use an isolated EntityManager (e.g. `em.fork()`).

