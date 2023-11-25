import { Row, Text, TouchableOpacity } from "_shared";
import { UnitItemSectionLink } from "./UnitItemSectionLink";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  favoriteNavigationTypes,
  PersonnalInformationNavigationTypes,
} from "../types";
import { useAppSelector } from "_store";

type Props = {
  is_account_connected: boolean;
  action?: () => void;
};

export const AllMenu = ({ is_account_connected, action }: Props) => {
  const navigation = useNavigation();

  return (
    <>
      {/**Actions */}
      {is_account_connected ? (
        <>
          <Row marginVertical="s">
            <Text variant="bigTitle" color="text">
              Actions
            </Text>
          </Row>
          <UnitItemSectionLink
            iconLeft="campaign"
            label="Mes annonces"
            onPress={() => navigation.navigate("my_annouce_screen")}
          />
          <UnitItemSectionLink
            iconLeft="favorite"
            label="Favoris"
            onPress={() =>
              navigation.navigate("main_tab", { screen: "favorite_screen" })
            }
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
            label="Mon profil"
            onPress={() => navigation.navigate("personnal_information")}
          />

          {/**Parametre */}
          <Row marginTop="m">
            <Text variant="bigTitle" color="text">
              Paramètre
            </Text>
          </Row>

          <UnitItemSectionLink
            iconLeft="payment"
            label="Payement"
            onPress={() => navigation.navigate("manage_payment")}
          />
          <UnitItemSectionLink
            iconLeft="online-prediction"
            label="Connection"
            onPress={() => Alert.alert("Menu cliqué!")}
          />
          <Row marginTop="l">
            <TouchableOpacity onPress={action}>
              <Text variant="link" color="text">
                {is_account_connected ? "Deconnexion" : "Connexion"}
              </Text>
            </TouchableOpacity>
          </Row>
        </>
      ) : (
        <>
          {/**Assistance */}
          <Row marginTop="m">
            <Text variant="bigTitle" color="text">
              Assistance
            </Text>
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
          <Row marginTop="l">
            <TouchableOpacity onPress={action}>
              <Text variant="link" color="text">
                Connexion
              </Text>
            </TouchableOpacity>
          </Row>
        </>
      )}
    </>
  );
};
