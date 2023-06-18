//ROUTE FOR NAVIGATION
import React from "react";
import { TabParamList } from "./Types";
import {
  AccountScreen,
  FavoriteScreen,
  PublishScreen,
  SearchScreen,
} from "_features";
import TopNavigation from "./TopTabsNavigator";

//types
export interface TabRouteTypes {
  name: keyof TabParamList;
  component: React.FC<unknown>;
  tabLabel: string;
  icon: string;
}

//all tab routes
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
