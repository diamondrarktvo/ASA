import Box, { BoxProps } from "./Box";
import React from "react";
import Text from "./Text";
import { Platform } from "react-native";

type Props = {
  children: React.ReactNode;
  typeOfScreen: "tab" | "stack" | "component" | "top";
  titleTabScreen?: string;
} & Partial<BoxProps>;

type HeaderProps = {
  title?: string | undefined;
};

const HeaderTabTitle = ({ title }: HeaderProps) => {
  return title ? (
    <Box paddingVertical="m" backgroundColor="mainBackground">
      <Text variant="headerNavigation" color="text">
        {title}
      </Text>
    </Box>
  ) : null;
};

const MainScreen: React.FC<Props> = ({
  children,
  typeOfScreen,
  titleTabScreen,
  ...props
}) => {
  return (
    <Box
      flex={1}
      paddingHorizontal="s"
      paddingVertical={Platform.OS === "ios" ? "l" : "s"}
      backgroundColor="mainBackground"
      {...props}
    >
      {typeOfScreen === "tab" && <HeaderTabTitle title={titleTabScreen} />}
      {children}
    </Box>
  );
};

export default MainScreen;
