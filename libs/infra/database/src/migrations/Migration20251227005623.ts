import { Migration } from '@mikro-orm/migrations';

export class Migration20251227005623 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "users" ("id" uuid not null, "email" varchar(255) not null, "password_hash" varchar(255) not null, "role" text check ("role" in ('ADMIN', 'USER')) not null, "is_active" boolean not null default true, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "users_pkey" primary key ("id"));`,
    );
    this.addSql(`create index "users_email_index" on "users" ("email");`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);
  }
}
