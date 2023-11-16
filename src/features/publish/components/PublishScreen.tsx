import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MainScreen, RequestConnection } from "_shared";
import StepOne from "./addPublishStep/stepOne";

export default function PublishScreen() {
  //const navigation = useNavigation<>();

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Publication">
      <RequestConnection>
        <StepOne />
      </RequestConnection>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
