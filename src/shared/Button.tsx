import { TouchableHighlight, ActivityIndicator } from "react-native";
import Text from "./Text";
import Box from "./Box";
import { Theme } from "_theme";
import React from "react";
import { BoxProps, TextProps } from "@shopify/restyle";

type ButtonProps = {
    onPress?: () => void;
    loading?: boolean
    children: React.ReactNode,
    disabled?: boolean,
    textProps?: TextProps<Theme> 
} & Partial<BoxProps<Theme>>

const Button: React.FC<ButtonProps> = ({ onPress, loading, children, disabled, textProps, ...rest }) => {
    return (
        <TouchableHighlight onPress={onPress} underlayColor="transparent" disabled={disabled}>
            <Box
                backgroundColor="primary"
                paddingVertical="s"
                paddingHorizontal="m"
                borderRadius="sm"
                {...rest}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text variant="button" {...textProps}>
                        {children}
                    </Text>
                )}
            </Box>
        </TouchableHighlight>
    );
}

export default Button;
