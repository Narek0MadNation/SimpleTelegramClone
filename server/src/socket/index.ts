import http from "http";
import { Server } from "socket.io";
import { storeMessages } from "./storeMessages";

export const socket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joined", () => {
      io.sockets.emit("new-user", "new user joined");
    });

    socket.on("private message", async (to, message, mySelf) => {
      console.log(mySelf);

      storeMessages(to, message, mySelf, io);
    });
  });
};
