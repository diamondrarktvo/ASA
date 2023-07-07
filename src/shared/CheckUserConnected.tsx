import Box, { BoxProps } from "./Box";
import React, { useState } from "react";
import Text from "./Text";
import TouchableOpacity from "./TouchableOpacity";
import Button from "./Button";
import Row from "./Row";
import Column from "./Column";
import Input from "./Input";
import { useTheme } from "@shopify/restyle";
import { Theme, Size } from "_theme";
import Icon from "./Icon";

type Props = {
  children: React.ReactNode;
  isUserLogged: boolean;
  titleIfNotConnected?: string;
  subTitleIfNotConnected: string;
  loggedIn: () => void;
} & Partial<BoxProps>;

type ComponentUserNotLoggedProps = {
  title?: string;
  subTitle: string;
  loggedIn: () => void;
};

const ComponentUserNotLogged = ({
  title,
  subTitle,
  loggedIn,
}: ComponentUserNotLoggedProps) => {
  const theme = useTheme<Theme>();
  const { primary, secondary, white } = theme.colors;
  const [hidePassword, setHidePassword] = useState(true);

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
        <Button label="Se connecter" onPress={loggedIn} />
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
          onPress={() => console.log("creer compte")}
          backgroundColor={white}
        >
          <Icon name="arrow-forward" size={Size.ICON_MEDIUM} color={primary} />
        </TouchableOpacity>
      </Row>
    </Box>
  );
};

const CheckUserConnected: React.FC<Props> = ({
  children,
  isUserLogged,
  titleIfNotConnected,
  subTitleIfNotConnected,
  loggedIn,
  ...props
}) => {
  return (
    <Box flex={1} backgroundColor="mainBackground" {...props}>
      {isUserLogged ? (
        children
      ) : (
        <ComponentUserNotLogged
          loggedIn={loggedIn}
          title={titleIfNotConnected}
          subTitle={subTitleIfNotConnected}
        />
      )}
    </Box>
  );
};

export default CheckUserConnected;
