const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const OrganizationUserRole = defineEntity({
  name: "OrganizationUserRole",

  tableName: "organization_user_roles",

  indexes: [{ properties: ["organizationUser", "role"], unique: true }],

  properties: {
    ...BaseEntityProps,

    organizationUser: () =>
      p.manyToOne("OrganizationUser", {
        fieldName: "organization_user_id",
        nullable: false,
      }),

    role: () =>
      p.manyToOne("Role", {
        fieldName: "role_id",
        nullable: false,
      }),
  },
});

module.exports = OrganizationUserRole;