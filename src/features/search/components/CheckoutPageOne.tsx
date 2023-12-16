import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useRef, useCallback, useMemo, useState } from "react";
import {
  Box,
  Icon,
  Image,
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

export default function CheckoutPageOne() {
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const [deliveryMode, setDeliveryMode] = useState<"recover" | "deliver">(
    "recover",
  );
  const [deliverModeAdvantages, setDeliveryModeAdvantages] = useState(
    "Payez en ligne et récupérez votre achat en main propre lors devotre rendez-vous avec le vendeur",
  );

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
            width="90%"
            paddingHorizontal="s"
            paddingTop={Platform.OS === "ios" ? "l" : "s"}
          >
            <Icon
              name="arrow-back"
              size={Size.ICON_MEDIUM}
              color={colors.black}
              onPress={() => navigation.goBack()}
            />
            <Text variant={"primaryBold"}>Etape 1/2 - Mode de remise</Text>
          </Row>

          {/**Main content */}
          <Box
            style={styles.box_with_shadow}
            marginTop={"l"}
            marginHorizontal={"xxs"}
          >
            <Row
              width={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Row
                width={"46%"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Image
                  source={require("_images/logoASA.jpeg")}
                  style={{
                    width: 96,
                    height: 96,
                    borderTopLeftRadius: borderRadii.sm,
                  }}
                />
                <Text variant={"primaryBold"}>Maison</Text>
              </Row>
              <Text
                variant={"primaryBold"}
                color={"primary"}
                marginRight={"xs"}
              >
                100 000 Ar
              </Text>
            </Row>

            <Box mt={"m"} px={"xs"}>
              {deliveryMode === "deliver" && (
                <Text variant={"primaryBold"}>Livraison</Text>
              )}
              <Row mt={"xs"} justifyContent={"space-between"}>
                <Text variant={"primary"}>
                  {deliveryMode === "recover"
                    ? "Retirer mon colis chez le vendeur"
                    : "Me faire livrer"}
                </Text>
                {deliveryMode === "deliver" && (
                  <Text variant="primaryBold" color={"secondary"}>
                    3 000 Ar
                  </Text>
                )}
              </Row>
              <Text variant={"tertiary"}>{deliverModeAdvantages}</Text>
              <TouchableOpacity onPress={() => openBottomSheet()}>
                <Text variant={"link"} my={"s"}>
                  Choisir une autre mode de remise
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>

          <Box style={[styles.box_with_shadow, { padding: 16 }]} my={"s"}>
            <Text variant={"primaryBold"}>
              Remise de l'achat en main propre
            </Text>
            <Text variant={"primary"} color={"secondary"}>
              Les étapes de la remise en main propre :
            </Text>
            <Row alignItems={"center"} my={"xs"}>
              <Text style={styles.stepNumber}>1</Text>
              <Text variant={"secondary"} width={"80%"}>
                Le vendeur vous confirme la disponibilité de la commande
              </Text>
            </Row>

            <Row alignItems={"center"} my={"xs"}>
              <Text style={styles.stepNumber}>2</Text>
              <Text variant={"secondary"} width={"80%"}>
                Vous vous organisez avec le vendeur pour définir le lieu et la
                date de votre rendez-vous
              </Text>
            </Row>

            <Row alignItems={"center"}>
              <Text style={styles.stepNumber}>3</Text>
              <Text variant={"secondary"} width={"80%"}>
                Pensez à prendre votre télephone portable pour déclencher le
                paiement depuis votre messagerie MetyAmiko pendant le
                rendez-vous
              </Text>
            </Row>
          </Box>
        </ScrollView>
        <Box height={90}>
          <Row width={"100%"} justifyContent={"space-between"} mb={"xs"}>
            <Text variant={"primaryBold"} color={"text"}>
              Total
            </Text>
            <Text variant={"primaryBold"} color={"primary"}>
              10 000 Ar
            </Text>
          </Row>
          <RNEButton
            type={"solid"}
            color="#FF8323"
            title={`Etape 2/2 : payer`}
            onPress={() => {
              Alert.alert("Warning", "L'étape 2 n'est pas encore implémentée.");
            }}
          />
        </Box>
      </MainScreen>

      <BottomSheetModal
        backdropComponent={renderBackDrop}
        ref={modePaiementBottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        style={styles.bottomSheet_container}
      >
        <Box mb={"s"}>
          <Text variant="primaryBold" width={"100%"} textAlign="center">
            Sélectionner un mode de remise
          </Text>
        </Box>
        <Box>
          <Row alignItems={"center"} my={"xs"}>
            <RadioButton
              value="recover"
              color={colors.primary}
              status={deliveryMode === "recover" ? "checked" : "unchecked"}
              onPress={() => {
                setDeliveryMode("recover");
                setDeliveryModeAdvantages(
                  "Payez en ligne et récupérez votre achat en main propre lors de votre rendez-vous avec le vendeur",
                );
              }}
            />
            <Box>
              <Text variant="primaryBold">
                Retirer mon colis chez le vendeur
              </Text>
              <Text variant={"tertiary"}>
                Payez en ligne et récupérez votre achat en main propre lors de
                votre rendez-vous avec le vendeur
              </Text>
            </Box>
          </Row>
          <Row alignItems={"center"}>
            <RadioButton
              value="deliver"
              color={colors.primary}
              status={deliveryMode === "deliver" ? "checked" : "unchecked"}
              onPress={() => {
                setDeliveryMode("deliver");
                setDeliveryModeAdvantages(
                  "Payez en ligne et faites vous livrer à votre domicile ou à l'adresse de votre choix",
                );
              }}
            />
            <Box>
              <Row justifyContent={"space-between"}>
                <Text variant="primaryBold">Me faire livrer</Text>
                <Text variant="primaryBold" color={"secondary"}>
                  3 000 Ar
                </Text>
              </Row>
              <Text variant={"tertiary"}>
                à votre domicile ou à l'adresse de votre choix
              </Text>
            </Box>
          </Row>
        </Box>
        <Box mt={"m"}>
          <RNEButton
            type={"solid"}
            color="#FF8323"
            title={`Valider`}
            onPress={() => {
              closeBottomSheet();
            }}
          />
        </Box>
      </BottomSheetModal>
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
