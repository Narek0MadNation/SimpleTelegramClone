import { userProps } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleSubmit = async (
  e: any,
  router: AppRouterInstance,
  avatarId: string,
  socket: any
) => {
  e.preventDefault();
  try {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: e.target[0].value,
        email: e.target[1].value,
        imageId: `https://robohash.org/${avatarId}.png`,
      }),
    });
    socket.emit("joined", "new-user");
    router.push("/chat");
  } catch (error) {
    console.error(error);
  }
};

export const fetchUser = async (
  cookie: { user?: any },
  setUser: { (user: any): void; (arg0: any): void }
) => {
  const accessToken = cookie.user;

  const response = await fetch("/api/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const user = await response.json();
  setUser(user[0]);
};

export const fetchUsers = async (mySelf: userProps, setUsers: any) => {
  const data = await fetch("/api/users");
  const myUsers = await data.json();

  setUsers(myUsers.filter((user: any) => user.email !== mySelf?.email));
};

export const fetchMessages = async (
  sender: any,
  reciever: any,
  setMessages: any
) => {
  if (sender && reciever) {
    try {
      const res = await fetch(
        `/api/messages?sender=${sender?.email}&reciever=${reciever?.email}`
      );

      const messages = await res?.json();

      setMessages(messages);
    } catch (error) {
      console.error(error);
      setMessages(null);
    }
  }
};
