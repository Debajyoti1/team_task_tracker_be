const http = require("http");
const app = require("./app");
const logger = require("../config/logger");

async function startServer() {
  //DB init
  const server = http.createServer(app);
  server.listen(8000, () => {
    logger.info("Server started on port 3000");
  });

  return server;
}

module.exports = {startServer};
