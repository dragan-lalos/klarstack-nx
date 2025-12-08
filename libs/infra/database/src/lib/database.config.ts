import { registerAs } from '@nestjs/config';

import { loadDatabaseConfig, DatabaseConfigSchema } from './database-config.schema';

/**
 * Configuration key for database settings
 */
export const DATABASE_CONFIG_KEY = 'database';

/**
 * Database configuration factory for NestJS ConfigModule
 *
 * Uses the shared configuration schema and loader.
 * No duplication - delegates to loadDatabaseConfig()
 */
export default registerAs(DATABASE_CONFIG_KEY, (): DatabaseConfigSchema => loadDatabaseConfig());
