const { createLogger, format, transports } = require("winston");
const config = require("./env");

const logger = createLogger({
  level: config.app.logLevel,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
