import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon, MainScreen, Text } from "_shared";

export default function MessageScreen() {
  //const navigation = useNavigation<>();

  return (
    <MainScreen typeOfScreen="stack">
      <Text variant="secondary" color="text">
        Message{" "}
      </Text>
      <Text variant="tertiary" color="text">
        Show message
      </Text>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
