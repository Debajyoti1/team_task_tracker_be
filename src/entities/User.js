const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntity = require("./BaseEntity");
const { UserRoles } = require("../utils/constants");

const User = defineEntity({
  name: "User",

  extends: BaseEntity,

  tableName: "users",

  indexes: [
    {
      properties: ["organization"],
    },
  ],

  properties: {
    email: p.string({
      unique: true,
    }),

    passwordHash: p.text(),

    firstName: p.string(),

    lastName: p.string(),

    role: p.enum({
      items: Object.values(),
    }),

    isActive: p.boolean({
      default: true,
    }),

    organization: () => p.manyToOne("Organization"),
  },
});

module.exports = User;
