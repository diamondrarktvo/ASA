import { TextInput, TextInputProps, StyleSheet } from "react-native";
import React from "react";
import Row from "./Row";
import Icon from "./Icon";
import TouchableOpacity from "./TouchableOpacity";

type InputProps = TextInputProps & {
  iconRight?: {
    name: string;
    color: string;
    size: number;
    onPress?: () => void;
  };
  iconLeft?: {
    name: string;
    color: string;
    size: number;
  };
};

const Input = ({ iconRight, iconLeft, ...props }: InputProps) => {
  return (
    <Row
      borderWidth={1}
      borderColor="secondary"
      borderRadius="xs"
      width="100%"
      paddingHorizontal={iconLeft ? "xs" : "s"}
      paddingVertical="s"
      marginVertical="xs"
      alignItems="center"
    >
      {iconLeft && (
        <Icon
          name={iconLeft.name}
          size={iconLeft.size}
          color={iconLeft.color}
        />
      )}
      <Row flex={1} justifyContent="space-between">
        <TextInput {...props} />
        {iconRight && (
          <TouchableOpacity onPress={iconRight.onPress}>
            <Icon
              name={iconRight.name}
              size={iconRight.size}
              color={iconRight.color}
            />
          </TouchableOpacity>
        )}
      </Row>
    </Row>
  );
};

export type ImageProps = React.ComponentProps<typeof Input>;
export default Input;

const styles = StyleSheet.create({});
