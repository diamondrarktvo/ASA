import React, { useState } from "react";
//FIXME: cette importation est un exception pour ne pas avoir le WARNING recycle
import Text from "../../../shared/Text";
import TouchableOpacity from "../../../shared/TouchableOpacity";
import Button from "../../../shared/Button";
import Row from "../../../shared/Row";
import Column from "../../../shared/Column";
import Input from "../../../shared/Input";
import Icon from "../../../shared/Icon";
import Box from "../../../shared/Box";
import { createAccountNavigationTypes } from "../types";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { Theme, Size } from "_theme";

type LoginScreenProps = {
  title?: string;
  subTitle: string;
  loggedIn: () => void;
};

const LoginScreen = ({ title, subTitle, loggedIn }: LoginScreenProps) => {
  const theme = useTheme<Theme>();
  const { primary, secondary, white } = theme.colors;
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useNavigation<createAccountNavigationTypes>();

  return (
    <Box paddingVertical="m" backgroundColor="mainBackground">
      <Box>
        {title ? (
          <Text variant="bigTitle" color="text">
            {title}
          </Text>
        ) : null}
        <Row marginBottom="s">
          <Text variant="title" color="secondary">
            {subTitle}
          </Text>
        </Row>
        <Column>
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
        </Column>
        <Row marginVertical="m">
          <Text
            variant="primaryBold"
            textDecorationLine="underline"
            color="text"
          >
            Mot de passe oublié
          </Text>
        </Row>
        <Button variant={"primary"} label="Se connecter" onPress={loggedIn} />
      </Box>
      <Row
        alignItems="center"
        padding="s"
        backgroundColor="offWhite"
        justifyContent="space-between"
        borderRadius="xs"
        marginTop="xs"
      >
        <Text variant="primaryBold" color="text">
          Creer un compte
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("create_account_screen")}
        >
          <Icon name="arrow-forward" size={Size.ICON_LARGE} color={primary} />
        </TouchableOpacity>
      </Row>
    </Box>
  );
};

export default LoginScreen;
