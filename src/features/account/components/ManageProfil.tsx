import {
  Box,
  Image,
  MainScreen,
  Text,
  HeaderStackNav,
  Column,
  Input,
} from "_shared";
import { Theme, Size } from "_theme";
import { useTheme } from "@shopify/restyle";
import { StyleSheet, ScrollView } from "react-native";

export default function ManageProfil() {
  const theme = useTheme<Theme>();
  const { borderRadii, colors, spacing } = theme;

  return (
    <MainScreen typeOfScreen="stack">
      <HeaderStackNav titleLeft="Modifier" />
      {/**Banniere image profile */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box
          alignItems="center"
          padding="m"
          borderRadius="md"
          marginVertical="m"
          backgroundColor="mainBackground"
          style={styles.box_with_shadow}
        >
          <Image
            source={require("_images/logoASA.jpeg")}
            style={{
              width: Size.IMAGE_MEDIUM,
              height: Size.IMAGE_MEDIUM,
              borderRadius: borderRadii.lg,
              marginBottom: spacing.s,
            }}
          />
          <Text variant="bigTitle" color="text">
            Mety Amiko
          </Text>
          <Text variant="secondary" color="text">
            Utilisateur client
          </Text>
        </Box>

        {/**TODO: transform this to an array */}
        <Column>
          <Text variant="title" color="text">
            Votre profile
          </Text>
          <Text variant="secondary" color="secondary" marginBottom="s">
            Les informations que vous partagez seront utilisées dans
            l'application Mety Amiko pour aider les autres utilisateurs et
            administrateurs à vous connaitre.
          </Text>

          {/**Nom */}
          <Text
            variant="primary"
            color="text"
            fontWeight="bold"
            marginLeft="xs"
            textDecorationLine="underline"
          >
            Nom:
          </Text>
          <Input
            placeholder="Nom"
            value="Mety Amiko"
            iconLeft={{
              name: "person",
              size: Size.ICON_SMALL,
              color: colors.text,
            }}
          />

          {/**Prenom */}
          <Text
            variant="primary"
            color="text"
            fontWeight="bold"
            marginLeft="xs"
            textDecorationLine="underline"
          >
            Prénom:
          </Text>
          <Input
            placeholder="Prenom"
            value="Mety Amiko be"
            iconLeft={{
              name: "person",
              size: Size.ICON_SMALL,
              color: colors.text,
            }}
          />

          {/**Age */}
          <Text
            variant="primary"
            color="text"
            fontWeight="bold"
            marginLeft="xs"
            textDecorationLine="underline"
          >
            Age:
          </Text>
          <Input
            placeholder="Age"
            value="22"
            iconLeft={{
              name: "person",
              size: Size.ICON_SMALL,
              color: colors.text,
            }}
          />

          {/**Email */}
          <Text
            variant="primary"
            color="text"
            fontWeight="bold"
            marginLeft="xs"
            textDecorationLine="underline"
          >
            Adresse email:
          </Text>
          <Input
            placeholder="Adresse email"
            value="metyamiko@gmail.com"
            iconLeft={{
              name: "mail",
              size: Size.ICON_SMALL,
              color: colors.text,
            }}
          />

          {/**Numéro téléphone */}
          <Text
            variant="primary"
            color="text"
            fontWeight="bold"
            marginLeft="xs"
            textDecorationLine="underline"
          >
            Numéro téléphone:
          </Text>
          <Input
            placeholder="Adresse email"
            value="034 78 968 58"
            iconLeft={{
              name: "call",
              size: Size.ICON_SMALL,
              color: colors.text,
            }}
          />
        </Column>
      </ScrollView>
    </MainScreen>
  );
}

const styles = StyleSheet.create({
  box_with_shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
