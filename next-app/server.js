import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("socket connected: %s", socket.id);
    // grab what needs to be emitted
    // lookup db, snapshot some values from domain objects, redis, etc

    // then emit!
    // for the test, broadcast to all connected sockets on a timer
    const interval = setInterval(function () {
      io.emit("payload", {
        socketId: socket.id,
        datetime: new Date().getTime(),
        important: "Matt is cool",
      });
    }, 5000);

    socket.on("disconnect", (reason) => {
      console.log("socket disconnected: %s", socket.id);
      console.log("disconnect reason: %s", reason);
      clearInterval(interval);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
