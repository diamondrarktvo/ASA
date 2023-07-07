import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@shopify/restyle";

//IMPORT LOCAL
import { MainScreen, Text } from "_shared";
import { Size, Theme } from "_theme";
import { TopParamListFavourite } from "_navigations";
import AnnouncementScreen from "./AnnouncementScreen";
import AnnouncerScreen from "./AnnouncerScreen";

//top navigation is here because we only need it here
//types
interface TopTabRouteTypes {
  name: keyof TopParamListFavourite;
  topLabel: string;
  component: React.FC<unknown>;
}

//routes
const TOPROUTES: TopTabRouteTypes[] = [
  {
    name: "announcement_screen",
    topLabel: "Annonces",
    component: AnnouncementScreen,
  },
  {
    name: "announcer_screen",
    topLabel: "Annonceurs",
    component: AnnouncerScreen,
  },
];

const Top = createMaterialTopTabNavigator<TopParamListFavourite>();

const TopNavigation = () => {
  const theme = useTheme<Theme>();
  const { primary, mainBackground, mainForeground } = theme.colors;
  return (
    <Top.Navigator
      initialRouteName="announcement_screen"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: primary,
        },
        tabBarStyle: {
          backgroundColor: mainBackground,
        },
        tabBarLabelStyle: {
          color: mainForeground,
          textTransform: "capitalize",
          fontSize: Size.TYPO.secondary,
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

export default function FavoriteScreen() {
  //const navigation = useNavigation<>();

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Favoris">
      <TopNavigation />
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
