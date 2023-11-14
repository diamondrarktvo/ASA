import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import {
  Box,
  Button,
  CheckUserConnected,
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
import { useRoute } from "@react-navigation/native";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";
import { annonceType, searchItemNavigationTypes } from "../types";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useGetCategoryQuery } from "../../sharedApi";
import { CategoryType } from "../../types";
import { useEffect, useState } from "react";
import { useGetAllAnnonceQuery } from "../searchApi";
import { useAppDispatch, useAppSelector } from "_store";
import {
  useAddFavoriteAnnonceMutation,
  useDeleteFavoriteAnnonceMutation,
} from "../../favorite/favoriteApi";
import { removeAccount } from "../../account/accountSlice";
import { removeDataToAsyncStorage } from "_utils";

export default function SearchScreen() {
  const navigation = useNavigation<searchItemNavigationTypes>();
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const route = useRoute();
  const { borderRadii, colors } = theme;
  const accountUser = useAppSelector((state) => state.account);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [userMustLogin, setUserMustLogin] = useState<boolean>(false);
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
  } = useGetAllAnnonceQuery(accountUser.token ? accountUser.token : undefined);

  const [
    addFavoriteAnnonce,
    {
      isError: isErrorAddFavoriteAnnonce,
      isLoading: isLoadingAddFavoriteAnnonce,
      error: errorAddFavoriteAnnonce,
    },
  ] = useAddFavoriteAnnonceMutation();
  const [
    deleteFavoriteAnnonce,
    {
      isError: isErrorDeleteFavoriteAnnonce,
      isLoading: isLoadingDeleteFavoriteAnnonce,
      error: errorDeleteFavoriteAnnonce,
    },
  ] = useDeleteFavoriteAnnonceMutation();

  //all logics
  const handleRefetch = () => {
    if (isErrorAnnonce) {
      refetchAnnonces();
    } else if (isErrorCategory) {
      refetchCategories();
    }
  };

  //announce favorite
  const handleAddFavoriteAnnonce = (id: number) => {
    addFavoriteAnnonce({ id: id, token: accountUser.token })
      .unwrap()
      .then((result) => {
        setVisibleSnackbar(true);
        setMessageSnackBar("Annonce ajouté aux favoris");
      });
  };

  const handleChangeFavoriteAnnonce = (annonce: annonceType) => {
    if (annonce) {
      if (annonce?.is_favorite) {
        handleDeleteFavoriteAnnonce(annonce.id);
      } else {
        handleAddFavoriteAnnonce(annonce.id);
      }
    }
    return;
  };

  const handleDeleteFavoriteAnnonce = (id: number) => {
    deleteFavoriteAnnonce({ id, token: accountUser.token })
      .unwrap()
      .then((result) => {
        setVisibleSnackbar(true);
        setMessageSnackBar("Annonce supprimé des favoris");
      })
      .catch((error) => {
        setVisibleSnackbar(true);
        setMessageSnackBar(error.message);
      });
  };

  const handleFetchError = (error: any) => {
    if (!error) return;
    if (error?.data?.detail?.includes("Invalid token")) {
      removeDataToAsyncStorage("token");
      removeDataToAsyncStorage("current_account");
      return dispatch(removeAccount());
    }
    if (error.detail?.includes("Invalid token")) {
      removeDataToAsyncStorage("token");
      removeDataToAsyncStorage("current_account");
      return dispatch(removeAccount());
    }
  };

  //all effects
  useEffect(() => {
    if (errorAnnonce) handleFetchError(errorAnnonce);
    if (errorAddFavoriteAnnonce) handleFetchError(errorAddFavoriteAnnonce);
    if (errorDeleteFavoriteAnnonce)
      handleFetchError(errorDeleteFavoriteAnnonce);
    if (errorCategory) handleFetchError(errorCategory);
  }, [
    errorAnnonce,
    errorAddFavoriteAnnonce,
    errorDeleteFavoriteAnnonce,
    errorCategory,
  ]);

  //components
  const renderItemCategorie: ListRenderItem<CategoryType> = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() =>
          navigation.navigate("search_item", {
            id_catg: item.id,
            name_catg: item.name,
            typeOfSearch: "category",
          })
        }
      >
        <Box
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
      </TouchableOpacity>
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
                ? { uri: item.pictures[0].image }
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
            name={item.is_favorite ? "favorite" : "favorite-border"}
            size={Size.ICON_MEDIUM}
            color={item.is_favorite ? colors.primary : colors.black}
            containerStyle={{
              backgroundColor: colors.white,
              padding: 2,
              borderRadius: borderRadii.hg,
              position: "absolute",
              zIndex: 2,
              top: 10,
              left: 12,
            }}
            onPress={() => {
              if (accountUser.is_account_connected) {
                handleChangeFavoriteAnnonce(item);
              } else {
                setUserMustLogin(true);
              }
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
          isAnnonceFetching ||
          isLoadingAddFavoriteAnnonce ||
          isLoadingDeleteFavoriteAnnonce
        }
      >
        <RequestError
          isError={
            isErrorCategory ||
            isErrorAnnonce ||
            isErrorAddFavoriteAnnonce ||
            isErrorDeleteFavoriteAnnonce
          }
          errorStatus={
            errorCategory?.status ||
            errorAnnonce?.status ||
            errorDeleteFavoriteAnnonce?.status ||
            errorAddFavoriteAnnonce?.status
          }
          onRefresh={() => handleRefetch()}
          isSearchScreen={route.name === "search_screen"}
        >
          <CheckUserConnected
            userMustLogin={userMustLogin}
            setUserMustLogin={setUserMustLogin}
            subTitleIfNotConnected="Connectez-vous pour découvrir toutes nos fonctionnalités"
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
                onPress={() => navigation.navigate("search_item", {})}
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
              <Column>
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
                    refreshControl={
                      <RefreshControl
                        refreshing={isAnnonceFetching}
                        onRefresh={() => refetchAnnonces()}
                      />
                    }
                  />
                  <Button
                    variant={"primary"}
                    color="white"
                    label="Afficher plus d'annonces"
                    marginTop={"xs"}
                    marginBottom={"m"}
                    onPress={() => navigation.navigate("search_item", {})}
                  />
                </Box>
              </Column>
            </ScrollView>
            <Snackbar
              visible={visibleSnackbar}
              onDismiss={() => setVisibleSnackbar(false)}
              action={{
                label: "Ok",
                onPress: () => {
                  // Do something
                },
              }}
            >
              {messageSnackBar}
            </Snackbar>
          </CheckUserConnected>
        </RequestError>
      </RequestLoader>
    </MainScreen>
  );
}

const styles = StyleSheet.create({
  imageAnnonce: {
    borderRadius: 4,
    height: 180,
    width: Dimensions.get("window").width < 400 ? 165 : 180,
  },
  maskImageCatg: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 6,
    height: 80,
    width: 130,
  },
  spinnerAnnonce: {
    height: 180,
    width: Dimensions.get("window").width < 400 ? 165 : 180,
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
