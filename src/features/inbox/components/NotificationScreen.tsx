import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon, MainScreen, Text } from "_shared";

export default function NotificationScreen() {
  //const navigation = useNavigation<>();

  return (
    <MainScreen typeOfScreen="top">
      <Text variant="primary" color="text">
        Notification{" "}
      </Text>
      <Text variant="secondary" color="text">
        Show notification
      </Text>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
