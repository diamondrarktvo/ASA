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
  RequestLoader,
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
  const accountUser = useAppSelector((state) => state.account);
  const [loading, setLoading] = useState(false);

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
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            dispatch(removeAccount());
          }, 2000);
        },
      },
    ]);
  };

  //all effects

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainScreen
        typeOfScreen="tab"
        titleTabScreen={accountUser.is_account_connected ? "Menu" : "Bonjour"}
      >
        <RequestLoader isLoading={loading}>
          <CheckUserConnected subTitleIfNotConnected="Connectez-vous pour découvrir toutes nos fonctionnalités">
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
                {accountUser.is_account_connected ? (
                  <>
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
                        {accountUser?.user?.nickname}
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
                  </>
                ) : (
                  <Text variant={"secondary"}>
                    Vous n'êtes pas connectez. Veuillez vous connectez !
                  </Text>
                )}
              </Row>
            </TouchableOpacity>

            <AllMenu loggedOut={() => handleLogout()} />
            <VersionCheck />
          </CheckUserConnected>
        </RequestLoader>
      </MainScreen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
