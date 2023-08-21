import Box, { BoxProps } from "./Box";
import React from "react";
import LoginScreen from "../features/account/components/LoginScreen";

type Props = {
  children: React.ReactNode;
  isUserLogged: boolean;
  titleIfNotConnected?: string;
  subTitleIfNotConnected: string;
} & Partial<BoxProps>;

const CheckUserConnected: React.FC<Props> = ({
  children,
  isUserLogged,
  titleIfNotConnected,
  subTitleIfNotConnected,
  ...props
}) => {
  return (
    <Box flex={1} backgroundColor="mainBackground" {...props}>
      {isUserLogged ? (
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
