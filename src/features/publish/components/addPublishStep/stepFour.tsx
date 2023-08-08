import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Icon, Input, MainScreen, Row, Text } from "_shared";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { stepper5NavigationTypes } from "../../types";

export default function StepFour() {
  const navigation = useNavigation<stepper5NavigationTypes>();
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
          Etape 4:
        </Text>
        <Text variant={"title"} color="black">
          Insérer ici la description de votre produit :
        </Text>
        <Text variant={"tertiary"} color={"error"}>
          NB: Veuillez remplir le champ
        </Text>
        <Box marginVertical={"xs"}>
          <Input
            placeholder="Nom"
            value="Kapa"
            multiline={true}
            numberOfLines={8}
            textAlignVertical={"top"}
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
            onPress={() => navigation.navigate("stepper_screen_5")}
          />
        </Row>
      </Box>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
