// Main module export
export * from './lib/database.module';

// Configuration exports
export * from './lib/database.config';
export * from './lib/database-config.schema';

/**
 * @deprecated Use DatabaseConfigSchema
 */
export { DatabaseConfigSchema as LegacyDatabaseConfig } from './lib/database-config.schema';

/**
 * @deprecated Use loadDatabaseConfig
 */
export { loadDatabaseConfig as loadLegacyDatabaseConfig } from './lib/database-config.schema';
