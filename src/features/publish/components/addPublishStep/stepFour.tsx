import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Icon, Input, MainScreen, Row, Text } from "_shared";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { stepper5NavigationTypes } from "../../types";
import { useAppDispatch, useAppSelector } from "_store";
import { useEffect, useState } from "react";
import { selectors, setProduct } from "../../publishSlice";

export default function StepFour() {
  const navigation = useNavigation<stepper5NavigationTypes>();
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const currentProduct = useAppSelector(selectors.selectProductToPublish);
  const [valueForStepper, setValueForStepper] = useState(currentProduct);
  const [disableButton, setDisableButton] = useState(true);
  const [descriptionProduct, setDescriptionProduct] = useState("");

  const handleContinueStepper = () => {
    if (true) {
      //console.log("valueForStepper step before dispatch : ", valueForStepper);
      dispatch(setProduct(valueForStepper));
      navigation.navigate("stepper_screen_5");
    }
  };

  //all effects
  useEffect(() => {
    setValueForStepper((prevState) => ({
      ...prevState,
      description: descriptionProduct,
    }));
    if (descriptionProduct !== "") {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [descriptionProduct]);

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Publication">
      <Box marginTop={"m"}>
        <Text
          variant={"primary"}
          color={"blue"}
          textDecorationLine={"underline"}
          marginBottom={"xs"}
        >
          Etape 4:
        </Text>
        <Text variant={"title"} color="black">
          Insérer ici la description de votre produit :
        </Text>
        <Text variant={"tertiary"} color={"error"}>
          NB: Veuillez remplir le champ
        </Text>
        <Box marginVertical={"xs"}>
          <Input
            placeholder="Description de votre produit ou annonce : "
            value={descriptionProduct}
            onChangeText={(text) => setDescriptionProduct(text)}
            multiline={true}
            numberOfLines={8}
            textAlignVertical={"top"}
          />
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
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
