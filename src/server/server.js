const http = require("http");

const app = require("./app");
const logger = require("../config/logger");
const env = require("../config/env");

const {
  initializeDatabase,
  closeDatabase,
} = require("../config/database");

const {
  initializeRedis,
  closeRedis,
} = require("../config/redis");

let server;

async function startServer() {
  await initializeDatabase();
  await initializeRedis();

  server = http.createServer(app);

  server.listen(env.app.port, () => {
    logger.info(
      `Server started on port ${env.app.port}`
    );
  });

  return server;
}

async function stopServer() {
  logger.info("Stopping server...");

  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          return reject(error);
        }

        resolve();
      });
    });
  }

  await closeRedis();
  await closeDatabase();

  logger.info("Server stopped");
}

module.exports = {
  startServer,
  stopServer,
};