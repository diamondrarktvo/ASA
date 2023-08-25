import Box, { BoxProps } from "./Box";
import React, { useEffect, useState } from "react";
import LoginScreen from "../features/account/components/LoginScreen";
import { useAppSelector } from "_store";

type Props = {
  children: React.ReactNode;
  titleIfNotConnected?: string;
  subTitleIfNotConnected: string;
} & Partial<BoxProps>;

const CheckUserConnected: React.FC<Props> = ({
  children,
  titleIfNotConnected,
  subTitleIfNotConnected,
  ...props
}) => {
  const accountUser = useAppSelector((state) => state.account);

  console.log(
    "accountUser.is_account_connected ==================> : ",
    accountUser.is_account_connected,
  );

  return (
    <Box flex={1} backgroundColor="mainBackground" {...props}>
      {accountUser.is_account_connected ? (
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
