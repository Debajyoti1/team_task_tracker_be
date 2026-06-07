const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const TaskAttachment = defineEntity({
  name: "TaskAttachment",

  tableName: "task_attachments",

  properties: {
    ...BaseEntityProps,

    fileName: p.string({ length: 500, nullable: true, fieldName: "file_name" }),

    fileUrl: p.text({ nullable: true, fieldName: "file_url" }),

    task: () =>
      p.manyToOne("Task", {
        fieldName: "task_id",
        nullable: false,
      }),

    uploadedBy: () =>
      p.manyToOne("User", {
        fieldName: "uploaded_by",
        nullable: true,
      }),
  },
});

module.exports = TaskAttachment;