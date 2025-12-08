import { Entity, Enum, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { randomUUID } from 'node:crypto';

/**
 * User Role Enum
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity({ tableName: 'users' })
export class UserEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @Property({ unique: true, columnType: 'varchar(255)' })
  @Index()
  email!: string;

  @Property({ columnType: 'varchar(255)' })
  passwordHash!: string;

  @Enum(() => UserRole)
  @Property({ default: UserRole.USER })
  role: UserRole = UserRole.USER;

  @Property({ type: 'boolean', default: true })
  isActive = true;

  @Property({ type: 'datetime', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(email: string, passwordHash: string, role?: UserRole) {
    this.email = email.trim().toLowerCase();
    this.passwordHash = passwordHash;
    if (role) this.role = role;
  }
}
