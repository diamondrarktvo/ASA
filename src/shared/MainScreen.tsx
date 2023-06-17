import Box from "./Box";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const MainScreen = ({ children }: Props) => {
  return (
    <Box
      flex={1}
      paddingHorizontal="s"
      paddingVertical="m"
      backgroundColor="mainBackground"
    >
      {children}
    </Box>
  );
};

export default MainScreen;
