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
  RequestConnection,
} from "_shared";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";
import { useAppDispatch, useAppSelector } from "_store";
import { removeAccount } from "../../account/accountSlice";
import { useEffect, useState } from "react";
import { RefreshControl } from "react-native-gesture-handler";
import { removeDataToAsyncStorage } from "_utils";
import { annonceType } from "../../search/types";
import { useGetAllMyAnnonceQuery } from "../../search/searchApi";

export default function MyAnnounceScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const accountUser = useAppSelector((state) => state.account);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [userMustLogin, setUserMustLogin] = useState<boolean>(false);

  const {
    data: myAllAnnonce,
    isError: isErrorMyAnnonce,
    isLoading: isMyAnnonceLoading,
    isFetching: isMyAnnonceFetching,
    refetch: refetchMyAnnonce,
    error: errorMyAnnonce,
  } = useGetAllMyAnnonceQuery(
    {
      token: accountUser.token ? accountUser.token : undefined,
    },
    {
      skip: !accountUser.token,
    },
  );

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
    if (isErrorMyAnnonce) {
      refetchMyAnnonce();
    }
  };

  //effect
  useEffect(() => {
    if (isErrorMyAnnonce) handleFetchError(errorMyAnnonce);
  }, [isErrorMyAnnonce]);

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
      <RequestConnection>
        <CheckUserConnected
          userMustLogin={userMustLogin}
          setUserMustLogin={setUserMustLogin}
          subTitleIfNotConnected="Connectez-vous pour découvrir toutes nos fonctionnalités"
        >
          <RequestLoader isLoading={isMyAnnonceLoading || isMyAnnonceFetching}>
            <RequestError
              isError={isErrorMyAnnonce}
              errorStatus={errorMyAnnonce?.status}
              onRefresh={() => handleRefetch()}
            >
              <Box flexDirection="column" flex={1} alignItems="center">
                <Row width="100%" justifyContent="space-between">
                  <Icon
                    name="arrow-back"
                    size={Size.ICON_SMALL}
                    onPress={() => navigation.goBack()}
                  />
                  <Text variant={"primaryBold"} color="text">
                    Mes annonces
                  </Text>
                </Row>
                <Text variant="tertiary" color="text">
                  {myAllAnnonce &&
                    myAllAnnonce.length > 0 &&
                    `${myAllAnnonce.length} annonces`}
                </Text>
                <Box flex={1} width="100%" marginTop="xs">
                  <FlashList
                    keyExtractor={(item, index) => item.id.toString()}
                    estimatedItemSize={200}
                    data={myAllAnnonce}
                    renderItem={renderItemAnnonce}
                    extraData={myAllAnnonce}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                      <RefreshControl
                        refreshing={isMyAnnonceFetching}
                        onRefresh={() => refetchMyAnnonce()}
                      />
                    }
                    ListEmptyComponent={
                      <EmptyList textToShow="Vous n'avez pas encore publié d'annonce pour le moment." />
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
      </RequestConnection>
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
