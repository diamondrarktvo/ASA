import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  CheckUserConnected,
  Icon,
  Input,
  MainScreen,
  Row,
  Text,
} from "_shared";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { stepper6NavigationTypes } from "../../types";
import { CheckBox } from "@rneui/themed";
import { RadioButton } from "react-native-paper";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "_store";
import {
  selectors as selectorsProductToPublish,
  setProduct,
} from "../../publishSlice";
import { useGetAllPaymentMethodQuery } from "../../../account/paymentMethodApi";
import { paymentMethodStateType } from "../../../account/paymentMethodeSlice";

export default function StepFive() {
  const navigation = useNavigation<stepper6NavigationTypes>();
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const token = useAppSelector((state) => state.account.token);
  const isUserConnected = useAppSelector(
    (state) => state.account.is_account_connected,
  );
  const [userMustLogin, setUserMustLogin] = useState<boolean>(isUserConnected);
  const currentProduct = useAppSelector(
    selectorsProductToPublish.selectProductToPublish,
  );
  const [allPaymentMethod, setAllPaymentMethod] = useState<
    { id: number | string }[] | []
  >([]);
  const [paymentPriceMethod, setPaymentPriceMethod] = useState("online");

  const {
    data: allPaymentMethodFromApi,
    isError: isErrorGetAllPaymentMethod,
    isLoading: isGetAllPaymentMethodLoading,
    isFetching: isGetAllPaymentFetching,
    refetch: refetchGetAllPaymentMethod,
    error: errorGetAllPaymentMethod,
  } = useGetAllPaymentMethodQuery(token, {
    skip: !token || paymentPriceMethod === "afterLivraison",
  });

  const [valueForStepper, setValueForStepper] = useState(currentProduct);
  const [disableButton, setDisableButton] = useState(true);
  const [price, setPrice] = useState({ product: "0", livraison: "0" });

  const handleContinueStepper = () => {
    //console.log("valueForStepper step before dispatch : ", valueForStepper);
    dispatch(setProduct(valueForStepper));
    navigation.navigate("stepper_screen_6");
  };

  const handleChoiceOnlinePayment = () => {
    if (isUserConnected) {
      setPaymentPriceMethod("online");
    } else {
      setUserMustLogin(!isUserConnected);
    }
  };

  //all effects
  useEffect(() => {
    setValueForStepper((prevState) => ({
      ...prevState,
      price: parseInt(price.product),
      local_delivery_price: parseInt(price.livraison),
      payement_integrate: paymentPriceMethod === "online" ? true : false,
      payement_method: allPaymentMethod,
    }));
    if (price.product) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [price, paymentPriceMethod, allPaymentMethod]);

  useEffect(() => {
    if (paymentPriceMethod === "online" && allPaymentMethodFromApi) {
      setAllPaymentMethod(
        allPaymentMethodFromApi.map((item: paymentMethodStateType) => ({
          id: item.id,
        })),
      );
    } else if (paymentPriceMethod === "afterLivraison") {
      setAllPaymentMethod([]);
    }
  }, [allPaymentMethodFromApi, paymentPriceMethod]);

  useEffect(() => {
    if (isUserConnected) {
      setPaymentPriceMethod("online");
    } else {
      setUserMustLogin(!isUserConnected);
    }
  }, []);

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Publication">
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
            Etape 5:
          </Text>
          <Text variant={"title"} color="black">
            Renseigner ici les prix de votre produit :
          </Text>
          <Text variant={"tertiary"} color={"error"}>
            NB: Seulement le prix du produit est obligatoire (en Ariary)
          </Text>
          <Box marginVertical={"xs"}>
            <Input
              placeholder="Prix du produit"
              value={price.product !== "0" ? price.product : ""}
              onChangeText={(text) => {
                if (isNaN(text)) {
                  setPrice((prevState) => {
                    return {
                      ...prevState,
                    };
                  });
                } else {
                  setPrice((prevState) => {
                    return {
                      ...prevState,
                      product: text,
                    };
                  });
                }
              }}
              iconLeft={{
                name: "payment",
                size: Size.ICON_MEDIUM,
                color: colors.text,
              }}
            />
            <Input
              placeholder="Le prix de la livraison locale"
              value={price.livraison !== "0" ? price.livraison : ""}
              onChangeText={(text) => {
                if (isNaN(text)) {
                  setPrice((prevState) => {
                    return {
                      ...prevState,
                    };
                  });
                } else {
                  setPrice((prevState) => {
                    return {
                      ...prevState,
                      livraison: text,
                    };
                  });
                }
              }}
              iconLeft={{
                name: "local-shipping",
                size: Size.ICON_MEDIUM,
                color: colors.text,
              }}
            />
            <Input
              placeholder="Le prix de la livraison nationale"
              value={
                //vérifie si l'expression n'est pas NaN
                (!isNaN(parseFloat(price.product) + parseFloat(price.livraison))
                  ? parseFloat(price.product) + parseFloat(price.livraison)
                  : 0
                ).toString() + " Ar"
              }
              iconLeft={{
                name: "local-mall",
                size: Size.ICON_MEDIUM,
                color: colors.text,
              }}
              editable={false}
            />
          </Box>
          <Box flexDirection={"column"}>
            <Box flexDirection={"row"} alignItems={"center"}>
              <RadioButton
                value="yes"
                color={colors.primary}
                status={
                  paymentPriceMethod === "online" ? "checked" : "unchecked"
                }
                onPress={() => handleChoiceOnlinePayment()}
              />
              <Text variant="tertiary">Payement en ligne</Text>
            </Box>
            <Box flexDirection={"row"} alignItems={"center"}>
              <RadioButton
                value="no"
                color={colors.primary}
                status={
                  paymentPriceMethod === "afterLivraison"
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => setPaymentPriceMethod("afterLivraison")}
              />
              <Text variant="tertiary">Payement à la livraison</Text>
            </Box>
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
              disabled={disableButton}
              variant={"secondary"}
              label="Continuer"
              onPress={() => handleContinueStepper()}
            />
          </Row>
        </Box>
      </CheckUserConnected>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
