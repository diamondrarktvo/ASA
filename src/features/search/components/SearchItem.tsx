import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { ImageBackground, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
} from "_shared";
import { Constantes, annonceTypes } from "_utils";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";

export default function SearchItem() {
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;

  //components
  const renderItemResult: ListRenderItem<annonceTypes> = ({ item }) => {
    return (
      <Column key={item.id} marginBottom="xs">
        <Image
          source={item.image}
          containerStyle={styles.imageAnnonce}
          PlaceholderContent={
            <ActivityIndicator color="#2652AA" style={styles.spinner} />
          }
        />
        <Icon
          name="favorite-border"
          size={Size.ICON_LARGE}
          color={colors.black}
          containerStyle={{
            position: "absolute",
            zIndex: 2,
            top: 10,
            right: 10,
          }}
        />
        <Text
          variant="secondary"
          numberOfLines={1}
          textDecorationLine={"underline"}
        >
          {item.title}
        </Text>
        <Text variant={"tertiary"} numberOfLines={1}>
          {item.description}
        </Text>
      </Column>
    );
  };

  return (
    <MainScreen typeOfScreen="tab">
      <Row alignItems="center" width="90%" justifyContent="space-between">
        <Icon
          name="arrow-back"
          size={Size.ICON_MEDIUM}
          color={colors.black}
          containerStyle={{
            marginRight: 8,
          }}
          onPress={() => navigation.goBack()}
        />
        <Input
          placeholder="Entrez le mot-clé ..."
          iconRight={{
            name: "search",
            size: 32,
            color: colors.secondary,
            onPress: () => console.log("test"),
          }}
        />
      </Row>
      <Box flexDirection="column" flex={1} alignItems="center">
        <Text variant="tertiary" color="text">
          5 résultats trouvés
        </Text>
        <Box flex={1} width="100%" marginTop="xs">
          <FlashList
            keyExtractor={(item, index) => item.id.toString()}
            estimatedItemSize={200}
            data={Constantes.DATA.annonce}
            renderItem={renderItemResult}
            extraData={Constantes.DATA.annonce}
            showsVerticalScrollIndicator={false}
          />
        </Box>
      </Box>
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
    width: 200,
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
