import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon, MainScreen, Text } from "_shared";

export default function AnnouncerScreen() {
  //const navigation = useNavigation<>();

  return (
    <MainScreen typeOfScreen="stack">
      <Text variant="secondary">Les annonceurs favoris </Text>
      <Text variant="tertiary">Show your announcer favorite</Text>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
