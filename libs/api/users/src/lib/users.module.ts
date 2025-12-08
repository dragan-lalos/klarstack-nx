import { UserEntity } from '@klastack-nx/shared/users';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { UsersService } from './users.service';

/**
 * Users Module
 * Provides user domain logic and data access
 *
 * Exports:
 * - UsersService for use in other modules (e.g., Auth)
 */
@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
