import { StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { MainScreen, Text, Box, HeaderStackNavNormal } from "_shared";
import { StackParamList } from "src/navigations/Types";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";

export default function ManageMessageScreen() {
  //const navigation = useNavigation<>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const { emetteur } =
    useRoute<RouteProp<StackParamList, "manage_message">>()?.params;

  return (
    <MainScreen typeOfScreen="stack">
      <HeaderStackNavNormal
        title={emetteur}
        subTitle="Délai de réponse : 5 heures"
        iconRight="more-vert"
        iconRightOnPress={() => console.log("test option header")}
      />
      <Box flex={1} justifyContent={"center"} alignItems="center">
        <Text variant="primary">
          Vos messages avec {emetteur} apparaissent ici.
        </Text>
      </Box>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
