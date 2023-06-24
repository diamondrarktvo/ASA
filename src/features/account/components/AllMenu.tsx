import { Button, Row, Text, TouchableOpacity } from "_shared";
import { Size, Theme } from "_theme";
import { UnitItemSectionLink } from "./UnitItemSectionLink";
import { Alert } from "react-native";
import { useTheme } from "@shopify/restyle";

type Props = {
  isUserConnected: boolean;
  loggedIn?: () => void;
  loggedOut?: () => void;
};

export const AllMenu = ({ isUserConnected, loggedIn, loggedOut }: Props) => {
  return isUserConnected ? (
    <>
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
      <Row marginTop="l">
        <TouchableOpacity onPress={loggedOut}>
          <Text variant="link">Deconnexion</Text>
        </TouchableOpacity>
      </Row>
    </>
  ) : (
    <>
      <Button label="Connexion" onPress={loggedIn} />
      <Row marginVertical="s">
        <Text variant="tertiary">Vous n'avez pas de compte ?</Text>
        <TouchableOpacity>
          <Text variant="link">Inscription</Text>
        </TouchableOpacity>
      </Row>
    </>
  );
};
