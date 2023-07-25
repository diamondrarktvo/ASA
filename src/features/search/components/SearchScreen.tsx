import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { ImageBackground, StyleSheet } from "react-native";
import { Box, Button, Column, Icon, Image, MainScreen, Text } from "_shared";
import { Constantes, annonceTypes, categorieTypes } from "_utils";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";
import { ScrollView } from "react-native-gesture-handler";

export default function SearchScreen() {
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;

  //components
  const renderItemCategorie: ListRenderItem<categorieTypes> = ({ item }) => {
    return (
      <Box
        key={item.id}
        marginRight={"xs"}
        backgroundColor={"offWhite"}
        height={100}
        width={200}
        borderRadius={"sm"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text variant={"primaryBold"} color={"offBlack"}>
          {item.title}
        </Text>
      </Box>
    );
  };

  const renderItemAnnonce: ListRenderItem<annonceTypes> = ({ item }) => {
    return (
      <Column key={item.id} marginRight="xs">
        <Image
          source={item.image}
          containerStyle={styles.imageAnnonce}
          PlaceholderContent={
            <ActivityIndicator color="#2652AA" style={styles.spinner} />
          }
        />
        <Icon
          name="favorite-border"
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
    <MainScreen typeOfScreen="tab">
      <ScrollView>
        <Text variant="headerNavigation" color="primary" textAlign="center">
          "Atsika samy Atsika"
        </Text>
        <Button
          variant="secondary"
          label="Recherchez partout à Madagascar"
          marginTop={"s"}
          marginBottom={"m"}
        />
        <Column marginTop="s">
          <Text variant="primary">Catégorie les plus visités</Text>
          <Box width={"100%"} marginTop="xs">
            <FlashList
              keyExtractor={(item, index) => item.id.toString()}
              estimatedItemSize={200}
              data={Constantes.DATA.categorie}
              renderItem={renderItemCategorie}
              horizontal={true}
              extraData={Constantes.DATA.annonce}
              showsHorizontalScrollIndicator={false}
            />
          </Box>
        </Column>
        <Column marginTop="s">
          <Text variant="primary">Publiées récemment</Text>
          <Box width={"100%"} marginTop="xs">
            <FlashList
              keyExtractor={(item, index) => item.id.toString()}
              estimatedItemSize={200}
              data={Constantes.DATA.annonce}
              renderItem={renderItemAnnonce}
              horizontal={true}
              extraData={Constantes.DATA.annonce}
              showsHorizontalScrollIndicator={false}
            />
          </Box>
        </Column>
      </ScrollView>
    </MainScreen>
  );
}

const styles = StyleSheet.create({
  imageAnnonce: {
    borderRadius: 10,
    height: 200,
    width: 280,
  },
  imageCatg: {
    borderRadius: 10,
    height: 60,
    width: 200,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  spinner: {
    height: 150,
    width: 200,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
});
