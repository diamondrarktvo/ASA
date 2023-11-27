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
  RequestError,
  RequestConnection,
} from "_shared";
import { useMemo, useRef, useCallback, useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Theme, Size } from "_theme";
import { useTheme } from "@shopify/restyle";
import { StyleSheet, ScrollView } from "react-native";
import { ScrollView as ScrollViewBottomSheet } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useAppDispatch, useAppSelector } from "_store";
import {
  formatDate,
  removeDataToAsyncStorage,
  storeObjectDataToAsyncStorage,
} from "_utils";
import { useUpdateMutation } from "../authApi";
import { parseErrorMessage, transformDataToFormData } from "../utilsAuth";
import { RadioButton, Snackbar } from "react-native-paper";
import { removeAccount, setAccount, setInformationUser } from "../accountSlice";

export default function ManageProfil() {
  //state data
  const theme = useTheme<Theme>();
  const dispatch = useAppDispatch();
  const { borderRadii, colors, spacing } = theme;
  const accountUser = useAppSelector((state) => state.account.user);
  const token = useAppSelector((state) => state.account.token);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [imageImported, setImageImported] = useState<string[]>([]);
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
    image: accountUser.image,
  });

  const [update, { isError, isLoading, status, error }] = useUpdateMutation();

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
      setValueForUpdate({
        first_name: accountUser.first_name,
        last_name: accountUser.last_name,
        nickname: accountUser.nickname,
        age: accountUser.age?.toString(),
        email: accountUser.email,
        phone_number: accountUser.phone_number?.toString(),
        is_professional: accountUser.is_professional,
        company_name: accountUser.company_name,
        unique_company_number: accountUser.unique_company_number,
        image: accountUser.image,
      });
      return bottomSheetRef.current.close();
    }
    return;
  };

  const pickImages = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let newImageImportedArray = [...imageImported];
      newImageImportedArray.push(result.assets[0].uri);
      setImageImported(newImageImportedArray);
    }
  };

  const removeThisImage = () => {
    setImageImported([]);
  };

  const handleSubmit = () => {
    let valueFormData = {
      first_name: valueForUpdate.first_name,
      last_name: valueForUpdate.last_name,
      nickname: valueForUpdate.nickname,
      age: valueForUpdate.age,
      email: valueForUpdate.email,
      phone_number: valueForUpdate.phone_number,
      is_professional: valueForUpdate.is_professional,
      company_name: valueForUpdate.company_name,
      unique_company_number: valueForUpdate.unique_company_number,
      image: imageImported.length !== 0 ? valueForUpdate.image : null,
    };
    update({ body: transformDataToFormData(valueFormData), token: token })
      .unwrap()
      .then((res) => {
        dispatch(setInformationUser(res));
        storeObjectDataToAsyncStorage("current_account", res.user);
        closeBottomSheet();
      })
      .catch((e) => {
        handleFetchError(e);
        setVisibleSnackbar(true);
      });
  };

  const handleFetchError = (error: any) => {
    if (!error) return;
    if (error.detail?.includes("Invalid token")) {
      removeDataToAsyncStorage("token");
      removeDataToAsyncStorage("current_account");
      return dispatch(removeAccount());
    }
  };

  //effect

  const handleChangeIsProfessionnal = () => {
    setValueForUpdate((prevState) => ({
      ...prevState,
      is_professional: !prevState.is_professional,
    }));
  };

  useEffect(() => {
    if (imageImported.length !== 0) {
      setValueForUpdate((prevState) => ({
        ...prevState,
        image: imageImported[0] || "",
      }));
    } else {
      setValueForUpdate((prevState) => ({
        ...prevState,
        image: accountUser.image || "",
      }));
    }
  }, [imageImported]);

  useEffect(() => {
    if (isError) {
      handleFetchError(error);
    }
  }, [error, isError]);

  useEffect(() => {
    setValueForUpdate({
      first_name: accountUser.first_name,
      last_name: accountUser.last_name,
      nickname: accountUser.nickname,
      age: accountUser.age?.toString(),
      email: accountUser.email,
      phone_number: accountUser.phone_number?.toString(),
      is_professional: accountUser.is_professional,
      company_name: accountUser.company_name,
      unique_company_number: accountUser.unique_company_number,
      image: accountUser.image,
    });
  }, [accountUser]);

  return (
    <MainScreen typeOfScreen="stack">
      <RequestConnection>
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
                source={
                  valueForUpdate.image
                    ? { uri: valueForUpdate.image }
                    : require("_images/logoASA.jpeg")
                }
                style={{
                  width: Size.IMAGE_MEDIUM,
                  height: Size.IMAGE_MEDIUM,
                  borderRadius: borderRadii.lg,
                  marginBottom: "4%",
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
                value={valueForUpdate.last_name ? valueForUpdate.last_name : ""}
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
                value={
                  valueForUpdate.first_name ? valueForUpdate.first_name : ""
                }
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
                  status={
                    valueForUpdate.is_professional === true
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => handleChangeIsProfessionnal()}
                />
                <Text variant="tertiary">Oui</Text>
                <RadioButton
                  value="no"
                  color={colors.primary}
                  disabled={true}
                  status={
                    valueForUpdate.is_professional === false
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => handleChangeIsProfessionnal()}
                />
                <Text variant="tertiary">Non</Text>
              </Row>

              {/**Company name */}
              {valueForUpdate.is_professional && (
                <>
                  <Text
                    variant="primary"
                    color="text"
                    fontWeight="bold"
                    marginLeft="xs"
                    textDecorationLine="underline"
                  >
                    Nom de la société:
                  </Text>
                  <Input
                    placeholder="Nom de la société"
                    editable={false}
                    value={
                      valueForUpdate.company_name
                        ? valueForUpdate.company_name
                        : ""
                    }
                    iconLeft={{
                      name: "mail",
                      size: Size.ICON_SMALL,
                      color: colors.text,
                    }}
                  />
                </>
              )}

              {/**Unique company number */}
              {valueForUpdate.is_professional && (
                <>
                  <Text
                    variant="primary"
                    color="text"
                    fontWeight="bold"
                    marginLeft="xs"
                    textDecorationLine="underline"
                  >
                    Numéro unique de la société:
                  </Text>
                  <Input
                    placeholder="Numéro unique de la société"
                    editable={false}
                    value={
                      valueForUpdate.unique_company_number
                        ? valueForUpdate.unique_company_number
                        : ""
                    }
                    iconLeft={{
                      name: "mail",
                      size: Size.ICON_SMALL,
                      color: colors.text,
                    }}
                  />
                </>
              )}

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
                <Icon
                  name="close"
                  size={Size.ICON_MEDIUM}
                  color={colors.text}
                />
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
                  source={
                    imageImported.length !== 0
                      ? { uri: imageImported[0] }
                      : valueForUpdate.image
                      ? { uri: valueForUpdate.image }
                      : require("_images/logoASA.jpeg")
                  }
                  style={{
                    width: Size.IMAGE_LARGE,
                    height: Size.IMAGE_LARGE,
                    borderRadius: borderRadii.hg,
                    marginBottom: "4%",
                  }}
                />
                {imageImported.length !== 0 && (
                  <Box
                    position={"absolute"}
                    bottom={70}
                    right={95}
                    backgroundColor={"primary"}
                    borderRadius={"hg"}
                  >
                    <Icon
                      name="close"
                      size={Size.ICON_LARGE}
                      color={colors.black}
                      onPress={() => removeThisImage()}
                    />
                  </Box>
                )}
                <TouchableOpacity onPress={pickImages}>
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
                  value={
                    valueForUpdate.last_name ? valueForUpdate.last_name : ""
                  }
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
                  value={
                    valueForUpdate.age ? valueForUpdate.age.toString() : ""
                  }
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
                    status={
                      valueForUpdate.is_professional === true
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => handleChangeIsProfessionnal()}
                  />
                  <Text variant="tertiary">Oui</Text>
                  <RadioButton
                    value="no"
                    color={colors.primary}
                    status={
                      valueForUpdate.is_professional === false
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => handleChangeIsProfessionnal()}
                  />
                  <Text variant="tertiary">Non</Text>
                </Row>

                {/**Company name */}
                {valueForUpdate.is_professional && (
                  <>
                    <Text
                      variant="primary"
                      color="text"
                      fontWeight="bold"
                      marginLeft="xs"
                      textDecorationLine="underline"
                    >
                      Nom de la société:
                    </Text>
                    <Input
                      placeholder="Nom de la société"
                      value={
                        valueForUpdate.company_name
                          ? valueForUpdate.company_name
                          : ""
                      }
                      onChangeText={(text) =>
                        setValueForUpdate((prevState) => ({
                          ...prevState,
                          company_name: text,
                        }))
                      }
                      iconLeft={{
                        name: "mail",
                        size: Size.ICON_SMALL,
                        color: colors.text,
                      }}
                      errorMessage={
                        valueForUpdate.company_name === "" ||
                        valueForUpdate.company_name === null
                          ? "Nom de la société requis."
                          : ""
                      }
                    />
                  </>
                )}

                {/**Unique company number */}
                {valueForUpdate.is_professional && (
                  <>
                    <Text
                      variant="primary"
                      color="text"
                      fontWeight="bold"
                      marginLeft="xs"
                      textDecorationLine="underline"
                    >
                      Numéro unique de la société:
                    </Text>
                    <Input
                      placeholder="Numéro unique de la société"
                      inputMode="numeric"
                      value={
                        valueForUpdate.unique_company_number
                          ? valueForUpdate.unique_company_number
                          : ""
                      }
                      onChangeText={(text) =>
                        setValueForUpdate((prevState) => ({
                          ...prevState,
                          unique_company_number: text,
                        }))
                      }
                      iconLeft={{
                        name: "mail",
                        size: Size.ICON_SMALL,
                        color: colors.text,
                      }}
                      errorMessage={
                        valueForUpdate.unique_company_number === "" ||
                        valueForUpdate.unique_company_number === null
                          ? "Numéro de la société requis."
                          : ""
                      }
                    />
                  </>
                )}

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
      </RequestConnection>
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
