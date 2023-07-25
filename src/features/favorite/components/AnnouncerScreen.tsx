import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Column,
  EmptyList,
  Icon,
  Image,
  MainScreen,
  Row,
  Text,
} from "_shared";
import { ActivityIndicator } from "react-native-paper";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Constantes, announcerTypes } from "_utils";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";

export default function AnnouncerScreen() {
  //const navigation = useNavigation<>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;

  //components
  const renderItemAnnouncer: ListRenderItem<announcerTypes> = ({ item }) => {
    return (
      <Row key={item.id} marginBottom="s" width={"100%"}>
        <Image
          source={item.image}
          containerStyle={styles.imageProfil}
          PlaceholderContent={
            <ActivityIndicator color="#2652AA" style={styles.spinner} />
          }
        />
        <Column marginLeft="s">
          <Text
            variant="secondary"
            numberOfLines={1}
            textDecorationLine={"underline"}
          >
            {item.name}
          </Text>
          <Text variant={"tertiary"} numberOfLines={1}>
            {item.phoneNumber}
          </Text>
        </Column>
        <Icon
          name="favorite-border"
          size={Size.ICON_MEDIUM}
          color={colors.error}
          containerStyle={{
            position: "absolute",
            zIndex: 2,
            top: 10,
            right: 10,
          }}
        />
      </Row>
    );
  };

  return (
    <MainScreen typeOfScreen="stack">
      <Box flexDirection={"column"} flex={1}>
        <FlashList
          keyExtractor={(item, index) => item.id.toString()}
          estimatedItemSize={200}
          data={Constantes.DATA.announcer}
          renderItem={renderItemAnnouncer}
          extraData={Constantes.DATA.announcer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyList textToShow="Vous n'avez pas de vendeur en favoris" />
          }
        />
      </Box>
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
