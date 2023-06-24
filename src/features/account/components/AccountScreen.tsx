import { Alert, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import {
  Image,
  MainScreen,
  Row,
  Text,
  Column,
  Icon,
  TouchableOpacity,
} from "_shared";
import { Size, Theme } from "_theme";
import { UnitItemSectionLink } from "./UnitItemSectionLink";
import VersionCheck from "../../version/VersionCheck";
import { AllMenu } from "./AllMenu";
import { useState } from "react";

export default function AccountScreen() {
  //const navigation = useNavigation<>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const [isUserConnected, setIsUserConnected] = useState(true);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainScreen
        typeOfScreen="tab"
        titleTabScreen={isUserConnected ? "Menu" : "Votre profil"}
      >
        {/**Profil */}
        {isUserConnected ? (
          <TouchableOpacity onPress={() => Alert.alert("Affichage du profile")}>
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
                <Text variant="title">Mety Amiko</Text>
                <Text variant="secondary">Afficher le profil</Text>
              </Column>
              <Icon
                name="chevron-right"
                size={Size.ICON_LARGE}
                color={colors.black}
              />
            </Row>
          </TouchableOpacity>
        ) : (
          <Row marginBottom="s">
            <Text variant="title" color="secondary">
              Connectez-vous pour commencer à exploiter notre produit
            </Text>
          </Row>
        )}

        <AllMenu
          isUserConnected={isUserConnected}
          loggedIn={() => setIsUserConnected(true)}
          loggedOut={() => setIsUserConnected(false)}
        />

        <VersionCheck />
      </MainScreen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
