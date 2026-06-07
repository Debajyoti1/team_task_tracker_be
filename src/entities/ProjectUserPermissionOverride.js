const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const ProjectUserPermissionOverride = defineEntity({
  name: "ProjectUserPermissionOverride",

  tableName: "project_user_permission_overrides",

  indexes: [{ properties: ["projectUser", "permission"], unique: true }],

  properties: {
    ...BaseEntityProps,

    projectUser: () =>
      p.manyToOne("ProjectUser", {
        fieldName: "project_user_id",
        nullable: false,
      }),

    permission: () =>
      p.manyToOne("Permission", {
        fieldName: "permission_id",
        nullable: false,
      }),

    // "allow" grants the permission regardless of role
    // "deny"  revokes the permission regardless of role
    effect: p.enum({
      items: ["allow", "deny"],
      nullable: false,
    }),
  },
});

module.exports = ProjectUserPermissionOverride;