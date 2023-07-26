import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Icon, MainScreen, Text } from "_shared";
import StepOne from "./addPublishStep/stepOne";

export default function PublishScreen() {
  //const navigation = useNavigation<>();

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Publication">
      <StepOne />
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
