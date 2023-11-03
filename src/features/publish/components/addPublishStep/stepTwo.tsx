import { Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Icon,
  Image,
  Input,
  MainScreen,
  Row,
  Text,
} from "_shared";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { stepper3NavigationTypes } from "../../types";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "_store";
import { reinitializeProduct, selectors, setProduct } from "../../publishSlice";

export default function StepTwo() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const [imageImported, setImageImported] = useState<
    { base64: string; uriDefault: string }[] | []
  >([]);
  const { borderRadii, colors } = theme;
  const currentProduct = useAppSelector(selectors.selectProductToPublish);
  const [valueForStepper, setValueForStepper] = useState(currentProduct);
  const [disableButton, setDisableButton] = useState(true);

  //function
  const pickImages = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let newImageImportedArray = [...imageImported];
      if (result.assets[0].base64 && result.assets[0].uri) {
        newImageImportedArray.push({
          base64: result.assets[0].base64,
          uriDefault: result.assets[0].uri,
        });
        setImageImported(newImageImportedArray);
      }
    } else {
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de l'importation de l'image",
      );
    }
  };

  const removeThisImage = (index: number) => {
    let newImageImportedArray = [...imageImported];
    newImageImportedArray.splice(index, 1);
    setImageImported(newImageImportedArray);
  };

  const handleContinueStepper = () => {
    if (imageImported.length !== 0) {
      //console.log("valueForStepper step before dispatch : ", valueForStepper);
      dispatch(setProduct(valueForStepper));
      navigation.navigate("stepper_screen_3");
    }
  };

  const cancelPublish = () => {
    dispatch(reinitializeProduct());
    navigation.navigate("main_tab", { screen: "publish_screen" });
  };

  //all effects
  useEffect(() => {
    if (imageImported.length !== 0) {
      let imageImportedBase64 = imageImported.map((image) => ({
        base64: image.base64,
      }));
      setValueForStepper((prevState) => ({
        ...prevState,
        uploaded_images: imageImportedBase64,
      }));
      setDisableButton(false);
    }
  }, [imageImported]);

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Publication">
      <Box width={"100%"}>
        <Icon
          name="close"
          size={Size.ICON_LARGE}
          color={colors.black}
          containerStyle={{
            position: "relative",
            right: -160,
          }}
          onPress={() => cancelPublish()}
        />
      </Box>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box marginTop={"m"}>
          <Text
            variant={"primary"}
            color={"blue"}
            textDecorationLine={"underline"}
            marginBottom={"xs"}
          >
            Etape 2:
          </Text>
          <Text variant={"title"} color="black">
            Choisir les photos de votre produit
          </Text>
          <Text variant={"tertiary"} color={"error"}>
            NB: Vous pouvez importer 3 GRATUITEMENT!
          </Text>
          <Box marginVertical={"xs"}>
            <Box flexDirection={"column"} flex={1} alignItems={"center"}>
              {imageImported.length < 3 ? (
                <Box
                  borderWidth={1}
                  height={100}
                  width={100}
                  justifyContent={"center"}
                  borderStyle={"dashed"}
                >
                  <Icon
                    name="image"
                    size={Size.ICON_LARGE}
                    color={colors.text}
                    onPress={() => pickImages()}
                  />
                </Box>
              ) : null}
            </Box>
            {imageImported.length !== 0 && (
              <Box
                marginVertical={"s"}
                flexDirection={"row"}
                flex={1}
                justifyContent={"space-evenly"}
                flexWrap={"wrap"}
              >
                {imageImported.map((image, index) => (
                  <Box key={index}>
                    <Image
                      source={{ uri: image.uriDefault }}
                      style={{
                        width: Size.IMAGE_MEDIUM,
                        height: Size.IMAGE_MEDIUM,
                        borderRadius: borderRadii.xs,
                        marginVertical: 5,
                      }}
                    />
                    <Box position={"absolute"} top={8} right={8}>
                      <Icon
                        name="close"
                        size={Size.ICON_MEDIUM}
                        color={colors.black}
                        onPress={() => removeThisImage(index)}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <Row alignItems={"center"} justifyContent="space-around">
            <Button
              height={50}
              alignItems={"center"}
              justifyContent={"center"}
              width={150}
              variant={"tertiary"}
              label="Précédent"
              onPress={() => navigation.goBack()}
            />
            <Button
              height={50}
              alignItems={"center"}
              justifyContent={"center"}
              width={150}
              disabled={disableButton}
              variant={"secondary"}
              label="Continuer"
              onPress={() => handleContinueStepper()}
            />
          </Row>
        </Box>
      </ScrollView>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
