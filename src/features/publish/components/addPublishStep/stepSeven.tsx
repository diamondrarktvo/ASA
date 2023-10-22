import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Icon, Input, MainScreen, Row, Text } from "_shared";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { stepper3NavigationTypes } from "../../types";
import { CheckBox } from "@rneui/themed";

export default function StepSeven() {
  const navigation = useNavigation();
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
          Etape finale:
        </Text>
        <Text variant={"title"} color="black">
          Configuration de votre contact
        </Text>
        <Text variant={"tertiary"} color={"error"}>
          NB: Vous pouvez ici afficher votre numéro, mail en cochant les cases
        </Text>
        <Box marginVertical={"xs"}>
          <Input
            placeholder="Votre numéro téléphone"
            value="+261 34 56 484 25"
            iconLeft={{
              name: "call",
              size: Size.ICON_MEDIUM,
              color: colors.text,
            }}
          />
          <Row justifyContent="space-around" alignItems={"center"}>
            <Text variant={"secondary"}>Afficher le numéro : </Text>
            <CheckBox
              containerStyle={{ backgroundColor: colors.mainBackground }}
              checkedColor={colors.primary}
              checked={false}
              title="Oui"
            />
            <CheckBox
              containerStyle={{ backgroundColor: colors.mainBackground }}
              checkedColor={colors.primary}
              checked={true}
              title="Non"
            />
          </Row>
          <Input
            placeholder="Votre adresse email"
            value="metyamiko@gmail.com"
            iconLeft={{
              name: "mail",
              size: Size.ICON_MEDIUM,
              color: colors.text,
            }}
          />
          <Row justifyContent="space-around" alignItems={"center"}>
            <Text variant={"secondary"}>Afficher le mail : </Text>
            <CheckBox
              containerStyle={{ backgroundColor: colors.mainBackground }}
              checkedColor={colors.primary}
              checked={false}
              title="Oui"
            />
            <CheckBox
              containerStyle={{ backgroundColor: colors.mainBackground }}
              checkedColor={colors.primary}
              checked={true}
              title="Non"
            />
          </Row>
          <Text variant={"primaryBold"}>
            * Accepter le démarche commercial ?{" "}
          </Text>
          <Row justifyContent="space-around" alignItems={"center"}>
            <CheckBox
              containerStyle={{ backgroundColor: colors.mainBackground }}
              checkedColor={colors.primary}
              checked={true}
              title="Oui"
            />
            <CheckBox
              containerStyle={{ backgroundColor: colors.mainBackground }}
              checkedColor={colors.primary}
              checked={false}
              title="Non"
            />
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
            onPress={() => console.log("done")}
          />
        </Row>
      </Box>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
