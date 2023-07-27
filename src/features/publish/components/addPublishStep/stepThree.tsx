import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Icon, Input, MainScreen, Row, Text } from "_shared";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { stepper4NavigationTypes } from "../../types";
import { CheckBox } from "@rneui/themed";

export default function StepThree() {
  const navigation = useNavigation<stepper4NavigationTypes>();
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
          Step 3:
        </Text>
        <Text variant={"title"} color="black">
          Les critères de votre produit ?
        </Text>
        <Text variant={"tertiary"} color={"error"}>
          NB: Veuillez cocher vos critères!
        </Text>
        <Box marginVertical={"s"}>
          {/**offre d'emploi */}
          <Text variant={"primary"}>Offre d'emploi : </Text>
          {/**type de contrat */}
          <Box>
            <Text variant={"tertiary"}>1 -Type de contrat : </Text>
            <Box flexDirection={"row"} flexWrap={"wrap"}>
              <CheckBox
                containerStyle={{ backgroundColor: colors.mainBackground }}
                checkedColor={colors.primary}
                checked={true}
                title="CDD"
              />
              <CheckBox
                containerStyle={{ backgroundColor: colors.mainBackground }}
                checkedColor={colors.primary}
                checked={true}
                title="CDI"
              />
              <CheckBox
                containerStyle={{ backgroundColor: colors.mainBackground }}
                checkedColor={colors.primary}
                checked={true}
                title="Interim"
              />
              <CheckBox
                containerStyle={{ backgroundColor: colors.mainBackground }}
                checkedColor={colors.primary}
                checked={true}
                title="Autre"
              />
            </Box>
          </Box>
          {/**secteur d'activité */}
          <Box>
            <Text variant={"tertiary"}>2 -Secteur d'activité : </Text>
          </Box>
          {/**Fonction */}
          <Box>
            <Text variant={"tertiary"}>3 -Fonction: </Text>
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
            variant={"secondary"}
            label="Suivant"
            onPress={() => navigation.navigate("stepper_screen_4")}
          />
        </Row>
      </Box>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
