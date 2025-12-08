import 'reflect-metadata';
import databaseConfig from './database.config';

describe('DatabaseModule Configuration', () => {
  describe('databaseConfig', () => {
    beforeEach(() => {
      // Set required environment variables for testing
      process.env['DB_HOST'] = 'localhost';
      process.env['DB_PORT'] = '5432';
      process.env['DB_NAME'] = 'testdb';
      process.env['DB_USER'] = 'testuser';
      process.env['DB_PASSWORD'] = 'testpass';
      process.env['NODE_ENV'] = 'test';
    });

    afterEach(() => {
      // Clean up environment variables
      delete process.env['DB_HOST'];
      delete process.env['DB_PORT'];
      delete process.env['DB_NAME'];
      delete process.env['DB_USER'];
      delete process.env['DB_PASSWORD'];
    });

    it('should load database configuration from environment', () => {
      const config = databaseConfig();

      expect(config).toBeDefined();
      expect(config.host).toBe('localhost');
      expect(config.port).toBe(5432);
      expect(config.name).toBe('testdb');
      expect(config.user).toBe('testuser');
      expect(config.password).toBe('testpass');
    });

    it('should use default values when environment variables are not set', () => {
      delete process.env['DB_HOST'];
      delete process.env['DB_PORT'];

      const config = databaseConfig();

      expect(config.host).toBe('localhost'); // default
      expect(config.port).toBe(5432); // default
    });

    it('should enable SSL when DB_SSL is true', () => {
      process.env['DB_SSL'] = 'true';

      const config = databaseConfig();

      expect(config.ssl).toBe(true);
    });

    it('should enable logging when DB_LOGGING is true', () => {
      process.env['DB_LOGGING'] = 'true';

      const config = databaseConfig();

      expect(config.logging).toBe(true);
    });

    it('should configure custom pool sizes', () => {
      process.env['DB_POOL_MIN'] = '5';
      process.env['DB_POOL_MAX'] = '20';

      const config = databaseConfig();

      expect(config.poolMin).toBe(5);
      expect(config.poolMax).toBe(20);
    });

    it('should allow global context in test environment', () => {
      process.env['NODE_ENV'] = 'test';

      const config = databaseConfig();

      expect(config.allowGlobalContext).toBe(true);
    });

    it('should not allow global context in production environment', () => {
      process.env['NODE_ENV'] = 'production';

      const config = databaseConfig();

      expect(config.allowGlobalContext).toBe(false);
    });

    it('should not allow global context in development environment', () => {
      process.env['NODE_ENV'] = 'development';

      const config = databaseConfig();

      expect(config.allowGlobalContext).toBe(false);
    });

    it('should not allow global context when NODE_ENV is not set', () => {
      delete process.env['NODE_ENV'];

      const config = databaseConfig();

      expect(config.allowGlobalContext).toBe(false);
    });
  });

  describe('ConfigModule integration', () => {
    it('should register config with proper key', () => {
      expect(databaseConfig.KEY).toContain('database');
    });
  });
});
