import { Migration } from '@mikro-orm/migrations';

export class Migration20260122225650_add_workspace_stats extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "workspace_stats" ("id" uuid not null, "workspace_id" uuid not null, "member_count" int not null default 0, "active_projects" int not null default 0, "pending_invites" int not null default 0, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "workspace_stats_pkey" primary key ("id"));`);
    this.addSql(`create index "workspace_stats_workspace_id_index" on "workspace_stats" ("workspace_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "workspace_stats" cascade;`);
  }

}
