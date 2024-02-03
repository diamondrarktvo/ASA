import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@shopify/restyle";

//IMPORT LOCAL
import {
  CheckUserConnected,
  MainScreen,
  RequestConnection,
  Text,
} from "_shared";
import { Size, Theme } from "_theme";
import { TopParamListFavourite } from "_navigations";
import AnnouncementScreen from "./AnnouncementScreen";
import AnnouncerScreen from "./AnnouncerScreen";
import SearchFavouriteScreen from "./SearchFavouriteScreen";
import { useAppSelector } from "_store";

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
    topLabel: "Annonce",
    component: AnnouncementScreen,
  },
  {
    name: "announcer_screen",
    topLabel: "Vendeur",
    component: AnnouncerScreen,
  },
  {
    name: "search_favourite_screen",
    topLabel: "Recherche",
    component: SearchFavouriteScreen,
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
  const isUserConnected = useAppSelector(
    (state) => state.account.is_account_connected,
  );
  const [userMustLogin, setUserMustLogin] = useState<boolean>(!isUserConnected);

  //effect
  useEffect(() => {
    setUserMustLogin(!isUserConnected);
  }, [isUserConnected]);

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Favoris">
      <RequestConnection>
        <CheckUserConnected
          userMustLogin={userMustLogin}
          setUserMustLogin={setUserMustLogin}
          subTitleIfNotConnected="Connectez-vous pour découvrir toutes nos fonctionnalités"
          needCancelButton={false}
        >
          <TopNavigation />
        </CheckUserConnected>
      </RequestConnection>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
