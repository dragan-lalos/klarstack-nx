import { NestFactory } from '@nestjs/core';

// Register runtime TypeScript path aliases for compiled Node.js execution
// Note: Using relative path because this must load BEFORE tsconfig-paths registers
// eslint-disable-next-line @nx/enforce-module-boundaries
import '../../../libs/infra/runtime-paths/src/index';

function isDebugEnabled(): boolean {
  const flag = (process.env.DEBUG ?? '').toLowerCase();
  return flag === 'true' || flag === '1' || flag === 'yes';
}

/**
 * Production Hard Fail: DEV_AUTH must not be enabled in production
 *
 * This prevents accidental deployment of dev auth to production.
 */
function validateProductionSafety(): void {
  const nodeEnv = process.env.NODE_ENV;
  const devAuthEnabled = process.env.DEV_AUTH_ENABLED?.toLowerCase() === 'true';

  if (nodeEnv === 'production' && devAuthEnabled) {
    throw new Error(
      '🚨 PRODUCTION SAFETY VIOLATION: DEV_AUTH_ENABLED=true in production environment. ' +
      'This is a security risk. Set DEV_AUTH_ENABLED=false or remove it in production.',
    );
  }
}

async function bootstrap() {
  // Production safety checks BEFORE app creation
  validateProductionSafety();

  const [{ AppModule }, { GlobalExceptionFilter }, { AppLogger }] = await Promise.all([
    import('./app/app.module'),
    import('./filters/global-exception.filter'),
    import('./logger/app-logger.service'),
  ]);

  // Create logger instance before app creation for colored output from the start
  const logger = new AppLogger();
  const app = await NestFactory.create(AppModule, { logger });

  // Replace with the DI-managed instance after app creation
  const appLogger = app.get(AppLogger);
  app.useLogger(appLogger);

  app.useGlobalFilters(new GlobalExceptionFilter(appLogger, () => isDebugEnabled()));
  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: false,
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);

  appLogger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    'Bootstrap',
    {
      port,
      globalPrefix,
      environment: process.env.NODE_ENV ?? 'development',
      debug: isDebugEnabled(),
    },
  );
}

bootstrap();
