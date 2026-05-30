const { MikroORM } = require("@mikro-orm/postgresql");
const mikroOrmConfig = require("./mikro-orm");

let orm;

async function initializeDatabase() {
  if (orm) {
    return orm;
  }

  orm = await MikroORM.init(mikroOrmConfig);

  await orm.getMigrator().up();

  return orm;
}

function getORM() {
  if (!orm) {
    throw new Error(
      "Database not initialized."
    );
  }

  return orm;
}

async function checkDatabaseHealth() {
  try {
    await getORM()
      .em.getConnection()
      .execute("select 1");

    return true;
  } catch {
    return false;
  }
}

async function closeDatabase() {
  if (orm) {
    await orm.close(true);
  }
}

module.exports = {
  initializeDatabase,
  getORM,
  checkDatabaseHealth,
  closeDatabase,
};