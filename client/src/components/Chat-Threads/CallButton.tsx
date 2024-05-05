"use client";
import React from "react";
import { PhoneIcon } from "@/utils/icons";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";
import { useSelectedUser, useUser } from "@/store/userStore";

const CallButton = () => {
  const router = useRouter();
  const socket = io("http://localhost:4000");
  const [cookie] = useCookies(["user"]);
  const selectedUser = useSelectedUser((state) => state.selectedUser);
  const myUser = useUser((state) => state.myUser);

  const handleClick = () => {
    socket.emit(
      "private message",
      selectedUser.email,
      `📞 ${myUser?.name} is calling`,
      cookie.user
    );
    router.push("/chat/room");
  };
  return (
    <button onClick={handleClick}>
      <PhoneIcon />
    </button>
  );
};

export default CallButton;
