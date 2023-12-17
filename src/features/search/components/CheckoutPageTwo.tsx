import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useRef, useCallback, useMemo, useState } from "react";
import {
  Box,
  Icon,
  Image,
  Input,
  MainScreen,
  RequestConnection,
  RequestLoader,
  Row,
  Text,
  TouchableOpacity,
} from "_shared";
import { Size, Theme } from "_theme";
import { Alert, Platform, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button as RNEButton } from "@rneui/themed";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { RadioButton } from "react-native-paper";
import { useAppSelector } from "_store";

export default function CheckoutPageTwo() {
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const cart = useAppSelector((state) => state.checkout);
  const { totalOfPrice, isProductDelivered } = useRoute().params;
  const [paiementMode, setPaiementMode] = useState<
    "mobileMoney" | "paiementCard"
  >("mobileMoney");
  const [mobileNumber, setMobileNumber] = useState<string>("");

  //snap points
  const snapPoints = useMemo(() => [1, "50%"], []);

  //refs
  const modePaiementBottomSheetRef = useRef<BottomSheetModal | null>(null);

  //logics
  const openBottomSheet = () => {
    if (
      modePaiementBottomSheetRef !== null &&
      modePaiementBottomSheetRef.current !== null
    ) {
      return modePaiementBottomSheetRef.current.present();
    }
    return;
  };

  const closeBottomSheet = () => {
    if (
      modePaiementBottomSheetRef !== null &&
      modePaiementBottomSheetRef.current !== null
    ) {
      return modePaiementBottomSheetRef.current.close();
    }
    return;
  };

  //components
  const renderBackDrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} opacity={0.6} />
    ),
    [],
  );

  return (
    <RequestConnection>
      <MainScreen typeOfScreen="stack">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/**Header */}
          <Row
            style={{ position: "absolute", zIndex: 10, top: 0 }}
            justifyContent="space-between"
            width="70%"
            paddingHorizontal="s"
            paddingTop={Platform.OS === "ios" ? "l" : "s"}
          >
            <Icon
              name="arrow-back"
              size={Size.ICON_MEDIUM}
              color={colors.black}
              onPress={() => navigation.goBack()}
            />
            <Text variant={"primaryBold"}>Etape 2/2 - Payer</Text>
          </Row>

          {/**Main content */}
          <Box
            style={styles.box_with_shadow}
            marginTop={"l"}
            marginHorizontal={"xxs"}
          >
            <Row justifyContent={"space-between"} padding={"s"}>
              <Text variant={"primaryBold"}>Total</Text>
              <Text variant={"primaryBold"} color={"primary"}>
                {totalOfPrice} Ar
              </Text>
            </Row>
            <Box paddingVertical={"xs"} paddingHorizontal={"s"}>
              <Text variant={"secondary"}>Détails du paiement</Text>
              <Box>
                <Row justifyContent={"space-between"} paddingVertical={"s"}>
                  <Text variant={"tertiary"}>* Produits</Text>
                  <Text variant={"tertiary"} color={"primary"}>
                    {cart.price} Ar
                  </Text>
                </Row>
                {isProductDelivered && (
                  <Row justifyContent={"space-between"} paddingVertical={"s"}>
                    <Text variant={"tertiary"}>* Livraison</Text>
                    <Text variant={"tertiary"} color={"primary"}>
                      {cart.local_delivery_price} Ar
                    </Text>
                  </Row>
                )}
              </Box>
            </Box>
          </Box>

          <Box paddingHorizontal={"s"} marginVertical={"m"}>
            <Text variant={"primaryBold"}>Finalisez votre paiement</Text>

            <Box>
              <Row alignItems={"center"} my={"xs"}>
                <RadioButton
                  value="mobileMoney"
                  color={colors.primary}
                  status={
                    paiementMode === "mobileMoney" ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    setPaiementMode("mobileMoney");
                  }}
                />
                <Text
                  variant="primaryBold"
                  color={paiementMode === "mobileMoney" ? "text" : "secondary"}
                >
                  Mobile money
                </Text>
              </Row>
              {paiementMode === "mobileMoney" && (
                <Box>
                  <Input
                    placeholder="Numéro de téléphone"
                    value={mobileNumber}
                    keyboardType="numeric"
                    onChangeText={(text: string) => setMobileNumber(text)}
                  />
                </Box>
              )}
              <Row alignItems={"center"}>
                <RadioButton
                  value="paiementCard"
                  color={colors.primary}
                  status={
                    paiementMode === "paiementCard" ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    setPaiementMode("paiementCard");
                  }}
                />
                <Text
                  variant="primaryBold"
                  color={paiementMode === "paiementCard" ? "text" : "secondary"}
                >
                  Carte bancaire
                </Text>
              </Row>
            </Box>
          </Box>
        </ScrollView>

        <Row height={90} justifyContent={"space-between"} alignItems={"center"}>
          <Box mb={"xs"}>
            <Text variant={"primaryBold"} color={"text"}>
              Total
            </Text>
            <Text variant={"primaryBold"} color={"primary"}>
              {totalOfPrice} Ar
            </Text>
          </Box>
          <RNEButton
            type={"solid"}
            color="#FF8323"
            title={`Payer`}
            containerStyle={{
              borderRadius: borderRadii.xs,
            }}
            onPress={() => {
              Alert.alert(
                "Warning",
                "Le paiement n'est pas encore implémentée.",
              );
            }}
          />
        </Row>
      </MainScreen>
    </RequestConnection>
  );
}

const styles = StyleSheet.create({
  box_with_shadow: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  bottomSheet_container: {
    paddingHorizontal: "4%",
  },
  stepNumber: {
    backgroundColor: "#FF8323",
    textAlign: "center",
    height: 38,
    width: 38,
    borderRadius: 50,
    padding: 12,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 8,
    fontSize: 12,
  },
});
