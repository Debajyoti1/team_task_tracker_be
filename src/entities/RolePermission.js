const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");


const RolePermission = defineEntity({
  name: "RolePermission",

  tableName: "role_permissions",

  properties: {
    ...BaseEntityProps,
    role: () =>
      p.manyToOne("Role", {
        fieldName: "role_id",
        primary: true,
      }),

    permission: () =>
      p.manyToOne("Permission", {
        fieldName: "permission_id",
        primary: true,
      }),
  },
});

module.exports = RolePermission;