import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import {
  Box,
  Button,
  Column,
  Icon,
  Image,
  MainScreen,
  RequestError,
  RequestLoader,
  Row,
  Text,
  TouchableOpacity,
} from "_shared";
import { Constantes } from "_utils";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";
import { annonceType, searchItemNavigationTypes } from "../types";
import { ScrollView } from "react-native-gesture-handler";
import { useGetCategoryQuery } from "../../sharedApi";
import { CategoryType } from "../../types";
import { useState } from "react";
import { useEffect } from "react";
import { Skeleton } from "@rneui/themed";
import { useGetAllAnnonceQuery } from "../searchApi";

export default function SearchScreen() {
  const navigation = useNavigation<searchItemNavigationTypes>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const {
    data: allCategories,
    isError: isErrorCategory,
    isLoading: isCategoriesLoading,
    isFetching: isCategoriesFetching,
    refetch: refetchCategories,
    error: errorCategory,
  } = useGetCategoryQuery(undefined);

  const {
    data: allAnnonces,
    isError: isErrorAnnonce,
    isLoading: isAnnonceLoading,
    isFetching: isAnnonceFetching,
    refetch: refetchAnnonces,
    error: errorAnnonce,
  } = useGetAllAnnonceQuery(undefined);

  //effect

  //components
  const renderItemCategorie: ListRenderItem<CategoryType> = ({ item }) => {
    return (
      <Box
        key={item.id}
        marginRight={"xs"}
        height={80}
        width={130}
        borderRadius={"xxs"}
        alignItems={"flex-start"}
        justifyContent={"flex-end"}
      >
        <ImageBackground
          source={
            item.image ? { uri: item.image } : require("_images/logo.jpg")
          }
          blurRadius={8}
          style={{
            marginHorizontal: 4,
            height: 80,
            width: 130,
          }}
          imageStyle={{
            resizeMode: "cover",
            borderRadius: 6,
          }}
        >
          <Box
            style={[StyleSheet.absoluteFillObject, styles.maskImageCatg]}
          ></Box>
          <Text
            variant={"tertiary"}
            fontWeight={"bold"}
            color={"white"}
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
        </ImageBackground>
      </Box>
    );
  };

  const renderItemAnnonce: ListRenderItem<annonceType> = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() =>
          navigation.navigate("product_detail_screen", { idOfProduct: item.id })
        }
      >
        <Column marginBottom={"s"}>
          <Image
            source={
              item.pictures[0]
                ? { uri: item.pictures[0] }
                : require("_images/logo.jpg")
            }
            containerStyle={styles.imageAnnonce}
            PlaceholderContent={
              <ActivityIndicator
                color="#2652AA"
                style={styles.spinnerAnnonce}
              />
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
          <Text variant="secondary" numberOfLines={1} fontWeight={"600"}>
            {item.name}
          </Text>
          <Text variant="tertiary" numberOfLines={1} fontWeight={"400"}>
            {typeof item.price === "number" ? item.price : parseInt(item.price)}{" "}
            Ar
          </Text>
          <Text variant={"tertiary"} numberOfLines={1}>
            {item.description}
          </Text>
        </Column>
      </TouchableOpacity>
    );
  };

  return (
    <MainScreen typeOfScreen="tab">
      <RequestLoader
        isLoading={
          isCategoriesFetching ||
          isCategoriesLoading ||
          isAnnonceLoading ||
          isAnnonceFetching
        }
      >
        <RequestError
          isError={isErrorCategory || isErrorAnnonce}
          errorStatus={errorCategory?.status || errorAnnonce?.status}
          onRefresh={() => refetchCategories()}
        >
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
            <Column marginTop="xs">
              <Text variant="primaryBold">Catégorie les plus visités</Text>
              <Box width={"100%"} height={80} marginTop="xs">
                <FlashList
                  keyExtractor={(item, index) => item.id.toString()}
                  estimatedItemSize={200}
                  data={allCategories?.categories}
                  renderItem={renderItemCategorie}
                  horizontal={true}
                  extraData={allCategories?.categories}
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={<Text>Catégorie indisponible</Text>}
                />
              </Box>
            </Column>
            <Column marginTop="s">
              <Text variant="primaryBold">Annonces fraîchement publiées</Text>
              {/*//FIXME: fix the height of the list*/}
              <Box
                style={{
                  flex: 1,
                  height: Dimensions.get("window").height,
                }}
                width={"100%"}
                marginTop="xs"
              >
                <FlashList
                  keyExtractor={(item, index) => item.id.toString()}
                  estimatedItemSize={200}
                  data={allAnnonces?.annonces?.slice(0, 6)}
                  renderItem={renderItemAnnonce}
                  numColumns={2}
                  extraData={allAnnonces?.annonces?.slice(0, 6)}
                  showsVerticalScrollIndicator={false}
                />
              </Box>
            </Column>
          </ScrollView>
        </RequestError>
      </RequestLoader>
    </MainScreen>
  );
}

const styles = StyleSheet.create({
  imageAnnonce: {
    borderRadius: 4,
    height: 180,
    width: 180,
  },
  maskImageCatg: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 6,
    height: 80,
    width: 130,
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
