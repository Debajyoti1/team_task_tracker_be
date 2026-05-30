require("dotenv").config();

const { z } = require("zod");

const envSchema = z.object({
  // App
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(["dev", "test", "stage", "prod"]).default("dev"),
  APP_NAME: z.string().default("app"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),

  // Database
  DB_HOST: z.string().default("127.0.0.1"),
  DB_PORT: z.coerce.number().default(5432),
  DB_NAME: z.string().default("postgres"),
  DB_USER: z.string().default("postgres"),
  DB_PASSWORD: z.string().default("postgres"),
  DB_MAX_POOL: z.coerce.number().default(10),
  DB_MIN_POOL: z.coerce.number().default(2),
  DB_SSL: z.stringbool().default(false),

  // Redis
  REDIS_HOST: z.string().default("127.0.0.1"),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_DB: z.coerce.number().default(0),
  REDIS_PASSWORD: z.string().optional(),

  // JWT
  JWT_ACCESS_SECRET: z.string().default("supersecret"),
  JWT_REFRESH_SECRET: z.string().default("refreshsecret"),
  JWT_ACCESS_EXPIRY: z.string().default("15m"),
  JWT_REFRESH_EXPIRY: z.string().default("7d"),
});

const env = envSchema.parse(process.env);

const config = {
  app: {
    port: env.PORT,
    env: env.NODE_ENV,
    name: env.APP_NAME,
    logLevel: env.logLevel
  },

  db: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    maxPool: env.DB_MAX_POOL,
    minPool: env.DB_MIN_POOL,
    ssl: env.DB_SSL,
  },

  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    db: env.REDIS_DB,
    password: env.REDIS_PASSWORD ?? null,
  },

  jwt: {
    accessSecret: env.JWT_ACCESS_SECRET,
    refreshSecret: env.JWT_REFRESH_SECRET,
    accessExpiry: env.JWT_ACCESS_EXPIRY,
    refreshExpiry: env.JWT_REFRESH_EXPIRY,
  },
};

module.exports = config;