const { createClient } = require("redis");
const config = require("./env");
const logger = require("./logger");

let redisClient = null;

async function initializeRedis() {
  if (redisClient) {
    return redisClient;
  }

  redisClient = createClient({
    socket: {
      host: config.redis.host,
      port: config.redis.port,
    },

    database: config.redis.db,

    ...(config.redis.password && {
      password: config.redis.password,
    }),
  });

  redisClient.on("connect", () => {
    logger.info("Redis connected");
  });

  redisClient.on("error", (error) => {
    logger.error("Redis error:", error);
  });

  await redisClient.connect();

  return redisClient;
}

function getRedisClient() {
  if (!redisClient) {
    throw new Error("Redis not initialized.");
  }

  return redisClient;
}

async function checkRedisHealth() {
  try {
    const response = await getRedisClient().ping();

    return response === "PONG";
  } catch {
    return false;
  }
}

async function closeRedis() {
  if (redisClient?.isOpen) {
    await redisClient.quit();
  }
}

module.exports = {
  initializeRedis,
  getRedisClient,
  checkRedisHealth,
  closeRedis,
};
