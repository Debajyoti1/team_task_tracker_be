const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const TaskComment = defineEntity({
  name: "TaskComment",

  tableName: "task_comments",

  properties: {
    ...BaseEntityProps,

    comment: p.text({ nullable: false }),

    task: () =>
      p.manyToOne("Task", {
        fieldName: "task_id",
        nullable: false,
      }),

    user: () =>
      p.manyToOne("User", {
        fieldName: "user_id",
        nullable: false,
      }),
  },
});

module.exports = TaskComment;