const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const Project = defineEntity({
  name: "Project",

  tableName: "projects",

  properties: {
    ...BaseEntityProps,

    name: p.string({ length: 255 }),

    description: p.text({ nullable: true }),

    status: p.enum({
      items: ["active", "archived", "completed"],
      default: "active",
    }),

    workspace: () =>
      p.manyToOne("Workspace", {
        fieldName: "workspace_id",
        nullable: false,
      }),

    createdBy: () =>
      p.manyToOne("User", {
        fieldName: "created_by",
        nullable: false,
      }),

    projectUsers: () =>
      p.oneToMany("ProjectUser").mappedBy("project"),

    tasks: () =>
      p.oneToMany("Task").mappedBy("project"),
  },
});

module.exports = Project;