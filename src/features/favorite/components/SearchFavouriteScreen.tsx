import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, EmptyList, Icon, MainScreen, Row, Text } from "_shared";
import { ActivityIndicator } from "react-native-paper";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Constantes, searchTypes } from "_utils";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";

export default function SearchFavouriteScreen() {
  //const navigation = useNavigation<>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;

  //components
  const renderItemAnnouncer: ListRenderItem<searchTypes> = ({ item }) => {
    return (
      <Row key={item.id} marginBottom="s" width={"100%"}>
        <Icon name="search" size={Size.ICON_MEDIUM} color={colors.black} />
        <Box flexDirection={"row"} flex={2} marginLeft={"xs"}>
          <Text variant="secondary" numberOfLines={1}>
            {item.searchValue}
          </Text>
        </Box>
        <Icon name="close" size={Size.ICON_MEDIUM} color={colors.black} />
      </Row>
    );
  };

  return (
    <MainScreen typeOfScreen="stack">
      <Text
        variant="secondary"
        color="blue"
        textAlign={"center"}
        marginBottom={"m"}
      >
        Vos précédents recherches :{" "}
      </Text>
      <Box flexDirection={"column"} flex={1}>
        <FlashList
          keyExtractor={(item, index) => item.id.toString()}
          estimatedItemSize={200}
          data={Constantes.DATA.search}
          renderItem={renderItemAnnouncer}
          extraData={Constantes.DATA.search}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyList textToShow="Vous n'avez pas de recherche en favoris" />
          }
        />
      </Box>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
