import { waitForPortOpen } from './ports';

/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;

module.exports = async function () {
  console.log('\nSetting up (Tenancy e2e)...\n');

  const { spawn, spawnSync } = await import('node:child_process');
  const path = await import('node:path');

  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  // Use docker-compose defaults from this repo (safe to re-run).
  // Keep env explicit for CI reproducibility.
  process.env.DB_HOST = process.env.DB_HOST ?? 'localhost';
  process.env.DB_PORT = process.env.DB_PORT ?? '5432';
  process.env.DB_NAME = process.env.DB_NAME ?? 'klarstack_dev';
  process.env.DB_USER = process.env.DB_USER ?? 'postgres';
  process.env.DB_PASSWORD = process.env.DB_PASSWORD ?? 'postgres';
  process.env.DB_SSL = process.env.DB_SSL ?? 'false';
  process.env.DB_LOGGING = process.env.DB_LOGGING ?? 'false';

  // Ensure dev auth is enabled for tests (token defaults to "dev")
  process.env.DEV_AUTH_ENABLED = process.env.DEV_AUTH_ENABLED ?? 'true';
  process.env.DEV_AUTH_TOKEN = process.env.DEV_AUTH_TOKEN ?? 'dev';

  console.log('🐘 Ensuring Postgres is running (docker compose)...');
  const composeUp = spawnSync('docker', ['compose', 'up', '-d', 'postgres'], {
    stdio: 'inherit',
  });
  if (composeUp.status !== 0) {
    throw new Error('Failed to start postgres via docker compose');
  }

  await waitForPortOpen(5432, { host });

  const workspaceRoot = process.cwd();
  const preload = path.join(workspaceRoot, 'dist/apps/core-svc/src/runtime/register-paths.js');

  console.log('🧱 Running migrations...');
  const migrate = spawnSync(
    'node',
    ['-r', preload, path.join(workspaceRoot, 'dist/apps/core-svc/src/scripts/run-migrations.js')],
    { stdio: 'inherit' },
  );
  if (migrate.status !== 0) {
    throw new Error('Migration step failed');
  }

  console.log('🌱 Running seed...');
  const seed = spawnSync(
    'node',
    ['-r', preload, path.join(workspaceRoot, 'dist/apps/core-svc/src/scripts/run-seed.js')],
    { stdio: 'inherit' },
  );
  if (seed.status !== 0) {
    throw new Error('Seed step failed');
  }

  console.log('🚀 Starting API server...');
  const childEnv = { ...process.env, HOST: host, PORT: String(port) };
  // Jest/ts-jest sometimes sets NODE_OPTIONS for TS transforms; this can break
  // plain Node execution of compiled JS (e.g. by enabling strip-types mode).
  delete (childEnv as any).NODE_OPTIONS;
  const server = spawn(
    'node',
    ['-r', preload, path.join(workspaceRoot, 'dist/apps/core-svc/main.js')],
    {
      stdio: 'inherit',
      env: childEnv,
    },
  );

  globalThis.__CORE_SVC_PID__ = server.pid;
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';

  await waitForPortOpen(port, { host });
};
