const path = require("path");
const { PostgreSqlDriver } = require("@mikro-orm/postgresql");
const { UnderscoreNamingStrategy } = require("@mikro-orm/core");
const config = require("./config/env");

const User = require("./entities/User");

const Workspace = require("./entities/Workspace");
const WorkspaceUser = require("./entities/WorkspaceUser");
const WorkspaceUserRole = require("./entities/WorkspaceUserRole");
const WorkspaceUserPermissionOverride = require("./entities/WorkspaceUserPermissionOverride");

const Project = require("./entities/Project");
const ProjectUser = require("./entities/ProjectUser");
const ProjectUserRole = require("./entities/ProjectUserRole");
const ProjectUserPermissionOverride = require("./entities/ProjectUserPermissionOverride");

const Task = require("./entities/Task");
const TaskComment = require("./entities/TaskComment");
const TaskAttachment = require("./entities/TaskAttachment");

const Role = require("./entities/Role");
const RolePermission = require("./entities/RolePermission");
const ActivityLog = require("./entities/ActivityLog");
const Invitation = require("./entities/Invitation");
const Permission = require("./entities/Permission");
module.exports = {
  driver: PostgreSqlDriver,

  host: config.db.host,
  port: config.db.port,

  dbName: config.db.database,
  user: config.db.user,
  password: config.db.password,

  entities: [
    User,
    Workspace,
    WorkspaceUser,
    WorkspaceUserRole,
    WorkspaceUserPermissionOverride,
    Project,
    ProjectUser,
    ProjectUserRole,
    ProjectUserPermissionOverride,
    Task,
    TaskComment,
    TaskAttachment,
    Role,
    RolePermission,
    ActivityLog,
    Invitation,
    Permission,
  ],

  namingStrategy: UnderscoreNamingStrategy,

  debug: config.app.env === "dev",

  pool: {
    min: config.db.minPool,
    max: config.db.maxPool,
  },

  migrations: {
    path: path.join(__dirname, "./database/migrations"),
    emit: "js",
    transactional: true,
    allOrNothing: true,
    snapshot: false,
  },

  driverOptions: {
    application_name: config.app.name,
    ssl: config.db.ssl === true ? { rejectUnauthorized: false } : false,
  },
};
