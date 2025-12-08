#!/usr/bin/env node
/**
 * Migration Runner Script
 *
 * Runs all pending MikroORM migrations programmatically.
 * This script is designed to work in both local dev and CI/CD environments.
 *
 * Usage:
 *   node dist/apps/core-svc/scripts/run-migrations.js
 *   OR via Nx: nx core-svc:db:migrate
 *
 * Environment variables:
 *   - All DB_* variables (see database-config.schema.ts)
 *   - NODE_ENV: Set to 'production' for production builds
 */
import { loadDatabaseConfig } from '@klastack-nx/infra/database';
import { MembershipEntity, UserEntity, WorkspaceEntity } from '@klastack-nx/shared/users';
import { MikroORM } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { config as dotenvConfig } from 'dotenv';
import { join, resolve } from 'node:path';

import type { Options } from '@mikro-orm/core';

// Load .env files
dotenvConfig({ path: join(process.cwd(), '.env.local') });
dotenvConfig({ path: join(process.cwd(), '.env') });

async function runMigrations(): Promise<void> {
  console.log('🔄 Loading MikroORM configuration...');

  const dbConfig = loadDatabaseConfig();

  const isProduction = process.env['NODE_ENV'] === 'production';

  if (!isProduction) {
    dotenvConfig({ path: join(process.cwd(), '.env.local') });
    dotenvConfig({ path: join(process.cwd(), '.env') });
  }

  // Determine migrations path based on dist layout
  // Compiled script lives at: dist/apps/core-svc/src/scripts/run-migrations.js
  // Dist root is:           dist/
  const distRoot = resolve(__dirname, '../../../../');
  const migrationsPath = join(distRoot, 'libs/infra/database/src/migrations');

  const config: Options<PostgreSqlDriver> = {
    driver: PostgreSqlDriver,
    host: dbConfig.host,
    port: dbConfig.port,
    dbName: dbConfig.name,
    user: dbConfig.user,
    password: dbConfig.password,
    driverOptions: {
      connection: {
        ssl: dbConfig.ssl ? { rejectUnauthorized: dbConfig.sslRejectUnauthorized } : false,
      },
    },
    debug: dbConfig.logging,
    pool: {
      min: dbConfig.poolMin,
      max: dbConfig.poolMax,
    },
    entities: [UserEntity, WorkspaceEntity, MembershipEntity],
    allowGlobalContext: dbConfig.allowGlobalContext,
    extensions: [Migrator],
    migrations: {
      path: migrationsPath,
      pathTs: undefined,
      glob: '!(*.d).js',
      transactional: true,
      disableForeignKeys: true,
      allOrNothing: true,
      dropTables: false,
      safe: true,
      snapshot: true,
      emit: 'js' as const,
    },
  };

  console.log('📦 Initializing ORM...');
  const orm = await MikroORM.init(config);

  try {
    const migrator = orm.getMigrator();

    console.log('📋 Checking for pending migrations...');
    const pending = await migrator.getPendingMigrations();

    if (pending.length === 0) {
      console.log('✅ No pending migrations. Database is up to date.');
      return;
    }

    console.log(`📝 Found ${pending.length} pending migration(s):`);
    pending.forEach((m) => console.log(`   - ${m.name}`));

    console.log('\n🚀 Running migrations...');
    const executed = await migrator.up();

    if (executed.length === 0) {
      console.log('⚠️  No migrations were executed.');
    } else {
      console.log(`\n✅ Successfully executed ${executed.length} migration(s):`);
      executed.forEach((m) => console.log(`   ✓ ${m.name}`));
    }
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    throw error;
  } finally {
    await orm.close(true);
    console.log('\n🔌 Database connection closed.');
  }
}

// Run migrations
runMigrations()
  .then(() => {
    console.log('\n✅ Migration process completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration process failed:', error);
    process.exit(1);
  });
