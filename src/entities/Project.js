const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const Project = defineEntity({
  name: "Project",

  tableName: "projects",

  indexes: [
    {
      properties: ["organization"],
    },
  ],

  properties: {
    ...BaseEntityProps,
    name: p.string(),

    description: p.text({
      nullable: true,
    }),

    organization: () => p.manyToOne("Organization").inversedBy("projects"),

    createdBy: () => p.manyToOne("User").inversedBy("projects"),

    tasks: () => p.oneToMany("Task").mappedBy("project"),
  },
});

module.exports = Project;
