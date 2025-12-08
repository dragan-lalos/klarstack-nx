import { AuthRequiredGuard } from '@klastack-nx/api/auth';
import { Module } from '@nestjs/common';

import { HealthController } from './health.controller';
import { MeController } from './me.controller';
import { TenancyService } from './tenancy.service';
import { TenantController } from './tenant.controller';
import { WorkspaceGuard } from './workspace.guard';

@Module({
  controllers: [HealthController, MeController, TenantController],
  providers: [TenancyService, WorkspaceGuard, AuthRequiredGuard],
  exports: [TenancyService, WorkspaceGuard],
})
export class TenancyModule {}
