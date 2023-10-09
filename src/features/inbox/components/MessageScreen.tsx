import { StyleSheet } from "react-native";
import { useEffect } from "react";
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
import { messageTypes, manageMessageNavigationTypes } from "../types";
import { RefreshControl } from "react-native-gesture-handler";
import { useGetAllConversationsQuery } from "../chatApi";
import { useAppDispatch, useAppSelector } from "_store";
import { removeAccount } from "../../account/accountSlice";

const allMessages: messageTypes[] = [
  {
    id: 1,
    emetteur: "Rakoto",
    read: false,
    message: "Votre commande a été livré.",
    date: "12 juil.",
  },
  {
    id: 2,
    emetteur: "Mety Amiko",
    read: false,
    message: "Votre commande a été livré.",
    date: "17 Sept 2022",
  },
];

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
    },
  );

  console.log("allConversation e: ", allConversation);

  const handleFetchError = (error: any) => {
    if (error?.data?.detail?.includes("Invalid token")) {
      return dispatch(removeAccount());
    }
  };

  //all effects
  useEffect(() => {
    handleFetchError(errorConversation);
  }, [errorConversation]);

  //components
  const renderItemMessage: ListRenderItem<messageTypes> = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("manage_message", { emetteur: item.emetteur })
        }
      >
        <Row alignItems="center" paddingVertical="xs">
          <Image
            source={require("_images/logoASA.jpeg")}
            style={{
              width: Size.IMAGE_SMALL,
              height: Size.IMAGE_SMALL,
              borderRadius: borderRadii.lg,
            }}
          />
          <Column marginLeft="xs" width="75%">
            <Row justifyContent="space-between" width="100%">
              <Text variant="primaryBold" color="text">
                {item.emetteur}
              </Text>
              {!item.read && (
                <Text
                  variant="tertiary"
                  style={{
                    backgroundColor: colors.primary,
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderRadius: borderRadii.lg,
                  }}
                  color="white"
                >
                  1
                </Text>
              )}
            </Row>
            <Row justifyContent="space-between" width="100%">
              <Text
                variant="secondary"
                color="text"
                numberOfLines={1}
                style={{ width: "65%" }}
              >
                {item.message}
              </Text>
              <Text variant="secondary" color="secondary">
                {item.date}
              </Text>
            </Row>
          </Column>
        </Row>
      </TouchableOpacity>
    );
  };

  return (
    <MainScreen typeOfScreen="stack">
      <RequestLoader
        isLoading={isConversationLoading || isConversationFetching}
      >
        <RequestError
          isError={isConversationError}
          errorStatus={errorConversation?.status}
          onRefresh={() => refetchConversation()}
        >
          <FlashList
            data={allMessages}
            renderItem={renderItemMessage}
            estimatedItemSize={200}
            extraData={allMessages}
            /* refreshControl={
          <RefreshControl
            refreshing={isConversationFetching}
            onRefresh={() => refetchConversation()}
          />
        }*/
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
