//ROUTE FOR NAVIGATION
import { RouteTypes } from "./Types";
import {
  AccountScreen,
  FavoriteScreen,
  MainScreenMessAndNotif,
  PublishScreen,
  SearchScreen,
} from "_features";

export const TABROUTES: RouteTypes[] = [
  {
    name: "search_screen",
    component: SearchScreen,
    tabLabel: "Recherche",
    icon: "search",
  },
  {
    name: "favorite_screen",
    component: FavoriteScreen,
    tabLabel: "Favorite",
    icon: "favorite",
  },
  {
    name: "publish_screen",
    component: PublishScreen,
    tabLabel: "Publier",
    icon: "public",
  },
  {
    name: "message_and_notification_screen",
    component: MainScreenMessAndNotif,
    tabLabel: "MessageNotif",
    icon: "chat-bubble",
  },
  {
    name: "account_screen",
    component: AccountScreen,
    tabLabel: "Compte",
    icon: "person",
  },
];
