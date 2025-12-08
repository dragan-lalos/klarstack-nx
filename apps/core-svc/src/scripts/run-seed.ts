#!/usr/bin/env node
/**
 * Seed Script
 *
 * Seeds the database with initial data:
 * - 1 workspace
 * - 1 dev admin user
 * - 1 OWNER membership linking user to workspace
 *
 * This script is idempotent and safe to run multiple times.
 * It will skip creation if data already exists.
 *
 * Usage:
 *   node dist/apps/core-svc/scripts/run-seed.js
 *   OR via Nx: nx core-svc:db:seed
 *
 * Environment variables:
 *   - All DB_* variables (see database-config.schema.ts)
 *   - SEED_ADMIN_EMAIL: Email for admin user (default: admin@local)
 *   - SEED_ADMIN_PASSWORD: Password for admin user (default: P@ssw@rd1243)
 *   - SEED_WORKSPACE_NAME: Workspace name (default: Default Workspace)
 *   - NODE_ENV: Set to 'production' for production builds
 */

import { loadDatabaseConfig } from '@klastack-nx/infra/database';
import {
  MembershipEntity,
  MembershipRole,
  UserEntity,
  UserRole,
  WorkspaceEntity,
} from '@klastack-nx/shared/users';
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcrypt';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'node:path';

import type { Options } from '@mikro-orm/core';
// Load .env files
dotenvConfig({ path: join(process.cwd(), '.env.local') });
dotenvConfig({ path: join(process.cwd(), '.env') });

/**
 * Hash password using bcrypt
 */
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Run seed operations
 */
async function runSeed(): Promise<void> {
  console.log('🔄 Loading MikroORM configuration...');

  // Load database config and entities directly
  const dbConfig = loadDatabaseConfig();

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
  };

  console.log('📦 Initializing ORM...');
  const orm = await MikroORM.init(config);

  try {
    // Get environment variables
    const adminEmail = process.env['SEED_ADMIN_EMAIL'] || 'admin@local';
    const adminPassword = process.env['SEED_ADMIN_PASSWORD'] || 'P@ssw@rd1243';
    const workspaceName = process.env['SEED_WORKSPACE_NAME'] || 'Default Workspace';

    console.log('\n📝 Seed Configuration:');
    console.log(`   Admin Email: ${adminEmail}`);
    console.log(`   Workspace Name: ${workspaceName}`);

    // Use fork() to create isolated EntityManager
    const em = orm.em.fork();

    await em.transactional(async (em) => {
      console.log('\n🔍 Checking for existing data...');

      // Check if workspace exists
      let workspace: WorkspaceEntity | null = await em.findOne(WorkspaceEntity, {
        name: workspaceName,
      });

      if (workspace) {
        console.log(`✓ Workspace already exists: ${workspace.name} (${workspace.id})`);
      } else {
        console.log(`➕ Creating workspace: ${workspaceName}`);
        workspace = new WorkspaceEntity(workspaceName, 'Initial workspace created by seed script');
        await em.persistAndFlush(workspace);
        console.log(`✓ Workspace created: ${workspace.name} (${workspace.id})`);
      }

      // Check if admin user exists
      let user: UserEntity | null = await em.findOne(UserEntity, { email: adminEmail });

      if (user) {
        console.log(`✓ Admin user already exists: ${user.email} (${user.id})`);
      } else {
        console.log(`➕ Creating admin user: ${adminEmail}`);
        const passwordHash = await hashPassword(adminPassword);
        user = new UserEntity(adminEmail, passwordHash, UserRole.ADMIN);
        await em.persistAndFlush(user);
        console.log(`✓ Admin user created: ${user.email} (${user.id})`);
      }

      // Check if membership exists
      let membership: MembershipEntity | null = await em.findOne(MembershipEntity, {
        user: user.id,
        workspace: workspace.id,
      });

      if (membership) {
        console.log(`✓ Membership already exists: ${membership.role} (${membership.id})`);
      } else {
        console.log(`➕ Creating OWNER membership`);
        membership = new MembershipEntity(user, workspace, MembershipRole.OWNER);
        await em.persistAndFlush(membership);
        console.log(`✓ Membership created: ${membership.role} (${membership.id})`);
      }

      // Print summary
      console.log('\n✅ Seed completed successfully!');
      console.log('\n📊 Summary:');
      console.log(`   Workspace ID: ${workspace.id}`);
      console.log(`   User ID: ${user.id}`);
      console.log(`   Membership ID: ${membership.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Workspace Role: ${membership.role}`);
    });
  } catch (error) {
    console.error('\n❌ Seed failed:', error);
    throw error;
  } finally {
    await orm.close(true);
    console.log('\n🔌 Database connection closed.');
  }
}

// Run seed
runSeed()
  .then(() => {
    console.log('\n✅ Seed process completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seed process failed:', error);
    process.exit(1);
  });
