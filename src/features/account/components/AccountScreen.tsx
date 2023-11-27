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
  RequestConnection,
} from "_shared";
import { Size, Theme } from "_theme";
import VersionCheck from "../../version/VersionCheck";
import { AllMenu } from "./AllMenu";
import { manageProfilNavigationTypes } from "../types";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "_store";
import { removeAccount, setAccount, setInformationUser } from "../accountSlice";
import {
  removeDataToAsyncStorage,
  storeObjectDataToAsyncStorage,
} from "_utils";
import { RefreshControl } from "react-native-gesture-handler";
import { useGetUserQuery } from "../authApi";

export default function AccountScreen() {
  const navigation = useNavigation<manageProfilNavigationTypes>();
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const [userMustLogin, setUserMustLogin] = useState<boolean>(false);
  const accountUser = useAppSelector((state) => state.account);
  const [loading, setLoading] = useState(false);

  const {
    data: userInfo,
    isError: isErrorUserInfo,
    isLoading: isUserInfoLoading,
    isFetching: isUserInfoFetching,
    refetch: refetchUserInfo,
    error: errorUserInfo,
  } = useGetUserQuery(
    { token: accountUser.token, id: accountUser.user.id },
    {
      skip: !accountUser.token || !accountUser.user.id,
    },
  );

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
            removeDataToAsyncStorage("token");
            removeDataToAsyncStorage("current_account");
          }, 2000);
        },
      },
    ]);
  };

  const handleRefreshUserInfo = () => {
    refetchUserInfo();
    console.log("refreshing", userInfo);
    dispatch(setInformationUser(userInfo));
    storeObjectDataToAsyncStorage("current_account", userInfo);
  };

  //all effects

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isUserInfoLoading}
          onRefresh={() => handleRefreshUserInfo()}
        />
      }
    >
      <MainScreen
        typeOfScreen="tab"
        titleTabScreen={accountUser.is_account_connected ? "Menu" : "Bonjour"}
      >
        <RequestLoader
          isLoading={loading || isUserInfoLoading || isUserInfoFetching}
        >
          <CheckUserConnected
            userMustLogin={userMustLogin}
            setUserMustLogin={setUserMustLogin}
            subTitleIfNotConnected="Connectez-vous pour découvrir toutes nos fonctionnalités"
          >
            <RequestConnection>
              {/**Profil */}
              <TouchableOpacity
                onPress={() =>
                  accountUser.is_account_connected
                    ? navigation.navigate("manage_profil")
                    : setUserMustLogin(true)
                }
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
                        source={
                          accountUser?.user?.image
                            ? { uri: accountUser.user.image }
                            : require("_images/logoASA.jpeg")
                        }
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
                      Vous n'êtes pas connecté. Cliquez ici pour vous connecter
                      !
                    </Text>
                  )}
                </Row>
              </TouchableOpacity>

              <AllMenu
                is_account_connected={accountUser.is_account_connected}
                action={() =>
                  accountUser.is_account_connected
                    ? handleLogout()
                    : setUserMustLogin(true)
                }
              />
              <VersionCheck />
            </RequestConnection>
          </CheckUserConnected>
        </RequestLoader>
      </MainScreen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
