import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Icon, Input, MainScreen, Text } from "_shared";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";

export default function StepThree() {
  //const navigation = useNavigation<>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;

  return (
    <Box marginTop={"m"}>
      <Text variant={"title"} color="black">
        Quel produit voulez-vous publier ?
      </Text>
      <Text variant={"tertiary"} color={"error"}>
        NB: Veuillez remplir chaque étape afin de procéder à votre publication!
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
      <Button
        variant={"secondary"}
        label="Suivant"
        onPress={() => console.log("pressed")}
      />
    </Box>
  );
}

const styles = StyleSheet.create({});
