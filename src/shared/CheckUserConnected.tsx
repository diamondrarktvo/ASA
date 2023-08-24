import Box, { BoxProps } from "./Box";
import React, { useCallback, useEffect, useState } from "react";
import LoginScreen from "../features/account/components/LoginScreen";
import { getDataToAsyncStorage, getObjectDataToAsyncStorage } from "_utils";
import { useFocusEffect } from "@react-navigation/native";
import { useAppSelector } from "_store";

type Props = {
  children: React.ReactNode;
  titleIfNotConnected?: string;
  isUserConnected: boolean;
  subTitleIfNotConnected: string;
} & Partial<BoxProps>;

const CheckUserConnected: React.FC<Props> = ({
  children,
  titleIfNotConnected,
  isUserConnected,
  subTitleIfNotConnected,
  ...props
}) => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const accountUser = useAppSelector((state) => state.account);

  useEffect(() => {
    if (accountUser.token !== null) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
    }
  }, [accountUser]);

  console.log("accountUser : ", accountUser);

  console.log("yesysys : ", isUserLogged + " eieiieiei " + isUserConnected);

  return (
    <Box flex={1} backgroundColor="mainBackground" {...props}>
      {isUserLogged || isUserConnected ? (
        children
      ) : (
        <LoginScreen
          title={titleIfNotConnected}
          subTitle={subTitleIfNotConnected}
        />
      )}
    </Box>
  );
};

export default CheckUserConnected;
