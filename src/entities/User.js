const { defineEntity, p } = require("@mikro-orm/core");
const { USER_ROLES } = require("../utils/constants");
const BaseEntityProps = require("./BaseEntity");

const User = defineEntity({
  name: "User",

  tableName: "users",

  indexes: [
    {
      properties: ["organization"],
    },
  ],

  properties: {
    ...BaseEntityProps,
    email: p.string({
      unique: true,
    }),

    passwordHash: p.text(),

    firstName: p.string(),

    lastName: p.string(),

    role: p.enum({
      items: Object.values(USER_ROLES),
    }),

    isActive: p.boolean({
      default: true,
    }),

    organization: () => p.manyToOne("Organization").inversedBy("users"),
    projects: () => p.oneToMany("Project").mappedBy("createdBy"),
    assignedTasks: () => p.oneToMany("Task").mappedBy("assignee"),
    createdTasks: () => p.oneToMany("Task").mappedBy("createdBy"),
  },
});

module.exports = User;
