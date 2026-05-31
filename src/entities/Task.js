const { defineEntity, p } = require("@mikro-orm/core");

const { TASK_STATUS, TASK_PRIORITY } = require("../utils/constants");

const BaseEntityProps = require("./BaseEntity");

const Task = defineEntity({
  name: "Task",

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
    ...BaseEntityProps,
    title: p.string(),

    description: p.text({
      nullable: true,
    }),

    priority: p.enum({
      items: Object.values(TASK_PRIORITY),
    }),

    status: p.enum({
      items: Object.values(TASK_STATUS),

      default: TASK_STATUS.TODO,
    }),

    dueDate: p.datetime({
      nullable: true,
    }),

    project: () => p.manyToOne("Project").inversedBy("tasks"),

    assignee: () => p.manyToOne("User").inversedBy("assignedTasks"),

    createdBy: () => p.manyToOne("User").inversedBy("createdTasks"),
  },
});



module.exports = Task;
