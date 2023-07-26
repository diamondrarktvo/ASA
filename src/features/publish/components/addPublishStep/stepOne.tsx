import { useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Icon, Input, Row, Text } from "_shared";
import { Size, Theme } from "_theme";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@shopify/restyle";
import { CheckBox } from "@rneui/themed";
import { stepper2NavigationTypes } from "../../types";

export default function StepOne() {
  const navigation = useNavigation<stepper2NavigationTypes>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const [selectCategorie, setSelectCategorie] = useState("");

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
      <Box
        borderWidth={1}
        borderRadius={"xs"}
        marginBottom={"s"}
        borderColor={"secondary"}
      >
        <Picker
          selectedValue={selectCategorie}
          onValueChange={(itemValue, itemIndex) =>
            setSelectCategorie(itemValue)
          }
        >
          <Picker.Item label="Vente" value="vente" />
          <Picker.Item label="Jeux" value="jeux" />
          <Picker.Item label="Location" value="location" />
        </Picker>
      </Box>
      <Row justifyContent="space-around">
        <CheckBox
          containerStyle={{ backgroundColor: colors.mainBackground }}
          checkedColor={colors.primary}
          checked={false}
          title="Recherche"
        />
        <CheckBox
          containerStyle={{ backgroundColor: colors.mainBackground }}
          checkedColor={colors.primary}
          checked={true}
          title="Offre"
        />
      </Row>
      <Button
        variant={"secondary"}
        label="Suivant"
        onPress={() => navigation.navigate("stepper_screen_2")}
      />
    </Box>
  );
}

const styles = StyleSheet.create({});
