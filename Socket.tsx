import { useAppSelector } from "_store";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";

const SOCKET_URL = process.env.EXPO_PUBLIC_API_HOST || "";

const Socket = () => {
  const [connectedToSocket, setConnectedToSocket] = useState(false);
  const accountUser = useAppSelector((state) => state.account);

  const socket = new WebSocket(
    `${SOCKET_URL}/ws/notification/${accountUser.user.nickname || ""}`,
    ["access_token", `${accountUser.token || ""}`],
  );

  useEffect(() => {
    console.log("depart : ");
    //console.log("chatSocket : ", socket);

    // verify connection
    socket.onopen = function (e) {
      console.log("Connexion réussi sur le socket !");
      setConnectedToSocket(true);
    };

    // verify error
    socket.onclose = function (e) {
      console.log("Connexion échoué sur le socket !");
    };

    // receive notifs
    socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log(data);
    };
  });

  useEffect(() => {
    let timer = setTimeout(() => {
      if (connectedToSocket) setConnectedToSocket(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [connectedToSocket]);

  return connectedToSocket ? (
    <View
      style={{
        position: "absolute",
        top: 0,
        zIndex: 20,
        backgroundColor: "#2652AA",
        height: 20,
        width: "100%",
      }}
    >
      <Text style={{ textAlign: "center", color: "#F0F2F3" }}>
        Vous êtes connectés au serveur
      </Text>
    </View>
  ) : null;
};

export default Socket;
