import { Entity, PrimaryKey, Property, Collection, OneToMany } from '@mikro-orm/core';
import { randomUUID } from 'node:crypto';

/**
 * Workspace Entity
 * Represents a workspace/organization in the system
 */
@Entity({ tableName: 'workspaces' })
export class WorkspaceEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @Property({ columnType: 'varchar(255)' })
  name!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ type: 'boolean', default: true })
  isActive = true;

  @Property({ type: 'datetime', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(name: string, description?: string) {
    this.name = name.trim();
    this.description = description?.trim();
  }
}
