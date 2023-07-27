import { StyleSheet } from "react-native";
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
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";

export default function StepTwo() {
  const navigation = useNavigation<stepper3NavigationTypes>();
  const theme = useTheme<Theme>();
  const [imageImported, setImageImported] = useState<boolean | string>(true);
  const { borderRadii, colors } = theme;

  //function
  const pickImages = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageImported(result.assets[0].uri);
    }
  };

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Publication">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box marginTop={"m"}>
          <Text
            variant={"primary"}
            color={"blue"}
            textDecorationLine={"underline"}
            marginBottom={"xs"}
          >
            Step 2:
          </Text>
          <Text variant={"title"} color="black">
            Choisir les photos de votre produit
          </Text>
          <Text variant={"tertiary"} color={"error"}>
            NB: Vous pouvez importer 3 GRATUITEMENT!
          </Text>
          <Box marginVertical={"xs"}>
            <Box flexDirection={"column"} flex={1} alignItems={"center"}>
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
            </Box>
            {imageImported && (
              <Box
                marginVertical={"s"}
                flexDirection={"row"}
                flex={1}
                justifyContent={"space-evenly"}
                flexWrap={"wrap"}
              >
                <Image
                  source={require("_images/logoASA.jpeg")}
                  style={{
                    width: Size.IMAGE_MEDIUM,
                    height: Size.IMAGE_MEDIUM,
                    borderRadius: borderRadii.xs,
                    marginVertical: 5,
                  }}
                />
                <Image
                  source={require("_images/logoASA.jpeg")}
                  style={{
                    width: Size.IMAGE_MEDIUM,
                    height: Size.IMAGE_MEDIUM,
                    borderRadius: borderRadii.xs,
                    marginVertical: 5,
                  }}
                />
                <Image
                  source={require("_images/logoASA.jpeg")}
                  style={{
                    width: Size.IMAGE_MEDIUM,
                    height: Size.IMAGE_MEDIUM,
                    borderRadius: borderRadii.xs,
                    marginVertical: 5,
                  }}
                />
                <Image
                  source={require("_images/logoASA.jpeg")}
                  style={{
                    width: Size.IMAGE_MEDIUM,
                    height: Size.IMAGE_MEDIUM,
                    borderRadius: borderRadii.xs,
                    marginVertical: 5,
                  }}
                />
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
              variant={"secondary"}
              label="Continuer"
              onPress={() => navigation.navigate("stepper_screen_3")}
            />
          </Row>
        </Box>
      </ScrollView>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
