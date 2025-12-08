# @klastack-nx/infra-database (workspace database library)

Reusable NestJS + MikroORM + PostgreSQL setup for this workspace.

## Import

- **TypeScript path alias (inside this repo)**: `@klastack-nx/infra/database`
- **Package name (library metadata)**: `@klastack-nx/infra-database`

Most apps import via the TS alias:

```ts
import { DatabaseModule } from '@klastack-nx/infra/database';
```

## Local usage

- Start Postgres: `docker compose up --build`
- Apply migrations + seed via the API targets:
  - `pnpm nx run core-svc:db:migrate`
  - `pnpm nx run core-svc:db:seed`

## More docs

See `docs/database.md`.
