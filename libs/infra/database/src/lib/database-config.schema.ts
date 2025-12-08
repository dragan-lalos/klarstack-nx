import { plainToInstance } from 'class-transformer';
import { IsString, IsNumber, IsBoolean, IsNotEmpty, Min, Max, validateSync } from 'class-validator';

/**
 * Database configuration schema
 * SINGLE SOURCE OF TRUTH for all database configuration.
 */
export class DatabaseConfigSchema {
  @IsString()
  @IsNotEmpty()
  host = 'localhost';

  @IsNumber()
  @Min(1)
  @Max(65535)
  port = 5432;

  @IsString()
  @IsNotEmpty()
  name = 'postgres';

  @IsString()
  @IsNotEmpty()
  user = 'postgres';

  @IsString()
  password = '';

  @IsBoolean()
  ssl = false;

  @IsBoolean()
  sslRejectUnauthorized = true;

  @IsBoolean()
  logging = false;

  @IsNumber()
  @Min(1)
  @Max(100)
  poolMin = 2;

  @IsNumber()
  @Min(1)
  @Max(100)
  poolMax = 10;

  @IsBoolean()
  allowGlobalContext = false;
}

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  const v = value.trim().toLowerCase();
  if (['true', '1', 'yes', 'y', 'on'].includes(v)) return true;
  if (['false', '0', 'no', 'n', 'off'].includes(v)) return false;
  return fallback;
}

/**
 * Loads and validates database configuration from environment variables.
 *
 * Env vars:
 * - DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
 * - DB_SSL (true/false/1/0/yes/no)
 * - DB_SSL_REJECT_UNAUTHORIZED (true/false/1/0/yes/no) default true
 * - DB_LOGGING (true/false/1/0/yes/no)
 * - DB_POOL_MIN, DB_POOL_MAX
 */
export function loadDatabaseConfig(
  env: Record<string, string | undefined> = process.env,
): DatabaseConfigSchema {
  const rawConfig = {
    host: env['DB_HOST'] || 'localhost',
    port: parseInt(env['DB_PORT'] || '5432', 10),
    name: env['DB_NAME'] || 'postgres',
    user: env['DB_USER'] || 'postgres',
    password: env['DB_PASSWORD'] || '',
    ssl: parseBoolean(env['DB_SSL'], false),
    sslRejectUnauthorized: parseBoolean(env['DB_SSL_REJECT_UNAUTHORIZED'], true),
    logging: parseBoolean(env['DB_LOGGING'], false),
    poolMin: parseInt(env['DB_POOL_MIN'] || '2', 10),
    poolMax: parseInt(env['DB_POOL_MAX'] || '10', 10),
    allowGlobalContext: env['NODE_ENV'] === 'test',
  };

  // Production guard: password must be provided
  if (env['NODE_ENV'] === 'production' && !rawConfig.password) {
    throw new Error('DB_PASSWORD is required in production');
  }

  const config = plainToInstance(DatabaseConfigSchema, rawConfig, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(config, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => {
        const constraints = error.constraints
          ? Object.values(error.constraints).join(', ')
          : 'unknown error';
        return `${error.property}: ${constraints}`;
      })
      .join('\n');

    throw new Error(`Database configuration validation failed:\n${errorMessages}`);
  }

  // Cross-field validation
  if (config.poolMin > config.poolMax) {
    throw new Error('Database configuration validation failed:\npoolMin must be <= poolMax');
  }

  return config;
}
