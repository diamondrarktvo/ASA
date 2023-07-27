import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Icon, Input, MainScreen, Row, Text } from "_shared";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { stepper6NavigationTypes } from "../../types";

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
          Step 5:
        </Text>
        <Text variant={"title"} color="black">
          Quel produit voulez-vous publier ?
        </Text>
        <Text variant={"tertiary"} color={"error"}>
          NB: Veuillez remplir chaque étape afin de procéder à votre
          publication!
        </Text>
        <Box marginVertical={"xs"}>
          <Input
            placeholder="Nom"
            value="Kapa"
            iconLeft={{
              name: "info",
              size: Size.ICON_MEDIUM,
              color: colors.text,
            }}
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
            label="Suivant"
            onPress={() => navigation.navigate("stepper_screen_6")}
          />
        </Row>
      </Box>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
