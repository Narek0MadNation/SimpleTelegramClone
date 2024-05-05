"use client";
import React, { useState } from "react";
import { io } from "socket.io-client";
import dynamic from "next/dynamic";
import { SendMsIcon, SmileFaceIcon } from "@/utils/icons";
import { useSelectedUser } from "@/store/userStore";
import { useCookies } from "react-cookie";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const MessageInput = () => {
  const [inpValue, setInpValue] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);

  const selectedUser = useSelectedUser((state) => state.selectedUser);
  const [cookie, setCookie] = useCookies(["user"]);

  const socket = io("http://localhost:4000");

  const onEmojiClick = ({ emoji }: { emoji: string }) => {
    setInpValue((pre) => pre + emoji);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    socket.emit("private message", selectedUser.email, inpValue, cookie);

    setInpValue("");
  };

  return (
    <form className="mt-auto relative" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Message"
          className="input w-full pl-14 input-bordered"
          onChange={(e) => setInpValue(e.target.value)}
          value={inpValue}
        />
      </div>
      <button
        type="button"
        onClick={() => setShowEmoji(!showEmoji)}
        className="absolute top-1/2 left-5 -translate-y-1/2"
      >
        <SmileFaceIcon />
      </button>
      {showEmoji && (
        <div className="absolute bottom-full">
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
      <button
        type="submit"
        className="absolute top-1/2 right-5 -translate-y-1/2"
      >
        <SendMsIcon />
      </button>
    </form>
  );
};

export default MessageInput;
