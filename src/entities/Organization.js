const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const Organization = defineEntity({
  name: "Organization",

  tableName: "organizations",

  properties: {
    ...BaseEntityProps,
    name: p.string({
      length: 255,
    }),

    users: () => p.oneToMany("User").mappedBy("organization"),

    projects: () => p.oneToMany("Project").mappedBy("organization"),
  },
});

module.exports = Organization;
