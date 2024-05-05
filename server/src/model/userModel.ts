import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  imageId: String,
  email: { type: String, unique: true },
  messages: [
    {
      message: String,
      sender: String,
      reciever: String,
      time: Date,
    },
  ],
});

export const User = model("User", userSchema);
