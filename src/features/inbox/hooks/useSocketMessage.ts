import { useAppSelector } from "_store";
import { useEffect, useRef, useState } from "react";
import { messageType } from "../types";

const SOCKET_URL = process.env.EXPO_PUBLIC_API_HOST || "";

type messageSocketProps = {
  id_conversation: number | null;
  token: string | undefined;
};

export function useSocketMessage({
  id_conversation,
  token,
}: messageSocketProps) {
  if (!id_conversation || !token) return { messages: [] };
  const [connectedToSocket, setConnectedToSocket] = useState(false);
  const [messageCurrent, setMessageCurrent] = useState<messageType[]>([]);

  const socket = new WebSocket(
    `${SOCKET_URL}/ws/conversation/${id_conversation}`,
    ["access_token", `${token || ""}`],
  );

  console.log("id_conversation : ", id_conversation);
  console.log("token : ", token);

  useEffect(() => {
    // verify connection
    socket.onopen = (e) => {
      console.log("Connexion réussi sur le socket message!");
      setConnectedToSocket(true);
    };

    // verify error
    socket.onclose = (e) => {
      console.log("error ", e);
      console.log("Connexion échoué sur le socket message!");
    };

    // receive notifs
    socket.onmessage = async (e) => {
      const data = JSON.parse(e.data);
      //setMessageCurrent(data.message);
      console.log(data);
    };
  }, [id_conversation]);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (connectedToSocket) setConnectedToSocket(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [connectedToSocket]);

  return {
    messageCurrent,
  };
}
