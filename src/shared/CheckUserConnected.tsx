import Box, { BoxProps } from "./Box";
import React from "react";
import LoginScreen from "../features/account/components/LoginScreen";

type Props = {
  children: React.ReactNode;
  isUserLogged: boolean;
  titleIfNotConnected?: string;
  subTitleIfNotConnected: string;
  loggedIn: () => void;
} & Partial<BoxProps>;

const CheckUserConnected: React.FC<Props> = ({
  children,
  isUserLogged,
  titleIfNotConnected,
  subTitleIfNotConnected,
  loggedIn,
  ...props
}) => {
  return (
    <Box flex={1} backgroundColor="mainBackground" {...props}>
      {isUserLogged ? (
        children
      ) : (
        <LoginScreen
          loggedIn={loggedIn}
          title={titleIfNotConnected}
          subTitle={subTitleIfNotConnected}
        />
      )}
    </Box>
  );
};

export default CheckUserConnected;
