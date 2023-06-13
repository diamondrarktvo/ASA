//IMPORT FROM NODE_MODULES
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { lightTheme } from "_theme";
//import { Text } from "react-native";

//LOCAL IMPORT
import { TabParamList } from "./Types";
import { Icon } from "_shared";
import { TABROUTES } from "_utils";

//IMPORT SCREEN

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="home_screen"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false
      }}
    >
      {TABROUTES.map((route) => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            tabBarActiveTintColor: lightTheme.colors.primary,
            tabBarInactiveTintColor: lightTheme.colors.black,
            /*tabBarLabel: ({ focused }) =>
              focused ? (
                <Text style={{ color: "white" }}>{route.tabLabel}</Text>
              ) : (
                ""
              ),*/
            tabBarIcon: ({ focused, color }) => (
              <Icon name={route.icon} color={color} size={focused ? 30 : 25} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
