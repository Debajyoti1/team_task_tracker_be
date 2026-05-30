const { startServer } = require("./server/server");

let server;

(async () => {
  try {
    server = await startServer();
  } catch (error) {
    process.exit(1);
    console.error(error);
  }
})();
