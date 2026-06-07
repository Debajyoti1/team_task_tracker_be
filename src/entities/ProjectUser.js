const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const ProjectUser = defineEntity({
  name: "ProjectUser",

  tableName: "project_users",

  indexes: [{ properties: ["user", "project"], unique: true }],

  properties: {
    ...BaseEntityProps,

    user: () =>
      p.manyToOne("User", {
        fieldName: "user_id",
        nullable: false,
      }),

    project: () =>
      p.manyToOne("Project", {
        fieldName: "project_id",
        nullable: false,
      }),

    userRoles: () =>
      p.oneToMany("ProjectUserRole").mappedBy("projectUser"),

    permissionOverrides: () =>
      p.oneToMany("ProjectUserPermissionOverride").mappedBy("projectUser"),
  },
});

module.exports = ProjectUser;