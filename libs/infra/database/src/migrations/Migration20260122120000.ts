import { Migration } from '@mikro-orm/migrations';

/**
 * Tenancy v1.0 (minimal but real)
 *
 * Adds the required DB guarantees for membership checks:
 * - UNIQUE (user_id, workspace_id)
 * - Indexes on workspace_id and user_id
 *
 * Note: the unique constraint also creates an index used by WorkspaceGuard's
 * single-hit membership lookup.
 */
export class Migration20260122120000 extends Migration {
  override async up(): Promise<void> {
    // The previous migration created a non-unique composite index.
    this.addSql(`drop index if exists "memberships_user_id_workspace_id_index";`);

    this.addSql(
      `alter table "memberships" add constraint "memberships_user_id_workspace_id_unique" unique ("user_id", "workspace_id");`,
    );

    this.addSql(`create index "memberships_workspace_id_index" on "memberships" ("workspace_id");`);
    this.addSql(`create index "memberships_user_id_index" on "memberships" ("user_id");`);
  }
}
