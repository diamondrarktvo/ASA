import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import { Box, Button, Column, Icon, Image, MainScreen, Text } from "_shared";
import { Constantes, annonceTypes, categorieTypes } from "_utils";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";
import { searchItemNavigationTypes } from "../types";
import { ScrollView } from "react-native-gesture-handler";
import { useGetCategoryQuery } from "../../sharedApi";
import { CategoryType } from "../../types";
import { useState } from "react";
import { useEffect } from "react";

export default function SearchScreen() {
  const navigation = useNavigation<searchItemNavigationTypes>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const {
    data,
    isLoading: isCategoriesLoading,
    isFetching,
    refetch,
    error,
  } = useGetCategoryQuery(undefined);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  //effect
  useEffect(() => {
    setCategories(data?.categories);
  }, [data]);

  console.log("categories : ", categories);

  //components
  const renderItemCategorie: ListRenderItem<CategoryType> = ({ item }) => {
    return (
      <Box
        key={item.id}
        marginRight={"xs"}
        height={120}
        width={140}
        borderRadius={"xxs"}
        alignItems={"flex-start"}
        justifyContent={"flex-end"}
      >
        <Image
          source={
            item.image ? { uri: item.image } : require("_images/logo.jpg")
          }
          containerStyle={styles.imageCategory}
          PlaceholderContent={
            <ActivityIndicator color="#2652AA" style={styles.spinnerCatg} />
          }
        />
        <Text
          variant={"tertiary"}
          fontWeight={"600"}
          color={"black"}
          paddingLeft={"m"}
          paddingBottom={"s"}
          style={{
            position: "absolute",
            bottom: 3,
            left: 3,
          }}
        >
          {item.name}
        </Text>
      </Box>
    );
  };

  const renderItemAnnonce: ListRenderItem<annonceTypes> = ({ item }) => {
    return (
      <Column key={item.id} marginBottom={"s"}>
        <Image
          source={item.image}
          containerStyle={styles.imageAnnonce}
          PlaceholderContent={
            <ActivityIndicator color="#2652AA" style={styles.spinnerAnnonce} />
          }
        />
        <Icon
          name="favorite-border"
          size={Size.ICON_MEDIUM}
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text variant={"bigTitle"} color="primary" textAlign="center">
          Mety Amiko
        </Text>
        <Button
          variant={"buttonWithShadow"}
          iconLeft="search"
          iconRight="gps-fixed"
          color="black"
          label="Recherchez partout à Madagascar"
          marginTop={"xs"}
          marginBottom={"m"}
          onPress={() => navigation.navigate("search_item")}
        />
        <Column marginTop="s">
          <Text variant="primaryBold">Catégorie les plus visités</Text>
          <Box width={"100%"} height={120} marginTop="xs">
            <FlashList
              keyExtractor={(item, index) => item.id.toString()}
              estimatedItemSize={200}
              data={categories}
              renderItem={renderItemCategorie}
              horizontal={true}
              extraData={categories}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={<Text>No catégorie</Text>}
            />
          </Box>
        </Column>
        <Column marginTop="s">
          <Text variant="primaryBold">Annonces fraîchement publiées</Text>
          {/*//FIXME: fix the height of the list*/}
          <Box
            style={{ flex: 1, height: Dimensions.get("window").height - 90 }}
            width={"100%"}
            marginTop="xs"
          >
            <FlashList
              keyExtractor={(item, index) => item.id.toString()}
              estimatedItemSize={200}
              data={Constantes.DATA.annonce}
              renderItem={renderItemAnnonce}
              numColumns={2}
              extraData={Constantes.DATA.annonce}
              showsVerticalScrollIndicator={false}
            />
          </Box>
        </Column>
      </ScrollView>
    </MainScreen>
  );
}

const styles = StyleSheet.create({
  imageAnnonce: {
    borderRadius: 6,
    height: 180,
    width: 180,
  },
  imageCategory: {
    borderRadius: 6,
    height: 120,
    width: 140,
  },
  spinnerAnnonce: {
    height: 100,
    width: 100,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  spinnerCatg: {
    height: 120,
    width: 140,
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
