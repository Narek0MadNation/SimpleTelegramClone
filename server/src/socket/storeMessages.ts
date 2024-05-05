import { Server } from "socket.io";
import { verify } from "jsonwebtoken";
import { User } from "../model/userModel";

const { JWT_SECRET } = process.env;

export const storeMessages = async (
  to: string,
  message: string,
  { user }: { user: string },
  io: Server
) => {
  console.log(user);

  const decoded = verify(user, JWT_SECRET!);
  const [reciever, sender] = await Promise.all([
    User.find({ email: to }),
    User.findById(decoded),
  ]);

  io.sockets.emit("refresh", "new Message");

  if (reciever) {
    reciever[0].messages.push({
      reciever: reciever[0].email,
      message,
      sender: sender?.email,
      time: new Date(),
    });

    sender?.messages.push({
      reciever: reciever[0].email,
      message,
      sender: sender?.email,
      time: new Date(),
    });

    await reciever[0].save();
    await sender?.save();
  }
};
