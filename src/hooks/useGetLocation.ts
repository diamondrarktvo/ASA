import { useState, useContext, useEffect } from "react";
import * as Location from "expo-location";

export const useGetLocation = () => {
  //all states
  const [errorMsgLocation, setErrorMsgLocation] = useState<string>();
  let data = null;
  //all effects
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return setErrorMsgLocation(
          "Permission pour accéder au position est refuser!",
        );
      }
      let location = await Location.getCurrentPositionAsync();
      data = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    })();
  }, []);
  return { data, errorMsgLocation };
};
