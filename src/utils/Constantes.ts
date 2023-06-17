//ROUTE FOR NAVIGATION
import { TabRouteTypes, TopTabRouteTypes } from "./Types";
import {
  AccountScreen,
  FavoriteScreen,
  MainScreenMessAndNotif,
  MessageScreen,
  NotificationScreen,
  PublishScreen,
  SearchScreen,
} from "_features";
import { TopNavigation } from "_navigations";

export const TABROUTES: TabRouteTypes[] = [
  {
    name: "search_screen",
    component: SearchScreen,
    tabLabel: "Recherche",
    icon: "search",
  },
  {
    name: "favorite_screen",
    component: FavoriteScreen,
    tabLabel: "Favoris",
    icon: "favorite-border",
  },
  {
    name: "publish_screen",
    component: PublishScreen,
    tabLabel: "Publier",
    icon: "public",
  },
  {
    name: "inbox_screen",
    component: TopNavigation,
    tabLabel: "Boite de réception",
    icon: "chat-bubble-outline",
  },
  {
    name: "account_screen",
    component: AccountScreen,
    tabLabel: "Menu",
    icon: "person-outline",
  },
];

export const TOPROUTES: TopTabRouteTypes[] = [
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
