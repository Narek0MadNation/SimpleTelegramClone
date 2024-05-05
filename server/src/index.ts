import express from "express";
import cors from "cors";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import { connect, connection } from "mongoose";
import { userRouter } from "./Route/userRouter";
import { socket } from "./socket";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);

const { PORT, MONGODB_URI } = process.env || 4000;

const start = async () => {
  connect(MONGODB_URI!);

  const db = connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("CONNECTED TO DB");
    server.listen(PORT, () => console.log(`SERVER LIVE ON ${PORT}`));
  });

  socket(server);
};

start();
