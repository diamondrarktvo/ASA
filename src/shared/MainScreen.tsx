import Box from "./Box";
import { View } from "react-native";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const MainScreen = ({ children }: Props) => {
  return (
    <Box
      flex={1}
      paddingHorizontal="s"
      paddingVertical="xl"
      backgroundColor="mainBackground"
    >
      {children}
    </Box>
  );
};

export default MainScreen;
