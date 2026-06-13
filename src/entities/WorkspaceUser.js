const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const WorkspaceUser = defineEntity({
  name: "WorkspaceUser",

  tableName: "workspace_users",

  indexes: [{ properties: ["user", "workspace"], unique: true }],

  properties: {
    ...BaseEntityProps,

    user: () =>
      p.manyToOne("User", {
        fieldName: "user_id",
        nullable: false,
      }),

    workspace: () =>
      p.manyToOne("Workspace", {
        fieldName: "workspace_id",
        nullable: false,
      }),

    userRoles: () =>
      p.oneToMany("WorkspaceUserRole").mappedBy("workspaceUser"),

    permissionOverrides: () =>
      p.oneToMany("WorkspaceUserPermissionOverride").mappedBy("workspaceUser"),
  },
});

module.exports = WorkspaceUser;