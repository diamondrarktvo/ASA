import { ActivityIndicator } from "react-native-paper";
import Box, { BoxProps } from "./Box";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import Text from "./Text";
import Button from "./Button";

type Props = {
  children: React.ReactNode;
  isError?: boolean;
  errorStatus: number;
  onRefresh: () => void;
} & Partial<BoxProps>;

const RequestError: React.FC<Props> = ({
  children,
  isError,
  errorStatus,
  onRefresh,
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    switch (errorStatus) {
      case 404:
        setErrorMessage("Numéro de télephone ou mot de passe incorrect");
        break;
      default:
        break;
    }
  }, [errorStatus]);

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
            onPress={onRefresh}
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
