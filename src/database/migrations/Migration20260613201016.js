'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20260613201016 extends Migration {

  async up() {
    this.addSql(`create table "permissions" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "code" varchar(255) not null, "description" text not null, primary key ("id"));`);

    this.addSql(`create table "roles" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "code" varchar(255) not null, "name" varchar(255) not null, "description" text not null, "scope" smallint not null, primary key ("id"));`);

    this.addSql(`create table "role_permissions" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "role_id" uuid not null, "permission_id" uuid not null, primary key ("id"));`);

    this.addSql(`create table "users" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "name" varchar(255) not null, "password_hash" text not null, "status" smallint not null, primary key ("id"));`);

    this.addSql(`create table "invitations" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "resource_type" smallint not null, "resource_id" uuid not null, "email" varchar(255) not null, "token" text not null, "status" smallint not null, "expires_at" timestamptz null, "invited_by_id" uuid not null, primary key ("id"));`);

    this.addSql(`create table "activity_logs" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "action" varchar(255) not null, "resource_type" varchar(255) not null, "resource_id" uuid not null, "metadata" jsonb not null, "user_id" uuid not null, primary key ("id"));`);

    this.addSql(`create table "workspaces" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "created_by_id" uuid not null, primary key ("id"));`);

    this.addSql(`create table "projects" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" text not null, "status" smallint not null, "workspace_id" uuid not null, "created_by_id" uuid not null, primary key ("id"));`);

    this.addSql(`create table "tasks" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "description" text not null, "status" smallint not null, "priority" smallint not null, "due_date" timestamptz null, "completed_at" timestamptz null, "project_id" uuid not null, "created_by_id" uuid not null, "assigned_to_id" uuid not null, "parent_task_id" uuid not null, primary key ("id"));`);

    this.addSql(`create table "task_comments" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "comment" text not null, "task_id" uuid not null, "user_id" uuid not null, primary key ("id"));`);

    this.addSql(`create table "task_attachments" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "file_name" varchar(255) not null, "file_url" text not null, "task_id" uuid not null, "uploaded_by_id" uuid not null, primary key ("id"));`);

    this.addSql(`create table "project_users" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" uuid not null, "project_id" uuid not null, primary key ("id"));`);
    this.addSql(`create index "project_users_user_id_project_id_index" on "project_users" ("user_id", "project_id");`);

    this.addSql(`create table "project_user_roles" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "project_user_id" uuid not null, "role_id" uuid not null, primary key ("id"));`);
    this.addSql(`create index "project_user_roles_project_user_id_role_id_index" on "project_user_roles" ("project_user_id", "role_id");`);

    this.addSql(`create table "project_user_permission_overrides" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "project_user_id" uuid not null, "permission_id" uuid not null, "effect" smallint not null, primary key ("id"));`);
    this.addSql(`create index "project_user_permission_overrides_project_user_id__77c3b_index" on "project_user_permission_overrides" ("project_user_id", "permission_id");`);

    this.addSql(`create table "workspace_users" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" uuid not null, "workspace_id" uuid not null, primary key ("id"));`);
    this.addSql(`create index "workspace_users_user_id_workspace_id_index" on "workspace_users" ("user_id", "workspace_id");`);

    this.addSql(`create table "workspace_user_permission_overrides" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "workspace_user_id" uuid not null, "permission_id" uuid not null, "effect" smallint not null, primary key ("id"));`);
    this.addSql(`create index "workspace_user_permission_overrides_workspace_user_0f475_index" on "workspace_user_permission_overrides" ("workspace_user_id", "permission_id");`);

    this.addSql(`create table "workspace_user_roles" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "workspace_user_id" uuid not null, "role_id" uuid not null, primary key ("id"));`);
    this.addSql(`create index "workspace_user_roles_workspace_user_id_role_id_index" on "workspace_user_roles" ("workspace_user_id", "role_id");`);

    this.addSql(`alter table "role_permissions" add constraint "role_permissions_role_id_foreign" foreign key ("role_id") references "roles" ("id");`);
    this.addSql(`alter table "role_permissions" add constraint "role_permissions_permission_id_foreign" foreign key ("permission_id") references "permissions" ("id");`);

    this.addSql(`alter table "invitations" add constraint "invitations_invited_by_id_foreign" foreign key ("invited_by_id") references "users" ("id");`);

    this.addSql(`alter table "activity_logs" add constraint "activity_logs_user_id_foreign" foreign key ("user_id") references "users" ("id");`);

    this.addSql(`alter table "workspaces" add constraint "workspaces_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id");`);

    this.addSql(`alter table "projects" add constraint "projects_workspace_id_foreign" foreign key ("workspace_id") references "workspaces" ("id");`);
    this.addSql(`alter table "projects" add constraint "projects_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id");`);

    this.addSql(`alter table "tasks" add constraint "tasks_project_id_foreign" foreign key ("project_id") references "projects" ("id");`);
    this.addSql(`alter table "tasks" add constraint "tasks_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id");`);
    this.addSql(`alter table "tasks" add constraint "tasks_assigned_to_id_foreign" foreign key ("assigned_to_id") references "users" ("id");`);
    this.addSql(`alter table "tasks" add constraint "tasks_parent_task_id_foreign" foreign key ("parent_task_id") references "tasks" ("id");`);

    this.addSql(`alter table "task_comments" add constraint "task_comments_task_id_foreign" foreign key ("task_id") references "tasks" ("id");`);
    this.addSql(`alter table "task_comments" add constraint "task_comments_user_id_foreign" foreign key ("user_id") references "users" ("id");`);

    this.addSql(`alter table "task_attachments" add constraint "task_attachments_task_id_foreign" foreign key ("task_id") references "tasks" ("id");`);
    this.addSql(`alter table "task_attachments" add constraint "task_attachments_uploaded_by_id_foreign" foreign key ("uploaded_by_id") references "users" ("id");`);

    this.addSql(`alter table "project_users" add constraint "project_users_user_id_foreign" foreign key ("user_id") references "users" ("id");`);
    this.addSql(`alter table "project_users" add constraint "project_users_project_id_foreign" foreign key ("project_id") references "projects" ("id");`);

    this.addSql(`alter table "project_user_roles" add constraint "project_user_roles_project_user_id_foreign" foreign key ("project_user_id") references "project_users" ("id");`);
    this.addSql(`alter table "project_user_roles" add constraint "project_user_roles_role_id_foreign" foreign key ("role_id") references "roles" ("id");`);

    this.addSql(`alter table "project_user_permission_overrides" add constraint "project_user_permission_overrides_project_user_id_foreign" foreign key ("project_user_id") references "project_users" ("id");`);
    this.addSql(`alter table "project_user_permission_overrides" add constraint "project_user_permission_overrides_permission_id_foreign" foreign key ("permission_id") references "permissions" ("id");`);

    this.addSql(`alter table "workspace_users" add constraint "workspace_users_user_id_foreign" foreign key ("user_id") references "users" ("id");`);
    this.addSql(`alter table "workspace_users" add constraint "workspace_users_workspace_id_foreign" foreign key ("workspace_id") references "workspaces" ("id");`);

    this.addSql(`alter table "workspace_user_permission_overrides" add constraint "workspace_user_permission_overrides_workspace_user_id_foreign" foreign key ("workspace_user_id") references "workspace_users" ("id");`);
    this.addSql(`alter table "workspace_user_permission_overrides" add constraint "workspace_user_permission_overrides_permission_id_foreign" foreign key ("permission_id") references "permissions" ("id");`);

    this.addSql(`alter table "workspace_user_roles" add constraint "workspace_user_roles_workspace_user_id_foreign" foreign key ("workspace_user_id") references "workspace_users" ("id");`);
    this.addSql(`alter table "workspace_user_roles" add constraint "workspace_user_roles_role_id_foreign" foreign key ("role_id") references "roles" ("id");`);
  }

  async down() {
    this.addSql(`alter table "role_permissions" drop constraint "role_permissions_permission_id_foreign";`);
    this.addSql(`alter table "project_user_permission_overrides" drop constraint "project_user_permission_overrides_permission_id_foreign";`);
    this.addSql(`alter table "workspace_user_permission_overrides" drop constraint "workspace_user_permission_overrides_permission_id_foreign";`);
    this.addSql(`alter table "role_permissions" drop constraint "role_permissions_role_id_foreign";`);
    this.addSql(`alter table "project_user_roles" drop constraint "project_user_roles_role_id_foreign";`);
    this.addSql(`alter table "workspace_user_roles" drop constraint "workspace_user_roles_role_id_foreign";`);
    this.addSql(`alter table "invitations" drop constraint "invitations_invited_by_id_foreign";`);
    this.addSql(`alter table "activity_logs" drop constraint "activity_logs_user_id_foreign";`);
    this.addSql(`alter table "workspaces" drop constraint "workspaces_created_by_id_foreign";`);
    this.addSql(`alter table "projects" drop constraint "projects_created_by_id_foreign";`);
    this.addSql(`alter table "tasks" drop constraint "tasks_created_by_id_foreign";`);
    this.addSql(`alter table "tasks" drop constraint "tasks_assigned_to_id_foreign";`);
    this.addSql(`alter table "task_comments" drop constraint "task_comments_user_id_foreign";`);
    this.addSql(`alter table "task_attachments" drop constraint "task_attachments_uploaded_by_id_foreign";`);
    this.addSql(`alter table "project_users" drop constraint "project_users_user_id_foreign";`);
    this.addSql(`alter table "workspace_users" drop constraint "workspace_users_user_id_foreign";`);
    this.addSql(`alter table "projects" drop constraint "projects_workspace_id_foreign";`);
    this.addSql(`alter table "workspace_users" drop constraint "workspace_users_workspace_id_foreign";`);
    this.addSql(`alter table "tasks" drop constraint "tasks_project_id_foreign";`);
    this.addSql(`alter table "project_users" drop constraint "project_users_project_id_foreign";`);
    this.addSql(`alter table "tasks" drop constraint "tasks_parent_task_id_foreign";`);
    this.addSql(`alter table "task_comments" drop constraint "task_comments_task_id_foreign";`);
    this.addSql(`alter table "task_attachments" drop constraint "task_attachments_task_id_foreign";`);
    this.addSql(`alter table "project_user_roles" drop constraint "project_user_roles_project_user_id_foreign";`);
    this.addSql(`alter table "project_user_permission_overrides" drop constraint "project_user_permission_overrides_project_user_id_foreign";`);
    this.addSql(`alter table "workspace_user_permission_overrides" drop constraint "workspace_user_permission_overrides_workspace_user_id_foreign";`);
    this.addSql(`alter table "workspace_user_roles" drop constraint "workspace_user_roles_workspace_user_id_foreign";`);

    this.addSql(`drop table if exists "permissions" cascade;`);
    this.addSql(`drop table if exists "roles" cascade;`);
    this.addSql(`drop table if exists "role_permissions" cascade;`);
    this.addSql(`drop table if exists "users" cascade;`);
    this.addSql(`drop table if exists "invitations" cascade;`);
    this.addSql(`drop table if exists "activity_logs" cascade;`);
    this.addSql(`drop table if exists "workspaces" cascade;`);
    this.addSql(`drop table if exists "projects" cascade;`);
    this.addSql(`drop table if exists "tasks" cascade;`);
    this.addSql(`drop table if exists "task_comments" cascade;`);
    this.addSql(`drop table if exists "task_attachments" cascade;`);
    this.addSql(`drop table if exists "project_users" cascade;`);
    this.addSql(`drop table if exists "project_user_roles" cascade;`);
    this.addSql(`drop table if exists "project_user_permission_overrides" cascade;`);
    this.addSql(`drop table if exists "workspace_users" cascade;`);
    this.addSql(`drop table if exists "workspace_user_permission_overrides" cascade;`);
    this.addSql(`drop table if exists "workspace_user_roles" cascade;`);
  }

}
exports.Migration20260613201016 = Migration20260613201016;
