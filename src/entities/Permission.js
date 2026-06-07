const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const Permission = defineEntity({
  name: "Permission",

  tableName: "permissions",

  properties: {
    ...BaseEntityProps,

    // e.g. "project.delete", "task.assign", "organization.invite_members"
    code: p.string({ length: 100, unique: true }),

    description: p.text({ nullable: true }),

    rolePermissions: () =>
      p.oneToMany("RolePermission").mappedBy("permission"),

    userPermissionOverrides: () =>
      p.oneToMany("OrganizationUserPermissionOverride").mappedBy("permission"),
  },
});

module.exports = Permission;