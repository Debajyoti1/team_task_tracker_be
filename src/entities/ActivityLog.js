const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const ActivityLog = defineEntity({
  name: "ActivityLog",

  tableName: "activity_logs",

  properties: {
    ...BaseEntityProps,

    // e.g. "task.created", "task.assigned", "project.created", "member.invited"
    action: p.string({ length: 255, nullable: false }),

    // "workspace", "project", "task", etc.
    resourceType: p.string({ length: 50, nullable: true, fieldName: "resource_type" }),

    // UUID of the affected resource
    resourceId: p.uuid({ nullable: true, fieldName: "resource_id" }),

    // Any extra context — old value, new value, assignee, etc.
    metadata: p.json({ nullable: true }),

    user: () =>
      p.manyToOne("User", {
        fieldName: "user_id",
        nullable: true, // nullable in case of system-generated events
      }),
  },
});

module.exports = ActivityLog;