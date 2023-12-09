import Box, { BoxProps } from "./Box";
import React, { useEffect, useState } from "react";
import LoginScreen from "../features/account/components/LoginScreen";
import { useAppSelector } from "_store";

type Props = {
  children: React.ReactNode;
  userMustLogin?: boolean;
  setUserMustLogin?: React.Dispatch<React.SetStateAction<boolean>>;
  titleIfNotConnected?: string;
  subTitleIfNotConnected: string;
  needPadding?: boolean;
  needCancelButton?: boolean;
} & Partial<BoxProps>;

const CheckUserConnected: React.FC<Props> = ({
  children,
  userMustLogin,
  setUserMustLogin,
  titleIfNotConnected,
  subTitleIfNotConnected,
  needPadding,
  needCancelButton,
  ...props
}) => {
  const accountUser = useAppSelector((state) => state.account);

  console.log(
    "accountUser.is_account_connected ==================> : ",
    accountUser.is_account_connected,
  );

  console.log("user must login : ==========>", userMustLogin);

  useEffect(() => {
    if (accountUser.is_account_connected) {
      setUserMustLogin && setUserMustLogin(false);
    }
  }, [accountUser]);

  return (
    <Box
      flex={1}
      backgroundColor="mainBackground"
      {...props}
      paddingHorizontal={needPadding ? "s" : "none"}
      paddingVertical={needPadding ? "l" : "none"}
    >
      {(accountUser.is_account_connected && !userMustLogin) ||
      (!accountUser.is_account_connected && !userMustLogin) ? (
        children
      ) : (
        <LoginScreen
          title={titleIfNotConnected}
          subTitle={subTitleIfNotConnected}
          setUserMustLogin={setUserMustLogin}
          needCancelButton={needCancelButton}
        />
      )}
    </Box>
  );
};

export default CheckUserConnected;
