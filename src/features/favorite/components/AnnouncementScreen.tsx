import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Column, EmptyList, Icon, Image, MainScreen, Text } from "_shared";
import { ActivityIndicator } from "react-native-paper";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Constantes, annonceTypes } from "_utils";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";

export default function AnnouncementScreen() {
  //const navigation = useNavigation<>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;

  //components
  const renderItemAnnonce: ListRenderItem<annonceTypes> = ({ item }) => {
    return (
      <Column key={item.id} marginBottom="s">
        <Image
          source={item.image}
          containerStyle={styles.imageAnnonce}
          PlaceholderContent={
            <ActivityIndicator color="#2652AA" style={styles.spinner} />
          }
        />
        <Icon
          name="favorite"
          size={Size.ICON_LARGE}
          color={colors.black}
          containerStyle={{
            position: "absolute",
            zIndex: 2,
            top: 10,
            right: 10,
          }}
        />
        <Text
          variant="secondary"
          numberOfLines={1}
          textDecorationLine={"underline"}
        >
          {item.title}
        </Text>
        <Text variant={"tertiary"} numberOfLines={1}>
          {item.description}
        </Text>
      </Column>
    );
  };

  return (
    <MainScreen typeOfScreen="stack">
      <Box flexDirection={"column"} flex={1}>
        <FlashList
          keyExtractor={(item, index) => item.id.toString()}
          estimatedItemSize={200}
          data={Constantes.DATA.annonce}
          renderItem={renderItemAnnonce}
          extraData={Constantes.DATA.annonce}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyList textToShow="Vous n'avez pas d'annonce en favoris" />
          }
        />
      </Box>
    </MainScreen>
  );
}

const styles = StyleSheet.create({
  imageAnnonce: {
    borderRadius: 10,
    height: 200,
    width: "100%",
  },
  spinner: {
    height: 200,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
