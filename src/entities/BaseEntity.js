const { defineEntity, p } = require("@mikro-orm/core");

const BaseEntity = defineEntity({
  abstract: true,

  properties: {
    id: p.uuid().primary(),

    createdAt: p.datetime({
      defaultRaw: "now()",
    }),

    updatedAt: p.datetime({
      defaultRaw: "now()",
      onUpdate: () => new Date(),
    }),
  },
});

module.exports = BaseEntity;
