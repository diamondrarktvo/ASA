//IMPORT FROM NODE_MODULES
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//LOCAL IMPORT
import { stackNavigationConfig } from "./configStack";
import { StackParamList } from "./Types";

//IMPORT NAVIGATION TAB
import TabNavigation from "./TabNavigation";

//IMPORT SCREEN
import {
  ManageProfil,
  ManageMessageScreen,
  CreateAccountScreen,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSix,
  StepSeven,
} from "_features";

const Stack = createStackNavigator<StackParamList>();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"main_tabs"}>
        <Stack.Group
          screenOptions={stackNavigationConfig.screenOptionsForHiddenHeader}
        >
          <Stack.Screen name={"main_tabs"} component={TabNavigation} />
          {/**Account screen */}
          <Stack.Screen name={"manage_profil"} component={ManageProfil} />
          <Stack.Screen
            name={"create_account_screen"}
            component={CreateAccountScreen}
          />
          {/**Inbox screen */}
          <Stack.Screen
            name={"manage_message"}
            component={ManageMessageScreen}
          />
        </Stack.Group>

        {/**Stepper screens */}
        <Stack.Group
          screenOptions={stackNavigationConfig.screenOptionsForDisplayedHeader}
        >
          <Stack.Screen name={"stepper_screen_2"} component={StepTwo} />
          <Stack.Screen name={"stepper_screen_3"} component={StepThree} />
          <Stack.Screen name={"stepper_screen_4"} component={StepFour} />
          <Stack.Screen name={"stepper_screen_5"} component={StepFive} />
          <Stack.Screen name={"stepper_screen_6"} component={StepSix} />
          <Stack.Screen name={"stepper_screen_7"} component={StepSeven} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
