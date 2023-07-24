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
} from "_shared";
import { useMemo, useRef, useCallback } from "react";
import { Theme, Size } from "_theme";
import { useTheme } from "@shopify/restyle";
import { StyleSheet, ScrollView } from "react-native";
import { ScrollView as ScrollViewBottomSheet } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

export default function ManageProfil() {
  const theme = useTheme<Theme>();
  const { borderRadii, colors, spacing } = theme;

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

  return (
    <MainScreen typeOfScreen="stack">
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
          <Text variant="bigTitle" color="text">
            Mety Amiko
          </Text>
          <Text variant="secondary" color="text">
            Utilisateur client
          </Text>
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
            value="Mety Amiko"
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
            value="Mety Amiko be"
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
            value="22"
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
            value="metyamiko@gmail.com"
            iconLeft={{
              name: "mail",
              size: Size.ICON_SMALL,
              color: colors.text,
            }}
          />

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
            value="034 78 968 58"
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
          <TouchableOpacity onPress={() => bottomSheetRef.current.close()}>
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
              value="Mety Amiko"
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
              value="Mety Amiko be"
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
              value="22"
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
              value="metyamiko@gmail.com"
              iconLeft={{
                name: "mail",
                size: Size.ICON_SMALL,
                color: colors.text,
              }}
            />

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
              value="034 78 968 58"
              iconLeft={{
                name: "call",
                size: Size.ICON_SMALL,
                color: colors.text,
              }}
            />
          </Column>
        </ScrollViewBottomSheet>
        <Box paddingTop="s">
          <Button label="Enregistrer" />
        </Box>
      </BottomSheetModal>
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
