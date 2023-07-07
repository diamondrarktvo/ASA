import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon, MainScreen, Text } from "_shared";

export default function AnnouncementScreen() {
  //const navigation = useNavigation<>();

  return (
    <MainScreen typeOfScreen="stack">
      <Text variant="secondary">Les annonces favoris </Text>
      <Text variant="tertiary">Show your announces favorite</Text>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
