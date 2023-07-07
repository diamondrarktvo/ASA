import { Box, Image, MainScreen, Text, HeaderStackNav } from "_shared";
import { Theme, Size } from "_theme";
import { useTheme } from "@shopify/restyle";
import { StyleSheet } from "react-native";

export default function ManageProfil() {
  const theme = useTheme<Theme>();
  const { borderRadii, colors, spacing } = theme;

  return (
    <MainScreen typeOfScreen="stack">
      <HeaderStackNav titleLeft="Modifier" />
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
        <Text variant="bigTitle">Mety Amiko</Text>
        <Text variant="secondary">Utilisateur client</Text>
      </Box>
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
