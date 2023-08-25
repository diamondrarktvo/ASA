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
import { RadioButton } from "react-native-paper";

const CreateAccountScreen = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [isThePasswordSame, setIsThePasswordSame] = useState(false);
  const [checked, setChecked] = useState("yes");
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const { colors } = theme;

  return (
    <MainScreen typeOfScreen="stack">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingVertical="m" backgroundColor="mainBackground">
          <Text variant="headerNavigation" color="text">
            Bienvenue
          </Text>
          <Column>
            <Input placeholder="Nom*" />
            <Input placeholder="Prénom*" />
            <Input placeholder="Pseudo*" />
            <Input placeholder="Age*" />
            <Input placeholder="Numéro téléphone*" />
            <Input placeholder="Email" />
            <Row justifyContent="space-around" alignItems={"center"}>
              <Text variant={"secondary"}>Vous êtes professionel ? </Text>
              <RadioButton
                value="first"
                color={colors.primary}
                status={checked === "yes" ? "checked" : "unchecked"}
                onPress={() => setChecked("yes")}
              />
              <Text variant="tertiary">Oui</Text>
              <RadioButton
                value="second"
                color={colors.primary}
                status={checked === "no" ? "checked" : "unchecked"}
                onPress={() => setChecked("no")}
              />
              <Text variant="tertiary">Non</Text>
            </Row>
            <Input
              placeholder="Mot de passe*"
              secureTextEntry={hideConfirmPassword}
              iconRight={{
                name: hidePassword ? "visibility" : "visibility-off",
                size: 32,
                color: colors.secondary,
                onPress: () => setHidePassword(!hidePassword),
              }}
            />
            <Input
              placeholder="Confirmer mot de passe*"
              secureTextEntry={hideConfirmPassword}
              iconRight={{
                name: hideConfirmPassword ? "visibility" : "visibility-off",
                size: 32,
                color: colors.secondary,
                onPress: () => setHideConfirmPassword(!hideConfirmPassword),
              }}
            />
          </Column>
          <Button
            variant={"primary"}
            label="Creer mon compte"
            onPress={() => navigation.goBack()}
            marginTop={"s"}
          />
          <Row
            alignItems="center"
            padding="s"
            backgroundColor="offWhite"
            justifyContent="space-between"
            borderRadius="xs"
            marginTop="xs"
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                size={Size.ICON_LARGE}
                color={colors.primary}
              />
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
