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
  HeaderStackNavNormal,
} from "_shared";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";

export default function ManageMessageScreen() {
  //const navigation = useNavigation<>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;

  return (
    <MainScreen typeOfScreen="stack">
      <HeaderStackNavNormal
        title="Rakoto"
        subTitle="Délai de réponse : 5 heures"
        iconRight="more-vert"
        iconRightOnPress={() => console.log("test option header")}
      />
      <Text>All message here</Text>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
