import { useState } from "react";
import {
  Box,
  Button,
  Column,
  Icon,
  Input,
  MainScreen,
  Row,
  Text,
  TouchableOpacity,
} from "_shared";
import { useTheme } from "@shopify/restyle";
import { Theme, Size } from "_theme";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CreateAccountScreen = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const { primary, secondary, white } = theme.colors;

  return (
    <MainScreen typeOfScreen="stack">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingVertical="m" backgroundColor="mainBackground">
          <Box>
            <Text variant="headerNavigation" color="text">
              Bienvenue
            </Text>
            <Row marginBottom="s">
              <Text variant="title" color="secondary">
                Remplissez les informations suivantes afin de creer votre compte
                sur notre application Mety Amiko.
              </Text>
            </Row>
            <Column>
              <Input placeholder="Prénom usuel*" />
              <Input placeholder="Numéro téléphone*" />
              <Input placeholder="Adresse*" />
              <Input placeholder="Type de compte (à choisir)*" />
              <Input placeholder="Email*" />
              <Input
                placeholder="Mot de passe*"
                iconRight={{
                  name: hidePassword ? "visibility" : "visibility-off",
                  size: 32,
                  color: secondary,
                  onPress: () => setHidePassword(!hidePassword),
                }}
              />
              <Input
                placeholder="Confirmer mot de passe*"
                iconRight={{
                  name: hideConfirmPassword ? "visibility" : "visibility-off",
                  size: 32,
                  color: secondary,
                  onPress: () => setHideConfirmPassword(!hideConfirmPassword),
                }}
              />
            </Column>
            <Button
              variant={"primary"}
              label="Creer mon compte"
              onPress={() => navigation.goBack()}
            />
          </Box>
          <Row
            alignItems="center"
            padding="s"
            backgroundColor="offWhite"
            justifyContent="space-between"
            borderRadius="xs"
            marginTop="xs"
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={Size.ICON_LARGE} color={primary} />
            </TouchableOpacity>
            <Text variant="primaryBold" color="text">
              Se connecter
            </Text>
          </Row>
        </Box>
      </ScrollView>
    </MainScreen>
  );
};

export default CreateAccountScreen;
