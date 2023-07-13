import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon, MainScreen, Text, Box, Row, Image, Column } from "_shared";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";
import { notificationTypes } from "../types";

const allNotifications: notificationTypes[] = [
  {
    id: 1,
    notifieur: "Rakoto",
    read: false,
    information: "A publié une annonce",
    date: "il y a 2 secondes",
  },
  {
    id: 2,
    notifieur: "Mety Amiko",
    read: true,
    information: "A publié une annonce",
    date: "Le 17 Sept 2022",
  },
];

export default function NotificationScreen() {
  //const navigation = useNavigation<>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;

  const renderItemNotification: ListRenderItem<notificationTypes> = ({
    item,
  }) => {
    return (
      <Row
        alignItems="center"
        paddingVertical="xs"
        paddingHorizontal="s"
        backgroundColor={item.read ? "white" : "offWhite"}
      >
        <Image
          source={require("_images/logoASA.jpeg")}
          style={{
            width: Size.IMAGE_SMALL,
            height: Size.IMAGE_SMALL,
            borderRadius: borderRadii.lg,
          }}
        />
        <Column marginLeft="xs" width="75%">
          <Text variant="primaryBold" color="text">
            {item.notifieur}
          </Text>
          <Text variant="secondary" color="text">
            {item.information}
          </Text>
          <Text variant="secondary" color="secondary">
            {item.date}
          </Text>
        </Column>
      </Row>
    );
  };

  return (
    <MainScreen typeOfScreen="stack" paddingHorizontal="none">
      <FlashList
        data={allNotifications}
        renderItem={renderItemNotification}
        estimatedItemSize={200}
        ListEmptyComponent={
          <Box>
            <Text variant={"bigTitle"} color="text">
              Vous n'avez aucun message non lu.
            </Text>
            <Text variant={"primary"} color="text">
              Lorsque vous communiquez avec un annonceurs, les messages
              apparaissent ici.
            </Text>
          </Box>
        }
      />
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
