//IMPORT FROM NODE
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//IMPORT LOCAL
import { TopParamList } from "./Types";
import { useTheme } from "@shopify/restyle";
import { Theme } from "_theme";
import { MessageScreen, NotificationScreen } from "_features";

//types
interface TopTabRouteTypes {
  name: keyof TopParamList;
  topLabel: string;
  component: React.FC<unknown>;
}

//routes
const TOPROUTES: TopTabRouteTypes[] = [
  {
    name: "message_screen",
    topLabel: "Messages",
    component: MessageScreen,
  },
  {
    name: "notification_screen",
    topLabel: "Notifications",
    component: NotificationScreen,
  },
];

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
