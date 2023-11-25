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
  MyAnnounceScreen,
  PersonnalInformation,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSix,
  StepSeven,
  SearchItem,
  ManagePayment,
  ProductDetailScreen,
} from "_features";

const Stack = createStackNavigator<StackParamList>();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"main_tab"}>
        <Stack.Group
          screenOptions={stackNavigationConfig.screenOptionsForHiddenHeader}
        >
          <Stack.Screen name={"main_tab"} component={TabNavigation} />
          {/**Account screen */}
          <Stack.Screen name={"manage_profil"} component={ManageProfil} />

          <Stack.Screen
            name={"personnal_information"}
            component={PersonnalInformation}
          />
          <Stack.Screen
            name={"my_annouce_screen"}
            component={MyAnnounceScreen}
          />
          <Stack.Screen
            name={"create_account_screen"}
            component={CreateAccountScreen}
          />
          <Stack.Screen name={"manage_payment"} component={ManagePayment} />
          {/**Inbox screen */}
          <Stack.Screen
            name={"manage_message"}
            component={ManageMessageScreen}
          />

          {/**Search item */}
          <Stack.Screen name={"search_item"} component={SearchItem} />
          <Stack.Screen
            name={"product_detail_screen"}
            component={ProductDetailScreen}
          />
        </Stack.Group>

        {/**Stepper screens */}
        <Stack.Group
          screenOptions={
            stackNavigationConfig.screenOptionsForCustomHiddenHeader
          }
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
