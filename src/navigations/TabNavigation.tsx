//IMPORT FROM NODE_MODULES
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { styles } from "./styles";
//import { Text } from "react-native";

//LOCAL IMPORT
import { TabParamList } from "./Types";
import { Icon } from "_shared";
import { TABROUTES } from "_utils";
import { useTheme } from "@shopify/restyle";
import { Theme } from "_theme";

//IMPORT SCREEN

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigation = () => {
  const theme = useTheme<Theme>();
  const { secondary, primary, mainForeground } = theme.colors;
  return (
    <Tab.Navigator
      initialRouteName="search_screen"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: [styles.barNavigation, { backgroundColor: secondary }],
      }}
    >
      {TABROUTES.map((route) => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            tabBarActiveTintColor: primary,
            tabBarInactiveTintColor: mainForeground,
            /*tabBarLabel: ({ focused }) =>
              focused ? (
                <Text style={{ color: "white" }}>{route.tabLabel}</Text>
              ) : (
                ""
              ),*/
            tabBarIcon: ({ focused, color }) => (
              <Icon name={route.icon} color={color} size={focused ? 32 : 22} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
