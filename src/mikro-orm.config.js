const path = require("path");
const { PostgreSqlDriver } = require("@mikro-orm/postgresql");
const { UnderscoreNamingStrategy } = require("@mikro-orm/core");
const config = require("./config/env");

const User = require("./entities/User");
const Organization = require("./entities/Organization");
const Project = require("./entities/Project");
const Task = require("./entities/Task");

module.exports = {
  driver: PostgreSqlDriver,

  host: config.db.host,
  port: config.db.port,

  dbName: config.db.database,
  user: config.db.user,
  password: config.db.password,

  entities: [User, Organization, Project, Task],

  namingStrategy: UnderscoreNamingStrategy,

  debug: config.app.env === "dev",

  pool: {
    min: config.db.minPool,
    max: config.db.maxPool,
  },

  migrations: {
    path: path.join(__dirname, "./database/migrations"),
    transactional: true,
    allOrNothing: true,
    snapshot: false,
  },

  driverOptions: {
    connection: {
      application_name: config.app.name,

      ssl: config.db.ssl === true ? { rejectUnauthorized: false } : false,
    },
  },
};
