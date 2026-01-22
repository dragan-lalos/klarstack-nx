import { AuthModule } from '@klastack-nx/api/auth';
import { StatsModule } from '@klastack-nx/api/stats';
import { TenancyModule } from '@klastack-nx/api/tenancy';
import { UsersModule } from '@klastack-nx/api/users';
import { DatabaseModule } from '@klastack-nx/infra/database';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AdminSeedService } from './admin-seed.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevAuthGuard } from '../guards/dev-auth.guard';
import { AppLogger } from '../logger/app-logger.service';
import { MikroOrmRequestContextMiddleware } from '../middleware/mikroorm-context.middleware';
import { TraceIdMiddleware } from '../middleware/trace-id.middleware';

@Module({
  imports: [
    // Global configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    // Database
    DatabaseModule,
    // Domain modules
    UsersModule,
    // Auth module
    AuthModule,
    // Tenancy v1 (health, /me, /workspaces, workspace guard)
    TenancyModule,
    // Stats module (workspace-scoped statistics)
    StatsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AdminSeedService,
    AppLogger,
    MikroOrmRequestContextMiddleware,
    TraceIdMiddleware,
    DevAuthGuard,
    // Register DevAuthGuard globally
    {
      provide: APP_GUARD,
      useClass: DevAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // MikroORM RequestContext must run first to create proper context
    consumer.apply(MikroOrmRequestContextMiddleware).forRoutes('*');

    // Then apply other middleware
    consumer.apply(TraceIdMiddleware).forRoutes('*');
  }
}
