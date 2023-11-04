import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ImageBackground, Platform, StyleSheet } from "react-native";
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
} from "_shared";
import { Constantes, formatDateToString, getFirstCharactere } from "_utils";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";
import { ScrollView } from "react-native-gesture-handler";
import { CategoryType } from "../../types";
import { useEffect, useState } from "react";
import { useGetOneAnnonceQuery } from "../searchApi";
import {
  useAddFavoriteAnnonceMutation,
  useAddFavoriteSellerMutation,
  useDeleteFavoriteAnnonceMutation,
  useDeleteFavoriteSellerMutation,
} from "../../favorite/favoriteApi";
import { useAppDispatch, useAppSelector } from "_store";
import { removeAccount } from "../../account/accountSlice";

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const idOfProduct = route.params?.idOfProduct;
  const accountUser = useAppSelector((state) => state.account);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [userMustLogin, setUserMustLogin] = useState<boolean>(false);

  const {
    data: annonce,
    isError: isErrorAnnonce,
    isLoading: isAnnonceLoading,
    isFetching: isAnnonceFetching,
    refetch: refetchAnnonce,
    error: errorAnnonce,
  } = useGetOneAnnonceQuery(
    {
      id: idOfProduct,
      token: accountUser.token ? accountUser.token : undefined,
    },
    {
      skip: !idOfProduct,
    },
  );

  const handleFetchError = (error: any) => {
    if (error.detail?.includes("Invalid token")) {
      return dispatch(removeAccount());
    }
  };

  const [
    addFavoriteSeller,
    {
      isError: isErrorAddFavorite,
      isLoading: isLoadingAddFavorite,
      error: errorAddFavorite,
    },
  ] = useAddFavoriteSellerMutation();
  const [
    deleteFavoriteSeller,
    {
      isError: isErrorDeleteFavorite,
      isLoading: isLoadingDeleteFavorite,
      error: errorDeleteFavorite,
    },
  ] = useDeleteFavoriteSellerMutation();

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
  //seller favorite
  const handleAddFavoriteSeller = (id: number) => {
    addFavoriteSeller({ id: id, token: accountUser.token })
      .unwrap()
      .then((result) => {
        setVisibleSnackbar(true);
        setMessageSnackBar("Vendeur ajouté aux favoris");
      })
      .catch((err) => {
        setVisibleSnackbar(true);
        setMessageSnackBar(err.message);
        handleFetchError(err);
      });
  };

  const handleChangeFavoriteSeller = () => {
    if (annonce?.seller) {
      if (annonce?.seller.is_followed) {
        handleDeleteFavorite(annonce.seller.id);
      } else {
        handleAddFavoriteSeller(annonce.seller.id);
      }
    }
    return;
  };

  const handleDeleteFavorite = (id: number) => {
    deleteFavoriteSeller({ id, token: accountUser.token })
      .unwrap()
      .then((result) => {
        setVisibleSnackbar(true);
        setMessageSnackBar("Vendeur supprimé des favoris");
      })
      .catch((error) => {
        setVisibleSnackbar(true);
        setMessageSnackBar(error.message);
        handleFetchError(error);
      });
  };

  //announce favorite
  const handleAddFavoriteAnnonce = (id: number) => {
    addFavoriteAnnonce({ id: id, token: accountUser.token })
      .unwrap()
      .then((result) => {
        setVisibleSnackbar(true);
        setMessageSnackBar("Annonce ajouté aux favoris");
      })
      .catch((err) => {
        setVisibleSnackbar(true);
        setMessageSnackBar(err.message);
        handleFetchError(err);
      });
  };

  const handleChangeFavoriteAnnonce = () => {
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
        handleFetchError(error);
      });
  };

  const handleRefetch = () => {
    if (isErrorAnnonce) {
      refetchAnnonce();
    } else if (isErrorAddFavorite && annonce?.seller.id) {
      handleAddFavoriteSeller(annonce?.seller.id);
    } else if (isErrorAddFavoriteAnnonce && annonce?.id) {
      handleAddFavoriteAnnonce(annonce?.id);
    }
  };

  //components
  const renderItemCriteria: ListRenderItem<CategoryType> = ({ item }) => {
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

  return (
    <RequestLoader
      isLoading={
        isAnnonceLoading ||
        isAnnonceFetching ||
        isLoadingAddFavoriteAnnonce ||
        isLoadingDeleteFavoriteAnnonce
      }
    >
      <RequestError
        isError={
          isErrorAnnonce ||
          isErrorAddFavorite ||
          isErrorDeleteFavorite ||
          isErrorAddFavoriteAnnonce ||
          isErrorDeleteFavoriteAnnonce
        }
        errorStatus={
          errorAnnonce?.status ||
          errorAddFavorite?.status ||
          errorDeleteFavorite?.status ||
          errorDeleteFavoriteAnnonce?.status ||
          errorAddFavoriteAnnonce?.status
        }
        onRefresh={() => handleRefetch()}
      >
        <CheckUserConnected
          userMustLogin={userMustLogin}
          setUserMustLogin={setUserMustLogin}
          subTitleIfNotConnected="Connectez-vous pour découvrir toutes nos fonctionnalités"
          needPadding={userMustLogin}
        >
          <Row
            style={{ position: "absolute", zIndex: 10, top: 0 }}
            justifyContent="space-between"
            width="100%"
            paddingHorizontal="s"
            paddingTop={Platform.OS === "ios" ? "l" : "s"}
          >
            <Icon
              name="arrow-back"
              size={Size.ICON_MEDIUM}
              color={colors.black}
              containerStyle={{
                backgroundColor: "white",
                borderRadius: 50,
                padding: 6,
              }}
              onPress={() => navigation.goBack()}
            />
            <Icon
              name={
                annonce && annonce.is_favorite ? "favorite" : "favorite-border"
              }
              size={Size.ICON_MEDIUM}
              color={colors.black}
              containerStyle={{
                backgroundColor: "white",
                borderRadius: 50,
                padding: 6,
              }}
              onPress={() => {
                if (accountUser.is_account_connected) {
                  handleChangeFavoriteAnnonce();
                } else {
                  setUserMustLogin(true);
                }
              }}
            />
          </Row>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box>
              <Image
                source={
                  annonce?.pictures[0]
                    ? { uri: annonce?.pictures[0].image }
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
            </Box>

            <MainScreen typeOfScreen="stack">
              <Text variant={"primaryBold"}>{annonce?.name}</Text>
              <Text variant={"primary"}>{annonce?.price} Ar</Text>
              <Text variant={"tertiary"}>
                {" "}
                Publié le{" "}
                {annonce?.publication_date &&
                  formatDateToString(annonce?.publication_date)}
              </Text>

              <Box mt={"s"}>
                <Text variant={"secondary"} fontWeight={"600"}>
                  Critères
                </Text>
              </Box>
              <Box mt={"s"}>
                <Text variant={"secondary"} fontWeight={"600"}>
                  Description
                </Text>
                <Text variant={"tertiary"}>{annonce?.description}</Text>
              </Box>

              <Box mt={"s"}>
                <Text variant={"secondary"} fontWeight={"600"}>
                  Localisation
                </Text>
                <Text variant={"tertiary"}>{annonce?.location}</Text>
              </Box>

              <Box mt={"s"}>
                <Text variant={"secondary"} fontWeight={"600"}>
                  Quantité
                </Text>
                <Text variant={"tertiary"}>{annonce?.quantity}</Text>
              </Box>

              <Column mt={"s"}>
                <Text variant={"secondary"} fontWeight={"600"}>
                  Vendeur
                </Text>
                <Row
                  width={"100%"}
                  alignItems="center"
                  justifyContent="space-between"
                  my={"xs"}
                >
                  <Text
                    style={[
                      styles.firstCharacter,
                      { backgroundColor: colors.offBlack, color: colors.white },
                    ]}
                  >
                    {annonce?.seller &&
                      getFirstCharactere(annonce.seller.nickname)}
                  </Text>
                  {annonce?.seller.id !== accountUser.user.id && (
                    <Button
                      variant={
                        annonce?.seller.is_followed ? "secondary" : "tertiary"
                      }
                      label={annonce?.seller.is_followed ? "Suivi" : "Suivre"}
                      loading={isLoadingAddFavorite || isLoadingDeleteFavorite}
                      onPress={() => {
                        if (accountUser.is_account_connected) {
                          handleChangeFavoriteSeller();
                        } else {
                          setUserMustLogin(true);
                        }
                      }}
                      paddingVertical={"l"}
                    />
                  )}
                </Row>
                <Text variant={"tertiary"} fontWeight={"500"} mt={"xs"}>
                  {annonce?.seller.nickname}
                </Text>
                <Text variant={"tertiary"}>
                  {annonce?.phone_number_contact}
                </Text>
              </Column>
            </MainScreen>
          </ScrollView>
          {annonce?.seller && annonce?.seller.id !== accountUser.user.id && (
            <Button
              variant={"primary"}
              color="white"
              label="Message"
              width={"95%"}
              mx={"xs"}
              borderRadius={"md"}
              marginVertical={Platform.OS === "ios" ? "s" : "xs"}
              onPress={() => {
                if (accountUser.is_account_connected) {
                  navigation.navigate("manage_message", {
                    emetteur: {
                      nickName: annonce.seller.nickname,
                      id_seller: annonce.seller.id,
                      id_conversation: annonce.seller.id_conversation ?? null,
                    },
                  });
                } else {
                  setUserMustLogin(true);
                }
              }}
            />
          )}
        </CheckUserConnected>
      </RequestError>
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
    </RequestLoader>
  );
}

const styles = StyleSheet.create({
  imageAnnonce: {
    borderRadius: 4,
    height: 280,
    width: "100%",
  },
  maskImageCatg: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 6,
    height: 80,
    width: 130,
  },
  spinnerAnnonce: {
    height: 280,
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
  firstCharacter: {
    fontSize: 24,
    fontWeight: "bold",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
