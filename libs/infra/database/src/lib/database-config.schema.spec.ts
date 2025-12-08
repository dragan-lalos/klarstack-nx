import 'reflect-metadata';
import { loadDatabaseConfig, DatabaseConfigSchema } from './database-config.schema';

describe('DatabaseConfigSchema', () => {
  describe('loadDatabaseConfig', () => {
    it('should validate valid configuration with all fields', () => {
      const env = {
        DB_HOST: 'localhost',
        DB_PORT: '5432',
        DB_NAME: 'testdb',
        DB_USER: 'testuser',
        DB_PASSWORD: 'testpass',
        DB_SSL: 'false',
        DB_LOGGING: 'false',
        DB_POOL_MIN: '2',
        DB_POOL_MAX: '10',
      };

      const result = loadDatabaseConfig(env);

      expect(result).toBeInstanceOf(DatabaseConfigSchema);
      expect(result.host).toBe('localhost');
      expect(result.port).toBe(5432);
      expect(result.name).toBe('testdb');
      expect(result.user).toBe('testuser');
      expect(result.password).toBe('testpass');
      expect(result.ssl).toBe(false);
      expect(result.logging).toBe(false);
      expect(result.poolMin).toBe(2);
      expect(result.poolMax).toBe(10);
    });

    it('should apply defaults for missing optional fields', () => {
      const env = {
        DB_HOST: 'localhost',
        DB_NAME: 'testdb',
        DB_USER: 'testuser',
      };

      const result = loadDatabaseConfig(env);

      expect(result.host).toBe('localhost');
      expect(result.port).toBe(5432);
      expect(result.name).toBe('testdb');
      expect(result.user).toBe('testuser');
      expect(result.password).toBe('');
      expect(result.ssl).toBe(false);
      expect(result.logging).toBe(false);
      expect(result.poolMin).toBe(2);
      expect(result.poolMax).toBe(10);
    });

    it('should validate SSL as true when set', () => {
      const env = {
        DB_HOST: 'prod-db.example.com',
        DB_NAME: 'proddb',
        DB_USER: 'produser',
        DB_PASSWORD: 'secure-password',
        DB_SSL: 'true',
      };

      const result = loadDatabaseConfig(env);

      expect(result.ssl).toBe(true);
    });

    it('should validate logging as true when set', () => {
      const env = {
        DB_HOST: 'localhost',
        DB_NAME: 'devdb',
        DB_USER: 'devuser',
        DB_LOGGING: 'true',
      };

      const result = loadDatabaseConfig(env);

      expect(result.logging).toBe(true);
    });

    it('should configure custom pool sizes', () => {
      const env = {
        DB_HOST: 'localhost',
        DB_NAME: 'testdb',
        DB_USER: 'testuser',
        DB_POOL_MIN: '5',
        DB_POOL_MAX: '50',
      };

      const result = loadDatabaseConfig(env);

      expect(result.poolMin).toBe(5);
      expect(result.poolMax).toBe(50);
    });

    it('should throw error for invalid port (too low)', () => {
      const env = {
        DB_HOST: 'localhost',
        DB_PORT: '0',
        DB_NAME: 'testdb',
        DB_USER: 'testuser',
      };

      expect(() => loadDatabaseConfig(env)).toThrow('Database configuration validation failed');
    });

    it('should throw error for invalid port (too high)', () => {
      const env = {
        DB_HOST: 'localhost',
        DB_PORT: '99999',
        DB_NAME: 'testdb',
        DB_USER: 'testuser',
      };

      expect(() => loadDatabaseConfig(env)).toThrow('Database configuration validation failed');
    });

    it('should throw error for invalid port (non-numeric)', () => {
      const env = {
        DB_HOST: 'localhost',
        DB_PORT: 'not-a-number',
        DB_NAME: 'testdb',
        DB_USER: 'testuser',
      };

      expect(() => loadDatabaseConfig(env)).toThrow('Database configuration validation failed');
    });

    it('should handle defaults for empty values', () => {
      const env = {
        DB_HOST: '',
        DB_NAME: '',
        DB_USER: '',
      };

      const result = loadDatabaseConfig(env);

      // Empty strings fallback to defaults
      expect(result.host).toBe('localhost');
      expect(result.name).toBe('postgres');
      expect(result.user).toBe('postgres');
    });

    it('should throw error for invalid pool min (too low)', () => {
      const env = {
        DB_HOST: 'localhost',
        DB_NAME: 'testdb',
        DB_USER: 'testuser',
        DB_POOL_MIN: '0',
      };

      expect(() => loadDatabaseConfig(env)).toThrow('Database configuration validation failed');
    });

    it('should throw error for invalid pool max (too high)', () => {
      const env = {
        DB_HOST: 'localhost',
        DB_NAME: 'testdb',
        DB_USER: 'testuser',
        DB_POOL_MAX: '101',
      };

      expect(() => loadDatabaseConfig(env)).toThrow('Database configuration validation failed');
    });

    it('should allow empty password', () => {
      const env = {
        DB_HOST: 'localhost',
        DB_NAME: 'testdb',
        DB_USER: 'testuser',
        DB_PASSWORD: '',
      };

      const result = loadDatabaseConfig(env);

      expect(result.password).toBe('');
    });

    it('should handle production-like configuration', () => {
      const env = {
        DB_HOST: 'prod-postgres.aws.com',
        DB_PORT: '5432',
        DB_NAME: 'production_db',
        DB_USER: 'prod_user',
        DB_PASSWORD: 'super-secure-password-123',
        DB_SSL: 'true',
        DB_LOGGING: 'false',
        DB_POOL_MIN: '10',
        DB_POOL_MAX: '50',
      };

      const result = loadDatabaseConfig(env);

      expect(result).toBeDefined();
      expect(result.host).toBe('prod-postgres.aws.com');
      expect(result.ssl).toBe(true);
      expect(result.poolMin).toBe(10);
      expect(result.poolMax).toBe(50);
    });

    it('should set allowGlobalContext for test environment', () => {
      const env = {
        DB_HOST: 'localhost',
        DB_NAME: 'testdb',
        DB_USER: 'testuser',
        NODE_ENV: 'test',
      };

      const result = loadDatabaseConfig(env);

      expect(result.allowGlobalContext).toBe(true);
    });

    it('should not set allowGlobalContext for production', () => {
      const env = {
        DB_HOST: 'localhost',
        DB_NAME: 'testdb',
        DB_USER: 'testuser',
        NODE_ENV: 'production',
      };

      const result = loadDatabaseConfig(env);

      expect(result.allowGlobalContext).toBe(false);
    });
  });
});
