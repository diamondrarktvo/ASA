//IMPORT FROM NODE
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//IMPORT LOCAL
import { TopParamList } from "./Types";
import { TOPROUTES } from "_utils";
import { useTheme } from "@shopify/restyle";
import { Theme } from "_theme";

const Top = createMaterialTopTabNavigator<TopParamList>();

const TopNavigation = () => {
  const theme = useTheme<Theme>();
  const { primary } = theme.colors;
  return (
    <Top.Navigator
      initialRouteName="message_screen"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: primary,
        },
      }}
    >
      {TOPROUTES.map((route) => (
        <Top.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            title: route.topLabel,
          }}
        />
      ))}
    </Top.Navigator>
  );
};

export default TopNavigation;
