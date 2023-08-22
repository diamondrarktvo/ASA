import { ActivityIndicator } from "react-native-paper";
import Box, { BoxProps } from "./Box";
import React from "react";
import { Dimensions } from "react-native";

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
} & Partial<BoxProps>;

const RequestLoader: React.FC<Props> = ({ children, isLoading, ...props }) => {
  return (
    <>
      {isLoading ? (
        <Box
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
          height={Dimensions.get("window").height - 300}
        >
          <ActivityIndicator size="large" color="red" />
        </Box>
      ) : (
        children
      )}
    </>
  );
};

export default RequestLoader;
