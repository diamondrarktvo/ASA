import { Alert, ScrollView, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import {
  Image,
  MainScreen,
  Row,
  Text,
  Column,
  Icon,
  TouchableOpacity,
  CheckUserConnected,
} from "_shared";
import { Size, Theme } from "_theme";
import VersionCheck from "../../version/VersionCheck";
import { AllMenu } from "./AllMenu";
import { manageProfilNavigationTypes } from "../types";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "_store";
import { removeAccount } from "../accountSlice";

export default function AccountScreen() {
  const navigation = useNavigation<manageProfilNavigationTypes>();
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const [isUserConnected, setIsUserConnected] = useState(false);
  const account = useAppSelector((state) => state.account);

  //all logics
  const handleLogout = () => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      {
        text: "Annuler",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Oui",
        onPress: () => {
          dispatch(removeAccount());
          setIsUserConnected(false);
        },
      },
    ]);
  };

  //all effects
  useFocusEffect(
    useCallback(() => {
      if (account?.token !== null) {
        setIsUserConnected(true);
        console.log("account : ");
      }
    }, []),
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainScreen
        typeOfScreen="tab"
        titleTabScreen={isUserConnected ? "Menu" : "Bonjour"}
      >
        <CheckUserConnected
          isUserConnected={isUserConnected}
          subTitleIfNotConnected="Connectez-vous pour découvrir toutes nos fonctionnalités"
        >
          {/**Profil */}
          <TouchableOpacity
            onPress={() => navigation.navigate("manage_profil")}
          >
            <Row
              borderBottomWidth={2}
              paddingBottom="s"
              marginTop="s"
              borderColor="offWhite"
              marginBottom="m"
            >
              <Image
                source={require("_images/logoASA.jpeg")}
                style={{
                  width: Size.IMAGE_SMALL,
                  height: Size.IMAGE_SMALL,
                  borderRadius: borderRadii.lg,
                }}
              />
              <Column paddingHorizontal="s" flex={2}>
                <Text variant="title" color="text">
                  {account?.user?.nickname}
                </Text>
                <Text variant="secondary" color="text">
                  Afficher le profil
                </Text>
              </Column>
              <Icon
                name="chevron-right"
                size={Size.ICON_LARGE}
                color={colors.black}
              />
            </Row>
          </TouchableOpacity>

          <AllMenu loggedOut={() => handleLogout()} />
          <VersionCheck />
        </CheckUserConnected>
      </MainScreen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
