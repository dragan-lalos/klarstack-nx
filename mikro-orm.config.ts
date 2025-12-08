import type { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { config as dotenvConfig } from 'dotenv';
import * as path from 'node:path';
import { loadDatabaseConfig } from './libs/infra/database/src/lib/database-config.schema';

dotenvConfig();

const dbConfig = loadDatabaseConfig();
const isProduction = process.env['NODE_ENV'] === 'production';

// Migrations
const migrationsPathTs = path.join(process.cwd(), 'libs/infra/database/src/migrations');
const migrationsPathJs = path.join(process.cwd(), 'dist/libs/infra/database/src/migrations');

// Entity discovery (requires naming convention *.entity.ts / *.entity.js)
const entitiesTs = [
  path.join(process.cwd(), 'libs/**/src/**/*.entity.ts'),
  path.join(process.cwd(), 'apps/**/src/**/*.entity.ts'),
];

const entitiesJs = [path.join(process.cwd(), 'dist/**/**/*.entity.js')];

const config: Options = {
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

  entities: entitiesJs,
  entitiesTs,

  extensions: [Migrator],
  migrations: {
    path: isProduction ? migrationsPathJs : migrationsPathTs,
    pathTs: migrationsPathTs,
    glob: isProduction ? '!(*.d).js' : '!(*.d).ts',
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    dropTables: false,
    safe: true,
    snapshot: true,
    emit: isProduction ? 'js' : 'ts',
  },

  // allowGlobalContext is controlled by database-config.schema.ts
  // It is true only when NODE_ENV=test, false otherwise
  allowGlobalContext: dbConfig.allowGlobalContext,
};

export default config;
