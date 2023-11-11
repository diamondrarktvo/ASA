import { StyleSheet } from "react-native";
import { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Icon,
  MainScreen,
  Text,
  Box,
  Row,
  Image,
  Column,
  TouchableOpacity,
  EmptyList,
  RequestError,
  RequestLoader,
} from "_shared";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";
import { manageMessageNavigationTypes, conversationTypes } from "../types";
import { RefreshControl } from "react-native-gesture-handler";
import { useGetAllConversationsQuery } from "../chatApi";
import { useAppDispatch, useAppSelector } from "_store";
import { removeAccount } from "../../account/accountSlice";
import { formatDate, removeDataToAsyncStorage } from "_utils";

export default function MessageScreen() {
  const navigation = useNavigation<manageMessageNavigationTypes>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const accountUser = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const {
    data: allConversation,
    isError: isConversationError,
    isLoading: isConversationLoading,
    isFetching: isConversationFetching,
    refetch: refetchConversation,
    error: errorConversation,
  } = useGetAllConversationsQuery(
    accountUser.token ? accountUser.token : undefined,
    {
      skip: !accountUser.token,
      pollingInterval: 2000,
    },
  );

  const handleFetchError = (error: any) => {
    if (error?.data?.detail?.includes("Invalid token")) {
      removeDataToAsyncStorage("token");
      removeDataToAsyncStorage("current_account");
      return dispatch(removeAccount());
    }
  };

  //all effects
  useEffect(() => {
    handleFetchError(errorConversation);
  }, [errorConversation]);

  //components
  const renderItemMessage: ListRenderItem<conversationTypes> = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("manage_message", {
            emetteur: {
              nickName: item.participants[0].nickname,
              id_seller: item.participants[0].id,
              id_conversation: item.id,
            },
          })
        }
      >
        <Row alignItems="center" paddingVertical="xs">
          <Image
            source={
              item.participants[0]?.image
                ? { uri: item.participants[0].image }
                : require("_images/logoASA.jpeg")
            }
            style={{
              width: Size.IMAGE_SMALL,
              height: Size.IMAGE_SMALL,
              borderRadius: borderRadii.lg,
            }}
          />
          <Column marginLeft="xs" width="75%">
            <Row justifyContent="space-between" width="100%">
              <Text variant="primaryBold" color="text">
                {item.participants[0].nickname}
              </Text>
            </Row>
            <Row justifyContent="space-between" width="100%">
              <Text
                variant="secondary"
                color="text"
                numberOfLines={1}
                style={{ width: "65%" }}
              >
                {item.latest_message?.text || "Commencez à discuter"}
              </Text>
              <Text variant="secondary" color="secondary">
                {item.latest_message &&
                  formatDate(item.latest_message.createAt)}
              </Text>
            </Row>
          </Column>
        </Row>
      </TouchableOpacity>
    );
  };

  return (
    <MainScreen typeOfScreen="stack">
      <RequestLoader isLoading={isConversationLoading}>
        <RequestError
          isError={isConversationError}
          errorStatus={errorConversation?.status}
          onRefresh={() => refetchConversation()}
        >
          <FlashList
            data={allConversation}
            renderItem={renderItemMessage}
            estimatedItemSize={200}
            extraData={allConversation}
            refreshControl={
              <RefreshControl
                refreshing={isConversationLoading}
                onRefresh={() => refetchConversation()}
              />
            }
            ListEmptyComponent={
              <EmptyList textToShow="Vous n'avez aucun message." />
            }
          />
        </RequestError>
      </RequestLoader>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
