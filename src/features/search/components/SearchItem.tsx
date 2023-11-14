import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Button,
  Column,
  Row,
  Icon,
  Image,
  MainScreen,
  Text,
  Input,
  RequestLoader,
  RequestError,
  TouchableOpacity,
  CheckUserConnected,
  EmptyList,
} from "_shared";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";
import {
  useGetAnnonceByCategoryQuery,
  useGetAnnonceBySearchingQuery,
} from "../searchApi";
import { useAppDispatch, useAppSelector } from "_store";
import { removeAccount } from "../../account/accountSlice";
import { useEffect, useState } from "react";
import {
  useAddFavoriteAnnonceMutation,
  useDeleteFavoriteAnnonceMutation,
} from "../../favorite/favoriteApi";
import { RouteSearchParams, annonceType } from "../types";
import { RefreshControl } from "react-native-gesture-handler";
import { removeDataToAsyncStorage } from "_utils";

export default function SearchItem() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const accountUser = useAppSelector((state) => state.account);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [userMustLogin, setUserMustLogin] = useState<boolean>(false);
  const [resultSearch, setResultSearch] = useState<annonceType[] | null>(null);
  const [textSearch, setTextSearch] = useState<string>("");
  const [showEmptyComponent, setShowEmptyComponent] = useState<boolean>(false);
  const [typeOfSearch, setTypeOfSearch] = useState<
    "category" | "free_search" | ""
  >("");
  const [categorieToSearch, setCategorieToSearch] = useState<string>("");

  const {
    data: allAnnonceByCatg,
    isError: isErrorAnnonceByCatg,
    isLoading: isAnnonceLoadingByCatg,
    isFetching: isAnnonceFetchingByCatg,
    refetch: refetchAnnoncesByCatg,
    error: errorAnnonceByCatg,
  } = useGetAnnonceByCategoryQuery(
    {
      token: accountUser.token ? accountUser.token : undefined,
      id_catg: route.params && route.params?.id_catg,
    },
    {
      skip: !route.params?.id_catg || typeOfSearch === "free_search",
    },
  );

  const {
    data: allAnnonceBySearch,
    isError: isErrorSearch,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
    refetch: refetchSearch,
    error: errorSearch,
  } = useGetAnnonceBySearchingQuery(
    {
      token: accountUser.token ? accountUser.token : undefined,
      textToSearch: textSearch,
    },
    {
      skip: !textSearch || typeOfSearch === "category",
    },
  );

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

  //logics
  const handleFetchError = (error: any) => {
    if (!error) return;
    if (error.data && error.data.detail?.includes("Invalid token")) {
      removeDataToAsyncStorage("token");
      removeDataToAsyncStorage("current_account");
      return dispatch(removeAccount());
    }
    if (error.detail && error.detail?.includes("Invalid token")) {
      removeDataToAsyncStorage("token");
      removeDataToAsyncStorage("current_account");
      return dispatch(removeAccount());
    }
  };

  const handleRefetch = () => {
    if (isErrorAnnonceByCatg) {
      refetchAnnoncesByCatg();
    }
    if (isErrorSearch) {
      refetchSearch();
    }
  };

  const handleAddFavoriteAnnonce = (id: number) => {
    addFavoriteAnnonce({ id: id, token: accountUser.token })
      .unwrap()
      .then((result) => {
        setVisibleSnackbar(true);
        setMessageSnackBar("Annonce ajouté aux favoris");
      });
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

  //effect
  useEffect(() => {
    if (isErrorAnnonceByCatg) handleFetchError(errorAnnonceByCatg);
    if (isErrorAddFavoriteAnnonce) handleFetchError(errorAddFavoriteAnnonce);
    if (isErrorDeleteFavoriteAnnonce)
      handleFetchError(errorDeleteFavoriteAnnonce);
    if (isErrorSearch) handleFetchError(errorSearch);
  }, [isErrorAnnonceByCatg]);

  useEffect(() => {
    if (
      route.params &&
      (route.params as RouteSearchParams)?.typeOfSearch === "category"
    ) {
      setTypeOfSearch("category");
    }
  }, [route]);

  //set result search by category or by search
  useEffect(() => {
    if (allAnnonceByCatg && typeOfSearch === "category") {
      setResultSearch(allAnnonceByCatg);
    }
  }, [allAnnonceByCatg, typeOfSearch]);

  useEffect(() => {
    if (allAnnonceBySearch && typeOfSearch === "free_search") {
      setShowEmptyComponent(false);
      setResultSearch(allAnnonceBySearch.annonces);
    }
    if (allAnnonceBySearch && allAnnonceBySearch.annonces.length === 0) {
      setShowEmptyComponent(true);
    }
  }, [allAnnonceBySearch, typeOfSearch]);

  useEffect(() => {
    if (route.params?.name_catg) {
      setCategorieToSearch(route.params?.name_catg);
    }
    if (typeOfSearch === "free_search") {
      setCategorieToSearch("");
    }
  }, [typeOfSearch]);

  //components
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
              <ActivityIndicator color="#2652AA" style={styles.spinner} />
            }
          />
          <Icon
            name={item.is_favorite ? "favorite" : "favorite-border"}
            size={Size.ICON_MEDIUM}
            color={colors.black}
            containerStyle={{
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

  console.log("categorieToSearch", categorieToSearch);

  return (
    <MainScreen typeOfScreen="tab">
      <CheckUserConnected
        userMustLogin={userMustLogin}
        setUserMustLogin={setUserMustLogin}
        subTitleIfNotConnected="Connectez-vous pour découvrir toutes nos fonctionnalités"
      >
        <Row alignItems="center" width="90%" justifyContent="space-between">
          <Icon
            name="arrow-back"
            size={Size.ICON_MEDIUM}
            color={colors.black}
            containerStyle={{
              marginRight: 8,
            }}
            onPress={() => navigation.goBack()}
          />
          <Input
            placeholder="Entrez le mot-clé ..."
            value={textSearch}
            onChangeText={(text) => {
              setTypeOfSearch("free_search");
              setTextSearch(text);
            }}
            iconRight={{
              name: textSearch ? "close" : "",
              size: 16,
              color: colors.secondary,
              onPress: () => {
                if (textSearch) {
                  setTextSearch("");
                  setShowEmptyComponent(false);
                  setCategorieToSearch("");
                }
              },
            }}
          />
        </Row>
        <Box my={"xs"}>
          {categorieToSearch && (
            <Box
              width={"40%"}
              borderWidth={1}
              borderStyle={"solid"}
              borderColor={"primary"}
              py={"xxs"}
              px={"xs"}
              borderRadius={"xs"}
            >
              <Text>Catégorie : {categorieToSearch}</Text>
            </Box>
          )}
        </Box>
        <RequestLoader
          isLoading={
            isAnnonceLoadingByCatg ||
            isAnnonceFetchingByCatg ||
            isSearchLoading ||
            isSearchFetching
          }
        >
          <RequestError
            isError={isErrorAnnonceByCatg || isErrorSearch}
            errorStatus={errorAnnonceByCatg?.status || errorSearch?.status}
            onRefresh={() => handleRefetch()}
          >
            <Box flexDirection="column" flex={1} alignItems="center">
              <Text variant="tertiary" color="text">
                {resultSearch &&
                  resultSearch.length > 0 &&
                  `${resultSearch.length} résultats trouvés`}
              </Text>
              <Box flex={1} width="100%" marginTop="xs">
                <FlashList
                  keyExtractor={(item, index) => item.id.toString()}
                  estimatedItemSize={200}
                  data={resultSearch}
                  renderItem={renderItemAnnonce}
                  extraData={resultSearch}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={isAnnonceFetchingByCatg}
                      onRefresh={() => refetchAnnoncesByCatg()}
                    />
                  }
                  ListEmptyComponent={
                    showEmptyComponent ? (
                      <EmptyList textToShow="Désolé, nous n'avons pas ça sous la main!" />
                    ) : null
                  }
                />
              </Box>
            </Box>
          </RequestError>
        </RequestLoader>
      </CheckUserConnected>
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
