const http = require("http");
const { app } = require("./app");

async function startServer() {
  //DB init
  const server = http.createServer(app);
  server.listen(8000, () => {
    console.log("Server started on port 3000");
  });

  return server;
}

exports.startServer = startServer;
