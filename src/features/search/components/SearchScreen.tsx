import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { ImageBackground, StyleSheet } from "react-native";
import { Box, Button, Column, Image, MainScreen, Text } from "_shared";
import { Constantes, annonceTypes, categorieTypes } from "_utils";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@shopify/restyle";
import { Theme } from "_theme";

export default function SearchScreen() {
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;

  //components
  const renderItemCategorie: ListRenderItem<categorieTypes> = ({ item }) => {
    return (
      <Box key={item.id} marginRight="xs">
        <ImageBackground
          source={require("_images/logo.jpg")}
          style={styles.imageCatg}
          imageStyle={{ borderRadius: borderRadii.lg }}
        >
          <Text variant={"primaryBold"} color={"black"}>
            {item.title}
          </Text>
        </ImageBackground>
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
      <Text variant="bigTitle" color="primary" textAlign="center">
        Atsika samy Atsika
      </Text>
      <Button
        variant="secondary"
        label="Recherchez partout à Madagascar"
        marginVertical="xs"
      />
      <Column marginTop="m">
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
      <Column marginTop="m">
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
    </MainScreen>
  );
}

const styles = StyleSheet.create({
  imageAnnonce: {
    borderRadius: 10,
    height: 150,
    width: 200,
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
});
