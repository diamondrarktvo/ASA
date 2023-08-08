import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Icon, Input, MainScreen, Row, Text } from "_shared";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { stepper6NavigationTypes } from "../../types";
import { CheckBox } from "@rneui/themed";

export default function StepFive() {
  const navigation = useNavigation<stepper6NavigationTypes>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Publication">
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
          Rensigner ici les prix de votre produit :
        </Text>
        <Text variant={"tertiary"} color={"error"}>
          NB: Seulement le prix du produit est obligatoire (en Ariary)
        </Text>
        <Box marginVertical={"xs"}>
          <Input
            placeholder="Prix du produit"
            value="5000"
            iconLeft={{
              name: "payment",
              size: Size.ICON_MEDIUM,
              color: colors.text,
            }}
          />
          <Input
            placeholder="Le prix de la livraison locale"
            value="3000"
            iconLeft={{
              name: "two-wheeler",
              size: Size.ICON_MEDIUM,
              color: colors.text,
            }}
          />
          <Input
            placeholder="Le prix de la livraison nationale"
            value="20000"
            iconLeft={{
              name: "local-shipping",
              size: Size.ICON_MEDIUM,
              color: colors.text,
            }}
          />
        </Box>
        <Box flexDirection={"row"} flexWrap={"wrap"}>
          <CheckBox
            containerStyle={{ backgroundColor: colors.mainBackground }}
            checkedColor={colors.primary}
            checked={true}
            title="Payement en ligne"
          />
          <CheckBox
            containerStyle={{ backgroundColor: colors.mainBackground }}
            checkedColor={colors.primary}
            checked={false}
            title="Payement après la livraison"
          />
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
            variant={"secondary"}
            label="Continuer"
            onPress={() => navigation.navigate("stepper_screen_6")}
          />
        </Row>
      </Box>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
