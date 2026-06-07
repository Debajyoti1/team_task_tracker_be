const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const OrganizationUser = defineEntity({
  name: "OrganizationUser",

  tableName: "organization_users",

  indexes: [{ properties: ["user", "organization"], unique: true }],

  properties: {
    ...BaseEntityProps,

    user: () =>
      p.manyToOne("User", {
        fieldName: "user_id",
        nullable: false,
      }),

    organization: () =>
      p.manyToOne("Organization", {
        fieldName: "organization_id",
        nullable: false,
      }),

    userRoles: () =>
      p.oneToMany("OrganizationUserRole").mappedBy("organizationUser"),

    permissionOverrides: () =>
      p.oneToMany("OrganizationUserPermissionOverride").mappedBy("organizationUser"),
  },
});

module.exports = OrganizationUser;