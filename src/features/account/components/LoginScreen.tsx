import React, { useState, useEffect } from "react";
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
import { loginValuesTypes } from "../types";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { Theme, Size } from "_theme";
import { useLoginMutation } from "../authApi";
import { useAppDispatch } from "_store";
import { setAccount } from "../accountSlice";
import { Constantes, storeObjectDataToAsyncStorage } from "_utils";
import { Snackbar } from "react-native-paper";

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
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const navigation = useNavigation();
  const [loginValue, setLoginValue] = useState<loginValuesTypes>({
    phone_number: "",
    password: "",
  });
  const [errorNotFound, setErrorNotFound] = useState<boolean>(false);
  const [login, { isError, isLoading, status, error }] = useLoginMutation();

  //logic
  const handleSubmit = () => {
    login(loginValue)
      .unwrap()
      .then((res) => {
        if (res && res.token) {
          setUserMustLogin && setUserMustLogin(false);
          dispatch(setAccount(res));
          storeObjectDataToAsyncStorage("token", res.token);
          storeObjectDataToAsyncStorage("current_account", res.user);
        }
      })
      .catch((e) => {
        console.log("error login :", e);
        if (e.status === Constantes.error.ERROR_CONSTANT.NOT_FOUND.status) {
          setVisibleSnackbar(true);
        }
      });
  };

  const onDismissSnackBar = () => setVisibleSnackbar(false);

  //components

  //effects
  useEffect(() => {
    if (visibleSnackbar) {
      setTimeout(() => {
        setVisibleSnackbar(false);
      }, 4000);
    }
  }, [visibleSnackbar]);

  useEffect(() => {
    if (
      error &&
      error.status === Constantes.error.ERROR_CONSTANT.NOT_FOUND.status
    ) {
      setErrorNotFound(true);
    } else {
      setErrorNotFound(false);
    }
  }, [error]);

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
                errorMessage={
                  errorNotFound ? "Numéro télephone incorrect" : undefined
                }
                onChangeText={(text) => {
                  setLoginValue((prevState) => ({
                    ...prevState,
                    phone_number: text,
                  }));
                  setErrorNotFound(false);
                }}
              />
              <Input
                placeholder="Mot de passe*"
                errorMessage={
                  errorNotFound ? "Mot de passe incorrect" : undefined
                }
                secureTextEntry={hidePassword}
                iconRight={{
                  name: hidePassword ? "visibility" : "visibility-off",
                  size: 32,
                  color: secondary,
                  onPress: () => setHidePassword(!hidePassword),
                }}
                onChangeText={(text) => {
                  setLoginValue((prevState) => ({
                    ...prevState,
                    password: text,
                  }));
                  setErrorNotFound(false);
                }}
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
              bold="bold"
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
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Ok",
          onPress: () => {
            // Do something
          },
        }}
      >
        Utilisateur non trouvé, veuillez vérifier vos identifiants!
      </Snackbar>
    </Box>
  );
};

export default LoginScreen;
