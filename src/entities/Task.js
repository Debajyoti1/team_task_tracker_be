const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntity = require("./BaseEntity");

const { TaskStatus, TaskPriority } = require("../utils/constants");

const Task = defineEntity({
  name: "Task",

  extends: BaseEntity,

  tableName: "tasks",

  indexes: [
    {
      properties: ["status"],
    },
    {
      properties: ["dueDate"],
    },
    {
      properties: ["assignee", "status"],
    },
  ],

  properties: {
    title: p.string(),

    description: p.text({
      nullable: true,
    }),

    priority: p.enum({
      items: Object.values(TaskPriority),
    }),

    status: p.enum({
      items: Object.values(TaskStatus),

      default: "TODO",
    }),

    dueDate: p.datetime({
      nullable: true,
    }),

    project: () => p.manyToOne("Project"),

    assignee: () => p.manyToOne("User"),

    createdBy: () => p.manyToOne("User"),
  },
});

module.exports = Task;
