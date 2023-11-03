import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  CheckUserConnected,
  Icon,
  Input,
  MainScreen,
  RequestError,
  RequestLoader,
  Row,
  Text,
} from "_shared";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { RadioButton, Snackbar } from "react-native-paper";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "_store";
import { reinitializeProduct, selectors } from "../../publishSlice";
import { usePublishProductMutation } from "../../publishApi";
import { removeAccount } from "../../../account/accountSlice";

export default function StepSeven() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const currentProduct = useAppSelector(selectors.selectProductToPublish);
  const accountUser = useAppSelector((state) => state.account.user);
  const token = useAppSelector((state) => state.account.token);
  const [valueForStepper, setValueForStepper] = useState(currentProduct);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const isUserConnected = useAppSelector(
    (state) => state.account.is_account_connected,
  );
  const [userMustLogin, setUserMustLogin] = useState<boolean>(isUserConnected);
  const [valueOfRadioButton, setValueOfRadioButton] = useState({
    showNumber: { label: "Oui", value: "yes" },
    showMail: { label: "Oui", value: "yes" },
    acceptSalesApproach: { label: "Oui", value: "yes" },
  });
  const [contactSeller, setContactSeller] = useState<{
    phone_number: string;
    email: string;
  }>({
    phone_number: accountUser.phone_number ?? "",
    email: accountUser.email ?? "",
  });

  const [
    publishProduct,
    {
      isError: isErrorPublish,
      isLoading: isLoadingPublish,
      error: errorPublish,
    },
  ] = usePublishProductMutation();

  const handleFetchError = (error: any) => {
    if (error && error.data && error.data.detail?.includes("Invalid token")) {
      return dispatch(removeAccount());
    }
  };

  console.log("errorPublish : ", errorPublish);

  const handlePublish = () => {
    if (isUserConnected) {
      //console.log("valueForStepper step before dispatch : ", valueForStepper);
      publishProduct({ valueForStepper, token })
        .unwrap()
        .then((result) => {
          console.log("result pub : ", result);
          dispatch(reinitializeProduct());
          navigation.navigate("main_tab", { screen: "publish_screen" });
        })
        .catch((error) => {
          if (error.message) {
            setVisibleSnackbar(true);
            setMessageSnackBar(error.message);
          }
          console.log("error pub : ", error);
          handleFetchError(error);
        });
    } else {
      setUserMustLogin(!isUserConnected);
    }
  };

  const cancelPublish = () => {
    dispatch(reinitializeProduct());
    navigation.navigate("main_tab", { screen: "publish_screen" });
  };

  //all effects
  useEffect(() => {
    setContactSeller({
      phone_number: accountUser.phone_number,
      email: accountUser.email,
    });
    setValueForStepper((prevState) => ({
      ...prevState,
      email_contact: accountUser.email,
      phone_number_contact: accountUser.phone_number,
    }));
  }, [accountUser]);

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Publication">
      <Box width={"100%"}>
        <Icon
          name="close"
          size={Size.ICON_LARGE}
          color={colors.black}
          containerStyle={{
            position: "relative",
            right: -140,
          }}
          onPress={() => cancelPublish()}
        />
      </Box>
      <RequestLoader isLoading={isLoadingPublish}>
        <RequestError
          isError={isErrorPublish}
          errorStatus={errorPublish?.status}
          onRefresh={() => handlePublish()}
        >
          <CheckUserConnected
            userMustLogin={userMustLogin}
            setUserMustLogin={setUserMustLogin}
            subTitleIfNotConnected="Connectez-vous pour découvrir toutes nos fonctionnalités"
          >
            <Box marginTop={"m"}>
              <Text
                variant={"primary"}
                color={"blue"}
                textDecorationLine={"underline"}
                marginBottom={"xs"}
              >
                Etape finale:
              </Text>
              <Text variant={"title"} color="black">
                Configuration de votre contact
              </Text>
              <Text variant={"tertiary"} color={"error"}>
                NB: Vous pouvez ici afficher votre numéro, mail en cochant les
                cases
              </Text>
              <Box marginVertical={"xs"}>
                <Input
                  placeholder="Votre numéro téléphone"
                  value={contactSeller.phone_number}
                  /*onChangeText={(text) =>
                    setContactSeller((prevState) => ({
                      ...prevState,
                      phone_number: text,
                    }))
                  }*/
                  iconLeft={{
                    name: "call",
                    size: Size.ICON_MEDIUM,
                    color: colors.text,
                  }}
                />
                <Row justifyContent="space-around" alignItems={"center"}>
                  <Text variant={"secondary"}>Afficher le numéro : </Text>
                  <Box flexDirection={"row"} alignItems={"center"}>
                    <RadioButton
                      value={"yes"}
                      color={colors.primary}
                      status={
                        valueOfRadioButton.showNumber.value === "yes"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() =>
                        setValueOfRadioButton((prevState) => {
                          return {
                            ...prevState,
                            showNumber: { label: "Oui", value: "yes" },
                          };
                        })
                      }
                    />
                    <Text variant="tertiary">Oui</Text>
                  </Box>
                  <Box flexDirection={"row"} alignItems={"center"}>
                    <RadioButton
                      value={"no"}
                      color={colors.primary}
                      status={
                        valueOfRadioButton.showNumber.value === "no"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() =>
                        setValueOfRadioButton((prevState) => {
                          return {
                            ...prevState,
                            showNumber: { label: "No", value: "no" },
                          };
                        })
                      }
                    />
                    <Text variant="tertiary">Non</Text>
                  </Box>
                </Row>
                <Input
                  placeholder="Votre adresse email"
                  value={contactSeller.email}
                  /*onChangeText={(text) =>
                    setContactSeller((prevState) => ({
                      ...prevState,
                      email: text,
                    }))
                  }*/
                  iconLeft={{
                    name: "mail",
                    size: Size.ICON_MEDIUM,
                    color: colors.text,
                  }}
                />
                <Row justifyContent="space-around" alignItems={"center"}>
                  <Text variant={"secondary"}>Afficher le mail : </Text>
                  <Box flexDirection={"row"} alignItems={"center"}>
                    <RadioButton
                      value={"yes"}
                      color={colors.primary}
                      status={
                        valueOfRadioButton.showMail.value === "yes"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() =>
                        setValueOfRadioButton((prevState) => {
                          return {
                            ...prevState,
                            showMail: { label: "Oui", value: "yes" },
                          };
                        })
                      }
                    />
                    <Text variant="tertiary">Oui</Text>
                  </Box>
                  <Box flexDirection={"row"} alignItems={"center"}>
                    <RadioButton
                      value={"no"}
                      color={colors.primary}
                      status={
                        valueOfRadioButton.showMail.value === "no"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() =>
                        setValueOfRadioButton((prevState) => {
                          return {
                            ...prevState,
                            showMail: { label: "No", value: "no" },
                          };
                        })
                      }
                    />
                    <Text variant="tertiary">Non</Text>
                  </Box>
                </Row>
                <Text variant={"primaryBold"}>
                  * Accepter le démarche commercial ?{" "}
                </Text>
                <Row justifyContent="space-around" alignItems={"center"}>
                  <Box flexDirection={"row"} alignItems={"center"}>
                    <RadioButton
                      value={"yes"}
                      color={colors.primary}
                      status={
                        valueOfRadioButton.acceptSalesApproach.value === "yes"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() =>
                        setValueOfRadioButton((prevState) => {
                          return {
                            ...prevState,
                            acceptSalesApproach: { label: "Oui", value: "yes" },
                          };
                        })
                      }
                    />
                    <Text variant="tertiary">Oui</Text>
                  </Box>
                  <Box flexDirection={"row"} alignItems={"center"}>
                    <RadioButton
                      value={"no"}
                      color={colors.primary}
                      status={
                        valueOfRadioButton.acceptSalesApproach.value === "no"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() =>
                        setValueOfRadioButton((prevState) => {
                          return {
                            ...prevState,
                            acceptSalesApproach: { label: "No", value: "no" },
                          };
                        })
                      }
                    />
                    <Text variant="tertiary">Non</Text>
                  </Box>
                </Row>
              </Box>
              <Row alignItems={"center"} justifyContent="space-around">
                <Button
                  height={50}
                  alignItems={"center"}
                  justifyContent={"center"}
                  width={150}
                  variant={"tertiary"}
                  label="Précédent"
                  onPress={() => navigation.goBack()}
                />
                <Button
                  height={50}
                  alignItems={"center"}
                  justifyContent={"center"}
                  width={150}
                  variant={"primary"}
                  label="Publier"
                  onPress={() => handlePublish()}
                />
              </Row>
            </Box>
          </CheckUserConnected>
        </RequestError>
      </RequestLoader>
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        action={{
          label: "Ok",
          onPress: () => {
            // Do something
          },
        }}
      >
        {messageSnackBar}
      </Snackbar>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
