import { Migration } from '@mikro-orm/migrations';

export class Migration20260122231320_add_user_settings_fields extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "users" add column "display_name" varchar(255) null, add column "timezone" varchar(100) null, add column "email_notifications" boolean not null default true;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users" drop column "display_name", drop column "timezone", drop column "email_notifications";`);
  }

}
