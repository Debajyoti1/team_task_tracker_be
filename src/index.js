const logger = require("./config/logger");

const {
  startServer,
  stopServer,
} = require("./server/server");

async function bootstrap() {
  try {
    await startServer();
  } catch (error) {
    logger.fatal(error);
    process.exit(1);
  }
}

async function shutdown(signal) {
  logger.info(`${signal} received`);

  try {
    await stopServer();
    process.exit(0);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

process.on("SIGINT", () => {
  shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});

process.on("uncaughtException", async (error) => {
  logger.fatal(error);

  try {
    await stopServer();
  } finally {
    process.exit(1);
  }
});

process.on("unhandledRejection", async (reason) => {
  logger.fatal(reason);

  try {
    await stopServer();
  } finally {
    process.exit(1);
  }
});

bootstrap();