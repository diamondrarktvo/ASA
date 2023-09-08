import { TouchableHighlight, ActivityIndicator } from "react-native";
import Text from "./Text";
import Box from "./Box";
import { Size, Theme, theme } from "_theme";
import React from "react";
import {
  border,
  BorderProps,
  BoxProps,
  createRestyleComponent,
  createVariant,
  spacing,
  SpacingProps,
  VariantProps,
} from "@shopify/restyle";
import Icon from "./Icon";
import Row from "./Row";

type ButtonProps = {
  onPress?: () => void;
  variant: "primary" | "secondary" | "tertiary | buttonWithShadow";
  loading?: boolean;
  label: React.ReactNode;
  iconRight?: string;
  iconLeft?: string;
  bold?: string | number | undefined;
  disabled?: boolean;
  color?: string;
} & Partial<BoxProps<Theme>>;

type BoxButtonProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  VariantProps<Theme, "buttonVariants"> &
  React.ComponentProps<typeof Box>;

const BoxButton = createRestyleComponent<BoxButtonProps, Theme>(
  [spacing, border, createVariant({ themeKey: "buttonVariants" })],
  Box,
);

const Button: React.FC<ButtonProps> = ({
  onPress,
  variant,
  loading,
  label,
  iconRight,
  bold,
  borderLeftColor,
  iconLeft,
  disabled,
  color = "white",
  ...rest
}) => {
  const { primary, secondary } = theme.colors;
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="transparent"
      disabled={disabled}
    >
      <BoxButton
        variant={disabled ? "tertiary" : variant}
        paddingVertical="s"
        paddingHorizontal="s"
        borderRadius={"xs"}
        {...rest}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Row
            alignItems="center"
            justifyContent={iconLeft || iconRight ? "space-between" : "center"}
          >
            {iconLeft && (
              <Icon name={iconLeft} size={Size.ICON_MEDIUM} color={secondary} />
            )}
            <Text variant="secondary" color={color} fontWeight={bold}>
              {label}
            </Text>
            {iconRight && (
              <Icon
                name={iconRight}
                size={Size.ICON_MEDIUM}
                color={secondary}
              />
            )}
          </Row>
        )}
      </BoxButton>
    </TouchableHighlight>
  );
};

export default Button;
