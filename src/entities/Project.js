const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntity = require("./BaseEntity");

const Project = defineEntity({
  name: "Project",

  extends: BaseEntity,

  tableName: "projects",

  indexes: [
    {
      properties: ["organization"],
    },
  ],

  properties: {
    name: p.string(),

    description: p.text({
      nullable: true,
    }),

    organization: () => p.manyToOne("Organization"),

    createdBy: () => p.manyToOne("User"),

    tasks: () => p.oneToMany("Task", "project"),
  },
});

module.exports = Project;
