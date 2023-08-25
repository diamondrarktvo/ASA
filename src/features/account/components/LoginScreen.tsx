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
import { createAccountNavigationTypes, loginValuesTypes } from "../types";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { Theme, Size } from "_theme";
import { useLoginMutation } from "../authApi";
import { useAppDispatch } from "_store";
import { setAccount } from "../accountSlice";
import { storeDataToAsyncStorage, storeObjectDataToAsyncStorage } from "_utils";

type LoginScreenProps = {
  title?: string;
  subTitle: string;
  setUserMustLogin?: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginScreen = ({
  title,
  subTitle,
  setUserMustLogin,
}: LoginScreenProps) => {
  const theme = useTheme<Theme>();
  const dispatch = useAppDispatch();
  const { primary, secondary } = theme.colors;
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useNavigation<createAccountNavigationTypes>();
  const [loginValue, setLoginValue] = useState<loginValuesTypes>({
    phone_number: "",
    password: "",
  });
  const [login, { isError, isLoading, status, error }] = useLoginMutation();

  //logic
  const handleSubmit = () => {
    login(loginValue)
      .unwrap()
      .then((res) => {
        if (res && res.token) {
          console.log("res : ", res);
          setUserMustLogin && setUserMustLogin(false);
          dispatch(setAccount(res));
          storeObjectDataToAsyncStorage("token", res.token);
          storeObjectDataToAsyncStorage("current_account", res.user);
        }
      })
      .catch((e) => {});
  };

  //console.log("status : ", status);
  console.log("error : ", error?.status);

  return (
    <Box paddingVertical="m" backgroundColor="mainBackground">
      <RequestLoader isLoading={isLoading}>
        <RequestError
          isError={false}
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
                secureTextEntry={hidePassword}
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
          <Row marginTop="xs">
            <TouchableOpacity
              onPress={() =>
                setUserMustLogin ? setUserMustLogin(false) : null
              }
            >
              <Text variant={"primary"} textDecorationLine={"underline"}>
                Retour
              </Text>
            </TouchableOpacity>
          </Row>
        </RequestError>
      </RequestLoader>
    </Box>
  );
};

export default LoginScreen;
