const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const ProjectUserRole = defineEntity({
  name: "ProjectUserRole",

  tableName: "project_user_roles",

  indexes: [{ properties: ["projectUser", "role"], unique: true }],

  properties: {
    ...BaseEntityProps,

    projectUser: () =>
      p.manyToOne("ProjectUser", {
        fieldName: "project_user_id",
        nullable: false,
      }),

    role: () =>
      p.manyToOne("Role", {
        fieldName: "role_id",
        nullable: false,
      }),
  },
});

module.exports = ProjectUserRole;