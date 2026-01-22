import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { WorkspaceStatsEntity } from './entities/workspace-stats.entity';
import { StatsService } from './stats';
import { StatsController } from './stats.controller';

@Module({
  imports: [MikroOrmModule.forFeature([WorkspaceStatsEntity])],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
