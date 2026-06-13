const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const WorkspaceUserPermissionOverride = defineEntity({
  name: "WorkspaceUserPermissionOverride",

  tableName: "workspace_user_permission_overrides",

  indexes: [{ properties: ["workspaceUser", "permission"], unique: true }],

  properties: {
    ...BaseEntityProps,

    workspaceUser: () =>
      p.manyToOne("WorkspaceUser", {
        fieldName: "workspace_user_id",
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

module.exports = WorkspaceUserPermissionOverride;