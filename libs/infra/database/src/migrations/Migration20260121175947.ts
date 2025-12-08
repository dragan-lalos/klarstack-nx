import { Migration } from '@mikro-orm/migrations';

export class Migration20260121175947 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "workspaces" ("id" uuid not null, "name" varchar(255) not null, "description" text null, "is_active" boolean not null default true, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "workspaces_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "memberships" ("id" uuid not null, "user_id" uuid not null, "workspace_id" uuid not null, "role" text check ("role" in ('OWNER', 'ADMIN', 'MEMBER')) not null default 'MEMBER', "is_active" boolean not null default true, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "memberships_pkey" primary key ("id"));`,
    );
    this.addSql(
      `create index "memberships_user_id_workspace_id_index" on "memberships" ("user_id", "workspace_id");`,
    );

    this.addSql(
      `alter table "memberships" add constraint "memberships_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "memberships" add constraint "memberships_workspace_id_foreign" foreign key ("workspace_id") references "workspaces" ("id") on update cascade on delete cascade;`,
    );
  }
}
