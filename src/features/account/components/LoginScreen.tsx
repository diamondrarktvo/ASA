import React, { useState } from "react";
//FIXME: cette importation est un exception pour ne pas avoir le WARNING recycle
import Text from "../../../shared/Text";
import TouchableOpacity from "../../../shared/TouchableOpacity";
import Button from "../../../shared/Button";
import Row from "../../../shared/Row";
import Column from "../../../shared/Column";
import Input from "../../../shared/Input";
import Icon from "../../../shared/Icon";
import Box from "../../../shared/Box";
import RequestLoader from "../../../shared/RequestLoader";
import RequestError from "../../../shared/RequestError";
import { createAccountNavigationTypes, loginNavigationTypes } from "../types";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { Theme, Size } from "_theme";
import { useLoginMutation } from "../authApi";
import config from "_config";

type LoginScreenProps = {
  title?: string;
  subTitle: string;
};

const LoginScreen = ({ title, subTitle }: LoginScreenProps) => {
  const theme = useTheme<Theme>();
  const { primary, secondary, white } = theme.colors;
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useNavigation<createAccountNavigationTypes>();
  const [loginValue, setLoginValue] = useState<loginNavigationTypes>({
    phone_number: "",
    password: "",
  });
  //const [isLoading, setIsLoading] = useState(false);
  //const [isError, setIsError] = useState(false);
  const [login, { isError, isLoading, status, data, error }] =
    useLoginMutation();

  //logic
  const handleSubmit = () => {
    console.log("lasa ny call api login ..");
    login(loginValue)
      .unwrap()
      .then((res) => {
        console.log("vita le api pr ..");
        console.log("res : ", res);
      })
      .catch((e) => {});
  };

  console.log("status : ", status);
  console.log("data : ", data);
  console.log("error : ", error?.status);

  return (
    <Box paddingVertical="m" backgroundColor="mainBackground">
      <RequestLoader isLoading={isLoading}>
        <RequestError
          isError={isError}
          errorStatus={error?.status}
          onRefresh={() => console.log("onRefresh")}
        >
          <Box>
            {title ? (
              <Text variant="bigTitle" color="text">
                {title}
              </Text>
            ) : null}
            <Row marginBottom="s">
              <Text variant="title" color="secondary">
                {subTitle}
              </Text>
            </Row>
            <Column>
              <Input
                placeholder="Numéro télephone*"
                onChangeText={(text) =>
                  setLoginValue((prevState) => ({
                    ...prevState,
                    phone_number: text,
                  }))
                }
              />
              <Input
                placeholder="Mot de passe*"
                iconRight={{
                  name: hidePassword ? "visibility" : "visibility-off",
                  size: 32,
                  color: secondary,
                  onPress: () => setHidePassword(!hidePassword),
                }}
                onChangeText={(text) =>
                  setLoginValue((prevState) => ({
                    ...prevState,
                    password: text,
                  }))
                }
              />
            </Column>
            <Row marginVertical="m">
              <Text
                variant="primaryBold"
                textDecorationLine="underline"
                color="text"
              >
                Mot de passe oublié
              </Text>
            </Row>
            <Button
              variant={"primary"}
              label="Se connecter"
              onPress={() => handleSubmit()}
            />
          </Box>
          <Row
            alignItems="center"
            padding="s"
            backgroundColor="offWhite"
            justifyContent="space-between"
            borderRadius="xs"
            marginTop="xs"
          >
            <Text variant="primaryBold" color="text">
              Creer un compte
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("create_account_screen")}
            >
              <Icon
                name="arrow-forward"
                size={Size.ICON_LARGE}
                color={primary}
              />
            </TouchableOpacity>
          </Row>
        </RequestError>
      </RequestLoader>
    </Box>
  );
};

export default LoginScreen;
