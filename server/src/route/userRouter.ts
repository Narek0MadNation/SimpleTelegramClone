import { Request, Response, Router } from "express";
import { User } from "../model/userModel";
// import { sign, verify } from "jsonwebtoken";
const { sign, verify } = require("jsonwebtoken");

const router = Router();

router.post("/auth", async (req: Request, res: Response) => {
  const { email } = req.body;
  let user;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      user = existingUser;
    } else {
      user = new User(req.body);
      await user.save();
    }

    const accessToken = sign(user.toObject(), process.env.JWT_SECRET!);

    res.setHeader("Set-Cookie", `user=${accessToken}; Path=/`);
    res.send(user);
  } catch (error) {
    console.error(error);
  }
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error(error);
  }
});

router.get("/user", async (req: Request, res: Response) => {
  try {
    const { email } = await verify(
      req.headers.authorization?.split(" ")[1]!,
      process.env.JWT_SECRET!
    );

    const user = await User.find({ email });

    res.send(user);
  } catch (error) {
    console.error(error);
  }
});

router.get("/messages", async (req: Request, res: Response) => {
  try {
    const { sender, reciever } = req.query;
    const user = await User.find({ email: reciever });

    const filterUser = user[0]?.messages?.filter(
      (message: any) =>
        (message.sender === sender && message.reciever === reciever) ||
        (message.sender === reciever && message.reciever === sender)
    );

    res.send(filterUser);
  } catch (error) {
    console.error(error);
  }
});

export { router as userRouter };
