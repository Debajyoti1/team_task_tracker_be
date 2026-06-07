const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const Role = defineEntity({
  name: "Role",

  tableName: "roles",

  properties: {
    ...BaseEntityProps,

    // e.g. "org_owner", "org_admin", "project_manager", "project_member", "viewer"
    code: p.string({ length: 100, unique: true }),

    name: p.string({ length: 255 }),

    description: p.text({ nullable: true }),

    // Scope clarifies which resource type this role applies to
    scope: p.enum({
      items: ["organization", "project"],
      nullable: true,
    }),

    rolePermissions: () =>
      p.oneToMany("RolePermission").mappedBy("role"),

    organizationUserRoles: () =>
      p.oneToMany("OrganizationUserRole").mappedBy("role"),

    projectUserRoles: () =>
      p.oneToMany("ProjectUserRole").mappedBy("role"),
  },
});

module.exports = Role;