import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@shopify/restyle";

//IMPORT LOCAL
import { MainScreen, Text } from "_shared";
import { Theme } from "_theme";
import { TopParamList } from "_navigations";
import MessageScreen from "./MessageScreen";
import NotificationScreen from "./NotificationScreen";

//top navigation is here because we only need it here
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
        tabBarGap: 0,
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

export default function InboxScreen() {
  //const navigation = useNavigation<>();

  return (
    <MainScreen
      typeOfScreen="tab"
      titleTabScreen="Boite de réception"
      paddingHorizontal="none"
    >
      <TopNavigation />
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
