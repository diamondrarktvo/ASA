import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Icon,
  MainScreen,
  Text,
  Box,
  Row,
  Image,
  Column,
  RequestLoader,
  RequestError,
  EmptyList,
} from "_shared";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";
import { notificationResponseType } from "../types";
import { useGetAllNotificationQuery } from "../inboxApi";
import { useAppSelector } from "_store";
import { formatDateToString } from "_utils";
import { RefreshControl } from "react-native-gesture-handler";

export default function NotificationScreen() {
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const token = useAppSelector((state) => state.account.token);

  const {
    data: allNotification,
    isError: isErrorNotification,
    isLoading: isNotificationLoading,
    isFetching: isNotificationFetching,
    refetch: refetchNotificationSeller,
    error: errorNotification,
  } = useGetAllNotificationQuery(token, {
    skip: !token,
  });

  //all render
  const renderItemNotification: ListRenderItem<notificationResponseType> = ({
    item,
  }) => {
    return (
      <Row
        alignItems="center"
        paddingVertical="xs"
        paddingHorizontal="s"
        backgroundColor={item.is_read ? "white" : "offWhite"}
      >
        <Image
          source={
            item.user_action.image
              ? { uri: item.user_action.image }
              : require("_images/logoASA.jpeg")
          }
          style={{
            width: Size.IMAGE_SMALL,
            height: Size.IMAGE_SMALL,
            borderRadius: borderRadii.lg,
          }}
        />
        <Column marginLeft="xs" width="75%">
          <Text variant="secondary" color="text">
            <Text variant="primaryBold" color="text">
              {item.user_action.nickname}{" "}
            </Text>
            {item.content}
          </Text>
          <Text variant="secondary" color="secondary">
            {formatDateToString(item.timestamp)}
          </Text>
        </Column>
      </Row>
    );
  };

  return (
    <MainScreen typeOfScreen="stack" paddingHorizontal="none">
      <RequestLoader
        isLoading={isNotificationLoading || isNotificationFetching}
      >
        <RequestError
          isError={isErrorNotification}
          errorStatus={errorNotification?.status}
          onRefresh={() => refetchNotificationSeller()}
        >
          <FlashList
            data={allNotification}
            extraData={allNotification}
            renderItem={renderItemNotification}
            estimatedItemSize={200}
            refreshControl={
              <RefreshControl
                refreshing={isNotificationFetching}
                onRefresh={() => refetchNotificationSeller()}
              />
            }
            ListEmptyComponent={
              <EmptyList textToShow="Vous n'avez aucune notification." />
            }
          />
        </RequestError>
      </RequestLoader>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
