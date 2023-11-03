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
} from "_shared";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";
import { useGetAnnonceByCategoryQuery } from "../searchApi";
import { useAppDispatch, useAppSelector } from "_store";
import { removeAccount } from "../../account/accountSlice";
import { useEffect, useState } from "react";
import {
  useAddFavoriteAnnonceMutation,
  useDeleteFavoriteAnnonceMutation,
} from "../../favorite/favoriteApi";
import { annonceType } from "../types";
import { RefreshControl } from "react-native-gesture-handler";

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
      skip: !route.params?.id_catg,
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

  console.log("errorAnnonceByCatg", errorAnnonceByCatg);

  //logics
  const handleFetchError = (error: any) => {
    if (error && error.data && error.data.detail?.includes("Invalid token")) {
      return dispatch(removeAccount());
    }
    if (error && error.detail && error.detail?.includes("Invalid token")) {
      return dispatch(removeAccount());
    }
  };

  const handleRefetch = () => {
    if (isErrorAnnonceByCatg) {
      refetchAnnoncesByCatg();
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
    if (errorAddFavoriteAnnonce) handleFetchError(errorAddFavoriteAnnonce);
    if (errorDeleteFavoriteAnnonce)
      handleFetchError(errorDeleteFavoriteAnnonce);
  }, [isErrorAnnonceByCatg]);

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
                ? { uri: item.pictures[0] }
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

  return (
    <MainScreen typeOfScreen="tab">
      <RequestLoader
        isLoading={isAnnonceLoadingByCatg || isAnnonceFetchingByCatg}
      >
        <RequestError
          isError={isErrorAnnonceByCatg}
          errorStatus={errorAnnonceByCatg?.status}
          onRefresh={() => handleRefetch()}
        >
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
                iconRight={{
                  name: "search",
                  size: 32,
                  color: colors.secondary,
                  onPress: () => console.log("test"),
                }}
              />
            </Row>
            <Box flexDirection="column" flex={1} alignItems="center">
              <Text variant="tertiary" color="text">
                {allAnnonceByCatg &&
                  allAnnonceByCatg.length > 0 &&
                  `${allAnnonceByCatg.length} résultats trouvés`}
              </Text>
              <Box flex={1} width="100%" marginTop="xs">
                <FlashList
                  keyExtractor={(item, index) => item.id.toString()}
                  estimatedItemSize={200}
                  data={allAnnonceByCatg}
                  renderItem={renderItemAnnonce}
                  extraData={allAnnonceByCatg}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={isAnnonceFetchingByCatg}
                      onRefresh={() => refetchAnnoncesByCatg()}
                    />
                  }
                />
              </Box>
            </Box>
          </CheckUserConnected>
        </RequestError>
      </RequestLoader>
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
