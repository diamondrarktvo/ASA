import { StyleSheet } from "react-native";
import { useState } from "react";
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
  Row,
  Text,
  TouchableOpacity,
} from "_shared";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { manageMessageNavigationTypes } from "../../inbox/types";
import {
  useGetAllFavoriteByUserQuery,
  useDeleteFavoriteMutation,
} from "../favoriteApi";
import { useAppSelector } from "_store";
import { favoriteType } from "../types";

export default function AnnouncerScreen() {
  const navigation = useNavigation<manageMessageNavigationTypes>();
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const token = useAppSelector((state) => state.account.token);
  const [messageSnackBar, setMessageSnackBar] = useState("");

  const {
    data: favoriteSeller,
    isError: isErrorfavorite,
    isLoading: isFavoriteLoading,
    isFetching: isFavoriteFetching,
    refetch: refetchFavoriteSeller,
    error: errorFavorite,
  } = useGetAllFavoriteByUserQuery(token, {
    skip: !token,
  });
  const [
    deleteFavorite,
    {
      isError: isErrorDeleteFavorite,
      isLoading: isLoadingDeleteFavorite,
      status: statusDeleteFavorite,
      error: errorDeleteFavorite,
    },
  ] = useDeleteFavoriteMutation();

  //all logics
  const handleDeleteFavorite = async (id: number) => {
    deleteFavorite({ id, token })
      .unwrap()
      .then((result) => {
        refetchFavoriteSeller();
        setVisibleSnackbar(true);
        setMessageSnackBar("Vendeur supprimé des favoris");
      })
      .catch((error) => {
        setVisibleSnackbar(true);
        setMessageSnackBar(error.message);
      });
  };

  //components
  const renderItemAnnouncer: ListRenderItem<favoriteType> = ({ item }) => {
    return (
      <Row key={item.id} marginBottom="s" width={"100%"}>
        <Image
          source={
            item.seller.image
              ? { uri: item.seller.image }
              : require("_images/logoASA.jpeg")
          }
          containerStyle={styles.imageProfil}
          PlaceholderContent={
            <ActivityIndicator color="#2652AA" style={styles.spinner} />
          }
        />
        <Column marginLeft="s">
          <Row alignItems="center">
            <Icon name="person" size={Size.ICON_SMALL} color={colors.black} />
            <Text variant="secondary" numberOfLines={1}>
              {item.seller.nickname}
            </Text>
          </Row>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("manage_message", {
                emetteur: item.seller.nickname,
              })
            }
          >
            <Row alignItems="flex-start">
              <Icon name="chat" size={Size.ICON_SMALL} color={colors.blue} />
              <Text
                variant={"primary"}
                numberOfLines={1}
                color={"blue"}
                textDecorationLine={"underline"}
                textDecorationColor={"blue"}
              >
                Envoyer message
              </Text>
            </Row>
          </TouchableOpacity>
        </Column>
        <Icon
          name="favorite"
          size={Size.ICON_MEDIUM}
          color={colors.error}
          containerStyle={{
            position: "absolute",
            zIndex: 2,
            top: 10,
            right: 10,
          }}
          onPress={() => handleDeleteFavorite(item.id)}
        />
      </Row>
    );
  };

  return (
    <MainScreen typeOfScreen="stack">
      <RequestLoader
        isLoading={
          isFavoriteLoading || isFavoriteFetching || isLoadingDeleteFavorite
        }
      >
        <RequestError
          isError={isErrorfavorite || isErrorDeleteFavorite}
          errorStatus={errorFavorite?.status || errorDeleteFavorite?.status}
          onRefresh={() => refetchFavoriteSeller()}
        >
          <Box flexDirection={"column"} flex={1}>
            <FlashList
              keyExtractor={(item, index) => item.id.toString()}
              estimatedItemSize={200}
              data={favoriteSeller}
              renderItem={renderItemAnnouncer}
              extraData={favoriteSeller}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <EmptyList textToShow="Vous n'avez pas de vendeur en favoris" />
              }
            />
          </Box>
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
  imageProfil: {
    borderRadius: 10,
    height: 100,
    width: 100,
  },
  spinner: {
    height: 100,
    width: 100,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
