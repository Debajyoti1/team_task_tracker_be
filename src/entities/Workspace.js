const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const Workspace = defineEntity({
  name: "Workspace",

  tableName: "workspaces",

  properties: {
    ...BaseEntityProps,

    name: p.string({ length: 255 }),

    createdBy: () =>
      p.manyToOne("User", {
        fieldName: "created_by",
        nullable: false,
      }),

    workspaceUsers: () =>
      p.oneToMany("WorkspaceUser").mappedBy("workspace"),

    projects: () =>
      p.oneToMany("Project").mappedBy("workspace"),
  },
});

module.exports = Workspace;