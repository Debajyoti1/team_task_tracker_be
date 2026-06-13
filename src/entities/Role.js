const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const Role = defineEntity({
  name: "Role",

  tableName: "roles",

  properties: {
    ...BaseEntityProps,

    // e.g. "workspace_admin", "workspace_member", "project_manager", "project_member", "viewer"
    code: p.string({ length: 100, unique: true }),

    name: p.string({ length: 255 }),

    description: p.text({ nullable: true }),

    // Scope clarifies which resource type this role applies to
    scope: p.enum({
      items: ["workspace", "project"],
      nullable: true,
    }),

    rolePermissions: () =>
      p.oneToMany("RolePermission").mappedBy("role"),

    workspaceUserRoles: () =>
      p.oneToMany("WorkspaceUserRole").mappedBy("role"),

    projectUserRoles: () =>
      p.oneToMany("ProjectUserRole").mappedBy("role"),
  },
});

module.exports = Role;