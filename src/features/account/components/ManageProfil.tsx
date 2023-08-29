import {
  Box,
  Image,
  MainScreen,
  Text,
  HeaderStackNavStyled,
  Column,
  Input,
  Button,
  Row,
  TouchableOpacity,
  Icon,
  RequestLoader,
} from "_shared";
import { useMemo, useRef, useCallback, useState, useEffect } from "react";
import { Theme, Size } from "_theme";
import { useTheme } from "@shopify/restyle";
import { StyleSheet, ScrollView } from "react-native";
import { ScrollView as ScrollViewBottomSheet } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useAppDispatch, useAppSelector } from "_store";
import { formatDate, storeObjectDataToAsyncStorage } from "_utils";
import { useUpdateMutation } from "../authApi";
import { ERROR_REGISTER, parseErrorMessage } from "../utilsAuth";
import { RadioButton, Snackbar } from "react-native-paper";

export default function ManageProfil() {
  const theme = useTheme<Theme>();
  const dispatch = useAppDispatch();
  const { borderRadii, colors, spacing } = theme;
  const accountUser = useAppSelector((state) => state.account.user);
  const [update, { isError, isLoading, status, error }] = useUpdateMutation();
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [checked, setChecked] = useState("yes");
  const [valueForUpdate, setValueForUpdate] = useState({
    first_name: accountUser.first_name,
    last_name: accountUser.last_name,
    nickname: accountUser.nickname,
    age: accountUser.age?.toString(),
    email: accountUser.email,
    phone_number: accountUser.phone_number?.toString(),
    is_professional: accountUser.is_professional,
    company_name: accountUser.company_name,
    unique_company_number: accountUser.unique_company_number,
  });

  //state data

  //bottomsheet
  const snapPoints = useMemo(() => [1, "97%"], []);

  const bottomSheetRef = useRef<BottomSheetModal | null>(null);

  const renderBackDrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} opacity={0.6} />
    ),
    [],
  );

  const openBottomSheet = () => {
    if (bottomSheetRef !== null && bottomSheetRef.current !== null) {
      return bottomSheetRef.current.present();
    }
    return;
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef !== null && bottomSheetRef.current !== null) {
      return bottomSheetRef.current.close();
    }
    return;
  };

  const handleSubmit = () => {
    update(valueForUpdate)
      .unwrap()
      .then((res) => {
        console.log("resAPI : ", res);
        //dispatch(setAccount(res));
        storeObjectDataToAsyncStorage("current_account", res.user);
        closeBottomSheet();
      })
      .catch((e) => {
        setVisibleSnackbar(true);
      });
  };

  //effect
  useEffect(() => {
    setValueForUpdate((prevState) => ({
      ...prevState,
      is_professional: checked === "yes" ? true : false,
    }));
  }, [checked]);

  return (
    <MainScreen typeOfScreen="stack">
      <RequestLoader isLoading={isLoading}>
        <HeaderStackNavStyled
          titleRight="Modifier"
          onPressTitle={() => openBottomSheet()}
        />
        {/**Banniere image profile */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box
            alignItems="center"
            padding="m"
            borderRadius="md"
            marginVertical="m"
            backgroundColor="mainBackground"
            style={styles.box_with_shadow}
          >
            <Image
              source={require("_images/logoASA.jpeg")}
              style={{
                width: Size.IMAGE_MEDIUM,
                height: Size.IMAGE_MEDIUM,
                borderRadius: borderRadii.lg,
                marginBottom: spacing.s,
              }}
            />
            <Text variant="bigTitle" color="text" textAlign={"center"}>
              {valueForUpdate.first_name} {valueForUpdate.last_name}
            </Text>
            {accountUser && accountUser.date_joined && (
              <Text
                variant={"tertiary"}
                fontWeight={"400"}
                color={"primaryDark"}
              >
                Membre depuis :{formatDate(accountUser.date_joined)}
              </Text>
            )}
          </Box>

          {/**TODO: transform this to an array */}
          <Column>
            <Text variant="title" color="text">
              Votre profile
            </Text>
            <Text variant="secondary" color="secondary" marginBottom="s">
              Les informations que vous partagez seront utilisées dans
              l'application Mety Amiko pour aider les autres utilisateurs et
              administrateurs à vous connaitre.
            </Text>

            {/**Nom */}
            <Text
              variant="primary"
              color="text"
              fontWeight="bold"
              marginLeft="xs"
              textDecorationLine="underline"
            >
              Nom:
            </Text>
            <Input
              placeholder="Nom"
              editable={false}
              value={valueForUpdate.first_name ? valueForUpdate.first_name : ""}
              iconLeft={{
                name: "person",
                size: Size.ICON_SMALL,
                color: colors.text,
              }}
            />

            {/**Prenom */}
            <Text
              variant="primary"
              color="text"
              fontWeight="bold"
              marginLeft="xs"
              textDecorationLine="underline"
            >
              Prénom:
            </Text>
            <Input
              placeholder="Prenom"
              editable={false}
              value={valueForUpdate.last_name ? valueForUpdate.last_name : ""}
              iconLeft={{
                name: "person",
                size: Size.ICON_SMALL,
                color: colors.text,
              }}
            />

            {/**Pseudo */}
            <Text
              variant="primary"
              color="text"
              fontWeight="bold"
              marginLeft="xs"
              textDecorationLine="underline"
            >
              Pseudo:
            </Text>
            <Input
              placeholder="Pseudo"
              editable={false}
              value={valueForUpdate.nickname ? valueForUpdate.nickname : ""}
              iconLeft={{
                name: "person",
                size: Size.ICON_SMALL,
                color: colors.text,
              }}
            />

            {/**Age */}
            <Text
              variant="primary"
              color="text"
              fontWeight="bold"
              marginLeft="xs"
              textDecorationLine="underline"
            >
              Age:
            </Text>
            <Input
              placeholder="Age"
              editable={false}
              value={valueForUpdate.age ? valueForUpdate.age.toString() : ""}
              iconLeft={{
                name: "person",
                size: Size.ICON_SMALL,
                color: colors.text,
              }}
            />

            {/**Email */}
            <Text
              variant="primary"
              color="text"
              fontWeight="bold"
              marginLeft="xs"
              textDecorationLine="underline"
            >
              Adresse email:
            </Text>
            <Input
              placeholder="Adresse email"
              editable={false}
              value={valueForUpdate.email ? valueForUpdate.email : ""}
              iconLeft={{
                name: "mail",
                size: Size.ICON_SMALL,
                color: colors.text,
              }}
            />

            {/**Is professional */}
            <Row justifyContent="space-around" alignItems={"center"}>
              <Text variant={"secondary"}>Vous êtes professionel ? </Text>
              <RadioButton
                value="yes"
                color={colors.primary}
                disabled={true}
                status={checked === "yes" ? "checked" : "unchecked"}
                onPress={() => setChecked("yes")}
              />
              <Text variant="tertiary">Oui</Text>
              <RadioButton
                value="no"
                color={colors.primary}
                disabled={true}
                status={checked === "no" ? "checked" : "unchecked"}
                onPress={() => setChecked("no")}
              />
              <Text variant="tertiary">Non</Text>
            </Row>

            {/**Numéro téléphone */}
            <Text
              variant="primary"
              color="text"
              fontWeight="bold"
              marginLeft="xs"
              textDecorationLine="underline"
            >
              Numéro téléphone:
            </Text>
            <Input
              placeholder="Numéro téléphone"
              editable={false}
              value={
                valueForUpdate.phone_number
                  ? valueForUpdate.phone_number.toString()
                  : ""
              }
              iconLeft={{
                name: "call",
                size: Size.ICON_SMALL,
                color: colors.text,
              }}
            />
          </Column>
        </ScrollView>

        <BottomSheetModal
          backdropComponent={renderBackDrop}
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          style={styles.bottomSheet_container}
        >
          <Row alignItems="center" width="67%" justifyContent="space-between">
            <TouchableOpacity onPress={() => closeBottomSheet()}>
              <Icon name="close" size={Size.ICON_MEDIUM} color={colors.text} />
            </TouchableOpacity>
            <Text
              variant="primaryBold"
              textAlign="center"
              textDecorationLine="underline"
            >
              Modifier le compte
            </Text>
          </Row>
          <ScrollViewBottomSheet showsVerticalScrollIndicator={false}>
            <Box
              alignItems="center"
              padding="m"
              borderRadius="md"
              marginVertical="m"
              backgroundColor="mainBackground"
              style={styles.box_with_shadow}
            >
              <Image
                source={require("_images/logoASA.jpeg")}
                style={{
                  width: Size.IMAGE_LARGE,
                  height: Size.IMAGE_LARGE,
                  borderRadius: borderRadii.hg,
                  marginBottom: spacing.s,
                }}
              />
              <TouchableOpacity>
                <Row
                  alignItems="center"
                  backgroundColor="mainBackground"
                  style={[
                    styles.button_add_image,
                    {
                      borderRadius: borderRadii.sm,
                    },
                  ]}
                >
                  <Icon
                    name="photo-camera"
                    size={Size.ICON_SMALL}
                    color={colors.text}
                  />
                  <Text variant="secondary">Ajouter image</Text>
                </Row>
              </TouchableOpacity>
            </Box>

            {/**TODO: transform this to an array */}
            <Column>
              <Text variant="title" color="text">
                Votre profile
              </Text>
              <Text variant="secondary" color="secondary" marginBottom="s">
                Les informations que vous partagez seront utilisées dans
                l'application Mety Amiko pour aider les autres utilisateurs et
                administrateurs à vous connaitre.
              </Text>

              {/**Nom */}
              <Text
                variant="primary"
                color="text"
                fontWeight="bold"
                marginLeft="xs"
                textDecorationLine="underline"
              >
                Nom:
              </Text>
              <Input
                placeholder="Nom"
                value={
                  valueForUpdate.first_name ? valueForUpdate.first_name : ""
                }
                onChangeText={(text) =>
                  setValueForUpdate((prevState) => ({
                    ...prevState,
                    first_name: text,
                  }))
                }
                iconLeft={{
                  name: "person",
                  size: Size.ICON_SMALL,
                  color: colors.text,
                }}
              />

              {/**Prenom */}
              <Text
                variant="primary"
                color="text"
                fontWeight="bold"
                marginLeft="xs"
                textDecorationLine="underline"
              >
                Prénom:
              </Text>
              <Input
                placeholder="Prenom"
                value={valueForUpdate.last_name ? valueForUpdate.last_name : ""}
                onChangeText={(text) =>
                  setValueForUpdate((prevState) => ({
                    ...prevState,
                    last_name: text,
                  }))
                }
                iconLeft={{
                  name: "person",
                  size: Size.ICON_SMALL,
                  color: colors.text,
                }}
              />

              {/**Prenom */}
              <Text
                variant="primary"
                color="text"
                fontWeight="bold"
                marginLeft="xs"
                textDecorationLine="underline"
              >
                Pseudo:
              </Text>
              <Input
                placeholder="Pseudo"
                value={valueForUpdate.nickname ? valueForUpdate.nickname : ""}
                onChangeText={(text) =>
                  setValueForUpdate((prevState) => ({
                    ...prevState,
                    nickname: text,
                  }))
                }
                iconLeft={{
                  name: "person",
                  size: Size.ICON_SMALL,
                  color: colors.text,
                }}
              />

              {/**Age */}
              <Text
                variant="primary"
                color="text"
                fontWeight="bold"
                marginLeft="xs"
                textDecorationLine="underline"
              >
                Age:
              </Text>
              <Input
                placeholder="Age"
                value={valueForUpdate.age ? valueForUpdate.age.toString() : ""}
                onChangeText={(text) =>
                  setValueForUpdate((prevState) => ({
                    ...prevState,
                    age: text,
                  }))
                }
                iconLeft={{
                  name: "person",
                  size: Size.ICON_SMALL,
                  color: colors.text,
                }}
              />

              {/**Email */}
              <Text
                variant="primary"
                color="text"
                fontWeight="bold"
                marginLeft="xs"
                textDecorationLine="underline"
              >
                Adresse email:
              </Text>
              <Input
                placeholder="Adresse email"
                value={valueForUpdate.email ? valueForUpdate.email : ""}
                onChangeText={(text) =>
                  setValueForUpdate((prevState) => ({
                    ...prevState,
                    email: text,
                  }))
                }
                iconLeft={{
                  name: "mail",
                  size: Size.ICON_SMALL,
                  color: colors.text,
                }}
              />

              {/**Is professional */}
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

              {/**Numéro téléphone */}
              <Text
                variant="primary"
                color="text"
                fontWeight="bold"
                marginLeft="xs"
                textDecorationLine="underline"
              >
                Numéro téléphone:
              </Text>
              <Input
                placeholder="Adresse email"
                value={
                  valueForUpdate.phone_number
                    ? valueForUpdate.phone_number.toString()
                    : ""
                }
                onChangeText={(text) =>
                  setValueForUpdate((prevState) => ({
                    ...prevState,
                    phone_number: text,
                  }))
                }
                iconLeft={{
                  name: "call",
                  size: Size.ICON_SMALL,
                  color: colors.text,
                }}
              />
            </Column>
          </ScrollViewBottomSheet>
          <Box paddingVertical="s">
            <Button
              variant={"primary"}
              label="Enregistrer"
              onPress={() => handleSubmit()}
            />
          </Box>
        </BottomSheetModal>
        <Snackbar
          visible={visibleSnackbar}
          onDismiss={() => setVisibleSnackbar(false)}
          action={{
            label: "Ok",
            onPress: () => {
              // Do something
            },
          }}
        >
          {parseErrorMessage(error)}
        </Snackbar>
      </RequestLoader>
    </MainScreen>
  );
}

const styles = StyleSheet.create({
  box_with_shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomSheet_container: {
    paddingHorizontal: "4%",
  },
  button_add_image: {
    marginTop: -24,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 10,
  },
});
