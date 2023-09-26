import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ImageBackground, StyleSheet } from "react-native";
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
import { useAppSelector } from "_store";

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const idOfProduct = route.params?.idOfProduct;
  const token = useAppSelector((state) => state.account.token);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");

  const {
    data: annonce,
    isError: isErrorAnnonce,
    isLoading: isAnnonceLoading,
    isFetching: isAnnonceFetching,
    refetch: refetchAnnonce,
    error: errorAnnonce,
  } = useGetOneAnnonceQuery(
    { id: idOfProduct, token: token ? token : undefined },
    {
      skip: !idOfProduct,
    },
  );

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

  console.log("annonce : ", annonce);

  //all logics
  //seller favorite
  const handleAddFavoriteSeller = (id: number) => {
    addFavoriteSeller({ id: id, token: token })
      .unwrap()
      .then((result) => {
        setVisibleSnackbar(true);
        setMessageSnackBar("Vendeur ajouté aux favoris");
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
    deleteFavoriteSeller({ id, token })
      .unwrap()
      .then((result) => {
        setVisibleSnackbar(true);
        setMessageSnackBar("Vendeur supprimé des favoris");
      })
      .catch((error) => {
        setVisibleSnackbar(true);
        setMessageSnackBar(error.message);
      });
  };

  //announce favorite
  const handleAddFavoriteAnnonce = (id: number) => {
    addFavoriteAnnonce({ id: id, token: token })
      .unwrap()
      .then((result) => {
        setVisibleSnackbar(true);
        setMessageSnackBar("Annonce ajouté aux favoris");
      });
  };

  const handleChangeFavoriteAnnonce = () => {
    if (annonce?.seller) {
      if (annonce?.seller.is_followed) {
        handleDeleteFavoriteAnnonce(annonce.id);
      } else {
        handleAddFavoriteAnnonce(annonce.id);
      }
    }
    return;
  };

  const handleDeleteFavoriteAnnonce = (id: number) => {
    deleteFavoriteAnnonce({ id, token })
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
        <Row
          style={{ position: "absolute", zIndex: 10, top: 0 }}
          justifyContent="space-between"
          width="100%"
          paddingHorizontal="s"
          paddingTop="s"
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
            name="favorite-border"
            size={Size.ICON_MEDIUM}
            color={colors.black}
            containerStyle={{
              backgroundColor: "white",
              borderRadius: 50,
              padding: 6,
            }}
          />
        </Row>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box>
            <Image
              source={
                /*
              item.pictures[0]
                ? { uri: item.pictures[0] }
                : */ require("_images/logo.jpg")
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
                <Button
                  variant={
                    annonce?.seller.is_followed ? "secondary" : "tertiary"
                  }
                  label={annonce?.seller.is_followed ? "Suivi" : "Suivre"}
                  loading={isLoadingAddFavorite || isLoadingDeleteFavorite}
                  onPress={() => handleChangeFavoriteSeller()}
                  paddingVertical={"l"}
                />
              </Row>
              <Text variant={"tertiary"} fontWeight={"500"} mt={"xs"}>
                {annonce?.seller.nickname}
              </Text>
              <Text variant={"tertiary"}>{annonce?.phone_number_contact}</Text>
            </Column>
          </MainScreen>
        </ScrollView>
        {annonce?.seller && (
          <Button
            variant={"primary"}
            color="white"
            label="Message"
            width={"95%"}
            mx={"xs"}
            borderRadius={"md"}
            marginVertical={"xs"}
            onPress={() =>
              navigation.navigate("manage_message", {
                emetteur: annonce.seller.nickname,
              })
            }
          />
        )}
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
  firstCharacter: {
    fontSize: 24,
    fontWeight: "bold",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});