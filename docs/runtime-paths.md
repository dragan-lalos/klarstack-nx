# Runtime TS path aliases (Node apps)

Node apps in this repo (for example `core-svc`) use TypeScript path aliases like `@klastack-nx/api/auth`. At runtime, the compiled output in `dist/` needs an equivalent mapping so Node can resolve those imports.

This template solves that by generating a small runtime registration module during builds.

## How it works

- **Source of truth**: `tsconfig.base.json` → `compilerOptions.paths`
- **Generator**: `tools/scripts/generate-runtime-paths.ts`
- **Generated output (committed)**: `libs/infra/runtime-paths/src/lib/register-paths.generated.ts`
- **Runtime registration**: `tsconfig-paths.register({ baseUrl: <distRoot>, paths: <generated> })`

The generator normalizes paths and converts `.ts/.tsx` targets to `.js` so they match what gets emitted into `dist/`.

## Using it in a Node app

Because aliases are not available until after registration, the entrypoint must import the runtime-paths library via a **relative path** before any alias-based imports:

```ts
// apps/core-svc/src/main.ts
// eslint-disable-next-line @nx/enforce-module-boundaries
import '../../../libs/infra/runtime-paths/src/index';
```

## Using it as a Node preload (scripts)

```bash
node -r ./dist/libs/infra/runtime-paths/src/index.js ./dist/apps/core-svc/src/scripts/run-migrations.js
```

## Nx targets

```bash
# Generate (manual)
pnpm nx run infra-runtime-paths:gen:runtime-paths

# Verify generated file is up to date (CI-friendly)
pnpm nx run infra-runtime-paths:check:runtime-paths
```

## Troubleshooting

- **"Unable to locate workspace dist directory"**:
  - Run from the repo root, or set `NX_WORKSPACE_ROOT` to the workspace root path.
- **Aliases not resolving at runtime**:
  - Ensure the app imports runtime-paths *before* any `@klastack-nx/*` imports.

