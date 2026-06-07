const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const OrganizationUserPermissionOverride = defineEntity({
  name: "OrganizationUserPermissionOverride",

  tableName: "organization_user_permission_overrides",

  indexes: [{ properties: ["organizationUser", "permission"], unique: true }],

  properties: {
    ...BaseEntityProps,

    organizationUser: () =>
      p.manyToOne("OrganizationUser", {
        fieldName: "organization_user_id",
        nullable: false,
      }),

    permission: () =>
      p.manyToOne("Permission", {
        fieldName: "permission_id",
        nullable: false,
      }),

    // "allow" grants the permission regardless of role
    // "deny"  revokes the permission regardless of role
    effect: p.enum({
      items: ["allow", "deny"],
      nullable: false,
    }),
  },
});

module.exports = OrganizationUserPermissionOverride;