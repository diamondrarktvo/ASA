import { useAppDispatch, useAppSelector } from "_store";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import {
  formatDateToString,
  getObjectDataToAsyncStorage,
  pushNotification,
} from "_utils";
import {
  setAccount,
  setToken,
  setIsConnected,
} from "./src/features/account/accountSlice";

const SOCKET_URL = process.env.EXPO_PUBLIC_API_HOST || "";

const SocketNotification = () => {
  const [connectedToSocket, setConnectedToSocket] = useState(false);
  const accountUser = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const socket = new WebSocket(
    `${SOCKET_URL}/ws/notification/${accountUser.user.nickname || ""}`,
    ["access_token", `${accountUser.token || ""}`],
  );

  useEffect(() => {
    getObjectDataToAsyncStorage("current_account")
      .then((res) => {
        console.log("resss current tavany e, ", res);
        if (res) dispatch(setAccount(res));
      })
      .catch((err) => {
        console.log("eeeeeror local storage : ", err);
      });
    getObjectDataToAsyncStorage("token")
      .then((res) => {
        if (res) {
          dispatch(setToken(res));
          dispatch(setIsConnected(true));
        }
        console.log("resss token tavany e, ", res);
      })
      .catch((err) => {
        console.log("eeeee local storage : ", err);
      });
  }, []);

  useEffect(() => {
    // verify connection
    socket.onopen = (e) => {
      console.log("Connexion réussi sur le socket notification!");
      setConnectedToSocket(true);
    };

    // verify error
    socket.onclose = (e) => {
      //console.log("Connexion échoué sur le socket notification!");
      //console.log("error socket : ", e);
    };

    // receive notifs
    socket.onmessage = async (e) => {
      const data = JSON.parse(e.data);
      await pushNotification(
        data.message.title,
        `${data.message.nickname} ${data.message.content}`,
        formatDateToString(data.message.timestamp),
      );
      console.log(data.message);
    };
  }, [accountUser]);

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
        Vous êtes bien connectés.
      </Text>
    </View>
  ) : null;
};

export default SocketNotification;
