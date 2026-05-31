const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntity = require("./BaseEntity");

const Organization = defineEntity({
  name: "Organization",

  extends: BaseEntity,

  tableName: "organizations",

  properties: {
    name: p.string({
      length: 255,
    }),

    users: () => p.oneToMany("User", "organization"),

    projects: () => p.oneToMany("Project", "organization"),
  },
});

module.exports = Organization;
