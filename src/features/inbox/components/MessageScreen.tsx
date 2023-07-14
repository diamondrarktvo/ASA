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
  TouchableOpacity,
} from "_shared";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";
import { messageTypes, manageMessageNavigationTypes } from "../types";

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
      <FlashList
        data={allMessages}
        renderItem={renderItemMessage}
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
