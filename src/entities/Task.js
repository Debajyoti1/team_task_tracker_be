const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const Task = defineEntity({
  name: "Task",

  tableName: "tasks",

  properties: {
    ...BaseEntityProps,

    title: p.string({ length: 500 }),

    description: p.text({ nullable: true }),

    status: p.enum({
      items: ["todo", "in_progress", "in_review", "done", "cancelled"],
      default: "todo",
    }),

    priority: p.enum({
      items: ["low", "medium", "high", "urgent"],
      nullable: true,
    }),

    dueDate: p.datetime().nullable(true).fieldName("due_date"),

    completedAt: p.datetime().nullable(true).fieldName("completed_at"),

    project: () =>
      p.manyToOne("Project", {
        fieldName: "project_id",
        nullable: false,
      }),

    createdBy: () =>
      p.manyToOne("User", {
        fieldName: "created_by",
        nullable: false,
      }),

    assignedTo: () =>
      p.manyToOne("User", {
        fieldName: "assigned_to",
        nullable: true,
      }),

    // Self-referential for subtasks
    parentTask: () =>
      p.manyToOne("Task", {
        fieldName: "parent_task_id",
        nullable: true,
      }),

    subtasks: () =>
      p.oneToMany("Task").mappedBy("parentTask"),

    comments: () =>
      p.oneToMany("TaskComment").mappedBy("task"),

    attachments: () =>
      p.oneToMany("TaskAttachment").mappedBy("task"),
  },
});

module.exports = Task;