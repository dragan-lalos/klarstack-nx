import { UserEntity, WorkspaceEntity, MembershipEntity } from '@klastack-nx/shared/users';
import { Migrator } from '@mikro-orm/migrations';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'node:path';

import { DatabaseConfigSchema } from './database-config.schema';
import databaseConfig, { DATABASE_CONFIG_KEY } from './database.config';

// Import all entities explicitly for bundled builds

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get<DatabaseConfigSchema>(DATABASE_CONFIG_KEY);

        if (!dbConfig) {
          throw new Error('Database configuration not found');
        }

        // Stable migrations path relative to this compiled file
        const migrationsPath = path.join(__dirname, '..', 'migrations');

        return {
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

          // Use explicit entity list for bundled builds
          entities: [UserEntity, WorkspaceEntity, MembershipEntity],

          extensions: [Migrator],
          migrations: {
            path: migrationsPath,
            // Runtime always runs compiled JS from `dist/**` (even in NODE_ENV=test),
            // so we must never load `.ts` migration files here.
            pathTs: undefined,
            glob: '!(*.d).js',
            transactional: true,
            disableForeignKeys: true,
            allOrNothing: true,
            dropTables: false,
            safe: true,
            snapshot: true,
            emit: 'js',
          },

          // Use allowGlobalContext from config (true only when NODE_ENV=test)
          allowGlobalContext: dbConfig.allowGlobalContext,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
