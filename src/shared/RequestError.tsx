import { ActivityIndicator } from "react-native-paper";
import Box, { BoxProps } from "./Box";
import React from "react";
import { Dimensions } from "react-native";
import Text from "./Text";
import Button from "./Button";

type Props = {
  children: React.ReactNode;
  isError?: boolean;
  errorType: number;
  errorMessage: string;
} & Partial<BoxProps>;

const RequestError: React.FC<Props> = ({
  children,
  isError,
  errorType,
  errorMessage,
  ...props
}) => {
  console.log("height  : ", Dimensions.get("window").height - 300);
  return (
    <>
      {isError ? (
        <Box
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
          height={Dimensions.get("window").height - 300}
        >
          <Text variant={"bigTitle"} color={"error"}>
            Ooops, une erreur est survenue !!!
          </Text>
          <Text variant={"primary"} color={"text"} paddingVertical={"s"}>
            {errorMessage}
          </Text>
          <Button
            variant={"primary"}
            label="Réessayer"
            onPress={() => console.log("resfresh")}
            mt={"xs"}
          />
        </Box>
      ) : (
        children
      )}
    </>
  );
};

export default RequestError;
