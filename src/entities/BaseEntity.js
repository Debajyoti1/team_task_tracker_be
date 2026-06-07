const { p } = require("@mikro-orm/core");

const BaseEntityProps = {
  id: p.uuid().primary(),
  
  // Use .onCreate() to specify the database default raw expression
  createdAt: p.datetime().onCreate(() => 'now()'),

  // Chain .onCreate() and .onUpdate() modifiers
  updatedAt: p.datetime()
    .onCreate(() => 'now()')
    .onUpdate(() => 'now()'),
};

module.exports = BaseEntityProps;