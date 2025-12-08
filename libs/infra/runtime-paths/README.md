# @klastack-nx/infra/runtime-paths

Runtime registration for TypeScript path aliases (for compiled Node apps).

This library exists to make `@klastack-nx/*` imports work at runtime for Node apps built into `dist/`.

## Quick usage (Node app entrypoint)

Import it **before any** alias-based imports. Because aliases aren’t registered yet, the entrypoint uses a **relative import**:

```ts
// apps/core-svc/src/main.ts
// eslint-disable-next-line @nx/enforce-module-boundaries
import '../../../libs/infra/runtime-paths/src/index';
```

## Nx targets

```bash
# Regenerate the committed mapping file
pnpm nx run infra-runtime-paths:gen:runtime-paths

# CI-friendly drift check
pnpm nx run infra-runtime-paths:check:runtime-paths
```

## More docs

See `docs/runtime-paths.md`.
