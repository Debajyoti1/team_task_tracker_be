const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const WorkspaceUserRole = defineEntity({
  name: "WorkspaceUserRole",

  tableName: "workspace_user_roles",

  indexes: [{ properties: ["workspaceUser", "role"], unique: true }],

  properties: {
    ...BaseEntityProps,

    workspaceUser: () =>
      p.manyToOne("WorkspaceUser", {
        fieldName: "workspace_user_id",
        nullable: false,
      }),

    role: () =>
      p.manyToOne("Role", {
        fieldName: "role_id",
        nullable: false,
      }),
  },
});

module.exports = WorkspaceUserRole;