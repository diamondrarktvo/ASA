import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Column,
  EmptyList,
  Icon,
  Image,
  MainScreen,
  RequestError,
  RequestLoader,
  Text,
} from "_shared";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Constantes, removeDataToAsyncStorage } from "_utils";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { favoriteAnnonceType } from "../types";
import { useAppDispatch, useAppSelector } from "_store";
import {
  useDeleteFavoriteAnnonceMutation,
  useGetAllFavoriteAnnonceByUserQuery,
} from "../favoriteApi";
import { useState } from "react";
import { removeAccount } from "../../account/accountSlice";

export default function AnnouncementScreen() {
  //const navigation = useNavigation<>();
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const token = useAppSelector((state) => state.account.token);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");

  const {
    data: favoriteAnnonce,
    isError: isErrorfavorite,
    isLoading: isFavoriteLoading,
    isFetching: isFavoriteFetching,
    refetch: refetchFavoriteSeller,
    error: errorFavorite,
  } = useGetAllFavoriteAnnonceByUserQuery(token, {
    skip: !token,
  });
  const [
    deleteFavoriteAnnonce,
    {
      isError: isErrorDeleteFavoriteAnnonce,
      isLoading: isLoadingDeleteFavoriteAnnonce,
      error: errorDeleteFavoriteAnnonce,
    },
  ] = useDeleteFavoriteAnnonceMutation();

  const handleFetchError = (error: any) => {
    if (!error) return;
    if (error.detail?.includes("Invalid token")) {
      removeDataToAsyncStorage("token");
      removeDataToAsyncStorage("current_account");
      return dispatch(removeAccount());
    }
    if (error.data?.detail?.includes("Invalid token")) {
      removeDataToAsyncStorage("token");
      removeDataToAsyncStorage("current_account");
      return dispatch(removeAccount());
    }
  };

  //all logics
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
        handleFetchError(error);
      });
  };

  //components
  const renderItemAnnonce: ListRenderItem<favoriteAnnonceType> = ({ item }) => {
    return (
      <Column key={item.id} marginBottom="s">
        <Image
          source={
            item.product.pictures.length > 0
              ? { uri: item.product.pictures[0] }
              : require("_images/logoASA.jpeg")
          }
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
          onPress={() => handleDeleteFavoriteAnnonce(item.product.id)}
        />
        <Text
          variant="secondary"
          numberOfLines={1}
          textDecorationLine={"underline"}
        >
          {item.product.name}
        </Text>
      </Column>
    );
  };

  return (
    <MainScreen typeOfScreen="stack">
      <RequestLoader isLoading={isFavoriteLoading || isFavoriteFetching}>
        <RequestError
          isError={isErrorfavorite}
          errorStatus={errorFavorite?.status}
          onRefresh={() => refetchFavoriteSeller()}
        >
          <Box flexDirection={"column"} flex={1}>
            <FlashList
              keyExtractor={(item, index) => item.id.toString()}
              estimatedItemSize={200}
              data={favoriteAnnonce}
              renderItem={renderItemAnnonce}
              extraData={favoriteAnnonce}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <EmptyList textToShow="Vous n'avez pas d'annonce en favoris" />
              }
            />
          </Box>
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
        </RequestError>
      </RequestLoader>
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
