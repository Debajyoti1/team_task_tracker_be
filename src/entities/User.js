const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const User = defineEntity({
  name: "User",

  tableName: "users",

  properties: {
    ...BaseEntityProps,

    email: p.string({ length: 255, unique: true }),

    name: p.string({ length: 255, nullable: true }),

    passwordHash: p.text({ nullable: true, fieldName: "password_hash" }),

    status: p.enum({
      items: ["active", "inactive", "suspended"],
      default: "active",
    }),

    workspaceUsers: () =>
      p.oneToMany("WorkspaceUser").mappedBy("user"),

    projectUsers: () =>
      p.oneToMany("ProjectUser").mappedBy("user"),

    createdWorkspaces: () =>
      p.oneToMany("Workspace").mappedBy("createdBy"),

    createdProjects: () =>
      p.oneToMany("Project").mappedBy("createdBy"),

    // Tasks this user created
    createdTasks: () =>
      p.oneToMany("Task").mappedBy("createdBy"),

    // Tasks currently assigned to this user
    assignedTasks: () =>
      p.oneToMany("Task").mappedBy("assignedTo"),

    // Invitations this user sent to others
    sentInvitations: () =>
      p.oneToMany("Invitation").mappedBy("invitedBy"),

    activityLogs: () =>
      p.oneToMany("ActivityLog").mappedBy("user"),
  },
});

module.exports = User;