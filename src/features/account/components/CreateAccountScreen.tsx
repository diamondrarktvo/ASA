import { useEffect, useState } from "react";
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

type registerTypes = {
  nickname: string | null;
  email: string | null;
  phone_number: string | null;
  first_name: string | null;
  last_name: string | null;
  age: string | null;
  image: string | null;
  is_professional: boolean;
  company_name: string | null;
  unique_company_number: string | null;
  password: string | null;
};

const CreateAccountScreen = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [password, setPassword] = useState<{
    new_password: string;
    confirm_password: string;
  }>({
    new_password: "",
    confirm_password: "",
  });
  const [registerValue, setRegisterValue] = useState<registerTypes>({
    nickname: null,
    email: null,
    phone_number: null,
    first_name: null,
    last_name: null,
    age: null,
    image: null,
    is_professional: false,
    company_name: null,
    unique_company_number: null,
    password: null,
  });
  const [checked, setChecked] = useState("yes");
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const { colors } = theme;

  //effect
  useEffect(() => {
    setRegisterValue((prevState) => ({
      ...prevState,
      is_professional: checked === "yes" ? true : false,
    }));
  }, [checked]);

  useEffect(() => {
    if (password.new_password === password.confirm_password) {
      setRegisterValue((prevState) => ({
        ...prevState,
        password: password.new_password,
      }));
    } else {
      setRegisterValue((prevState) => ({
        ...prevState,
        password: null,
      }));
    }
  }, [password]);

  return (
    <MainScreen typeOfScreen="stack">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingVertical="m" backgroundColor="mainBackground">
          <Text variant="headerNavigation" color="text">
            Bienvenue
          </Text>
          <Column>
            <Input
              placeholder="Nom*"
              onChangeText={(text) =>
                setRegisterValue((prevState) => ({
                  ...prevState,
                  first_name: text,
                }))
              }
            />
            <Input
              placeholder="Prénom*"
              onChangeText={(text) =>
                setRegisterValue((prevState) => ({
                  ...prevState,
                  last_name: text,
                }))
              }
            />
            <Input
              placeholder="Pseudo*"
              onChangeText={(text) =>
                setRegisterValue((prevState) => ({
                  ...prevState,
                  nickname: text,
                }))
              }
            />
            <Input
              placeholder="Age*"
              onChangeText={(text) =>
                setRegisterValue((prevState) => ({
                  ...prevState,
                  age: text,
                }))
              }
            />
            <Input
              placeholder="Numéro téléphone*"
              onChangeText={(text) =>
                setRegisterValue((prevState) => ({
                  ...prevState,
                  phone_number: text,
                }))
              }
            />
            <Input
              placeholder="Email"
              onChangeText={(text) =>
                setRegisterValue((prevState) => ({
                  ...prevState,
                  email: text,
                }))
              }
            />
            <Row justifyContent="space-around" alignItems={"center"}>
              <Text variant={"secondary"}>Vous êtes professionel ? </Text>
              <RadioButton
                value="yes"
                color={colors.primary}
                status={checked === "yes" ? "checked" : "unchecked"}
                onPress={() => setChecked("yes")}
              />
              <Text variant="tertiary">Oui</Text>
              <RadioButton
                value="no"
                color={colors.primary}
                status={checked === "no" ? "checked" : "unchecked"}
                onPress={() => setChecked("no")}
              />
              <Text variant="tertiary">Non</Text>
            </Row>
            <Input
              placeholder="Mot de passe*"
              secureTextEntry={hideConfirmPassword}
              onChangeText={(text) =>
                setPassword((prevState) => ({
                  ...prevState,
                  new_password: text,
                }))
              }
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
              onChangeText={(text) =>
                setPassword((prevState) => ({
                  ...prevState,
                  confirm_password: text,
                }))
              }
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
