const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const Organization = defineEntity({
  name: "Organization",

  tableName: "organizations",

  properties: {
    ...BaseEntityProps,

    name: p.string({ length: 255 }),

    createdBy: () =>
      p.manyToOne("User", {
        fieldName: "created_by",
        nullable: false,
      }),

    organizationUsers: () =>
      p.oneToMany("OrganizationUser").mappedBy("organization"),

    projects: () =>
      p.oneToMany("Project").mappedBy("organization"),
  },
});

module.exports = Organization;