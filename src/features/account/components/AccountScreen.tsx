import { Alert, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { Image, MainScreen, Row, Text, Column, Icon } from "_shared";
import { Size, Theme } from "_theme";
import { UnitItemSectionLink } from "./UnitItemSectionLink";
import VersionCheck from "../../version/VersionCheck";

export default function AccountScreen() {
  //const navigation = useNavigation<>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainScreen typeOfScreen="tab" titleTabScreen="Menu">
        {/**Profil */}
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => Alert.alert("Affichage du profile")}
        >
          <Row
            borderBottomWidth={2}
            paddingBottom="s"
            marginTop="s"
            borderColor="secondary"
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

        {/**Actions */}
        <Row marginVertical="s">
          <Text variant="bigTitle">Actions</Text>
        </Row>
        <UnitItemSectionLink
          iconLeft="campaign"
          label="Mes annonces"
          onPress={() => Alert.alert("Menu cliqué!")}
        />
        <UnitItemSectionLink
          iconLeft="favorite"
          label="Favoris"
          onPress={() => Alert.alert("Menu cliqué!")}
        />
        <UnitItemSectionLink
          iconLeft="redeem"
          label="Colis"
          onPress={() => Alert.alert("Menu cliqué!")}
        />
        <UnitItemSectionLink
          iconLeft="trending-up"
          label="Transaction"
          onPress={() => Alert.alert("Menu cliqué!")}
        />
        <UnitItemSectionLink
          iconLeft="person-outline"
          label="Informations personnelles"
          onPress={() => Alert.alert("Menu cliqué!")}
        />

        {/**Parametre */}
        <Row marginTop="m">
          <Text variant="bigTitle">Paramètre</Text>
        </Row>

        <UnitItemSectionLink
          iconLeft="payment"
          label="Payement"
          onPress={() => Alert.alert("Menu cliqué!")}
        />
        <UnitItemSectionLink
          iconLeft="online-prediction"
          label="Connection"
          onPress={() => Alert.alert("Menu cliqué!")}
        />

        {/**Assistance */}
        <Row marginTop="m">
          <Text variant="bigTitle">Assistance</Text>
        </Row>

        <UnitItemSectionLink
          iconLeft="help"
          label="Centre d'aide"
          onPress={() => Alert.alert("Menu cliqué!")}
        />
        <UnitItemSectionLink
          iconLeft="menu-book"
          label="Les conditions"
          onPress={() => Alert.alert("Menu cliqué!")}
        />

        <Row marginTop="l" marginBottom="s">
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => Alert.alert("Merci pour votre visite!")}
          >
            <Text variant="secondary" textDecorationLine={"underline"}>
              Deconnexion
            </Text>
          </TouchableOpacity>
        </Row>
        <VersionCheck />
      </MainScreen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
