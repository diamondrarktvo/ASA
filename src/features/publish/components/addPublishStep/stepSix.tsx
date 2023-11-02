import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Icon, Input, MainScreen, Row, Text } from "_shared";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { stepper7NavigationTypes } from "../../types";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useGetLocation } from "_hooks";
import { useAppDispatch, useAppSelector } from "_store";
import { selectors, setProduct } from "../../publishSlice";
import { useEffect, useState } from "react";

export default function StepSix() {
  const navigation = useNavigation<stepper7NavigationTypes>();
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const { position, errorMsgLocation } = useGetLocation();
  const [disableButton, setDisableButton] = useState(true);
  const [cityName, setCityName] = useState("Antananarivo");
  const currentProduct = useAppSelector(selectors.selectProductToPublish);
  const [valueForStepper, setValueForStepper] = useState(currentProduct);

  //all effects
  useEffect(() => {
    setValueForStepper((prevState) => ({
      ...prevState,
      location: cityName,
    }));
    if (cityName !== "") {
      setDisableButton(false);
    }
  }, [cityName, currentProduct]);

  const handleContinueStepper = () => {
    if (cityName !== "") {
      dispatch(setProduct(valueForStepper));
      navigation.navigate("stepper_screen_7");
    }
  };

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Publication">
      <Box marginTop={"m"}>
        <Text
          variant={"primary"}
          color={"blue"}
          textDecorationLine={"underline"}
          marginBottom={"xs"}
        >
          Etape 6:
        </Text>
        <Text variant={"title"} color="black">
          Où les clients peuvent-ils vous trouver?
        </Text>
        <Text variant={"tertiary"} color={"error"}>
          NB: Vous pouvez entrer dans la barre de recherche le nom de votre
          ville
        </Text>
        <Box marginVertical={"xs"}>
          <Input
            placeholder="ex: Antananarivo"
            value={cityName}
            onChangeText={(text) => setCityName(text)}
            iconLeft={{
              name: "place",
              size: Size.ICON_MEDIUM,
              color: colors.text,
            }}
          />
        </Box>
        <Box height={250} width={"100%"} marginBottom={"s"}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={[StyleSheet.absoluteFillObject]}
            initialRegion={{
              latitude: position.latitude,
              longitude: position.longitude,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0021,
            }}
            showsUserLocation={true}
            userLocationAnnotationTitle="Vous êtes ici"
            followsUserLocation={true}
          >
            <Marker
              key={"Vous êtes ici	"}
              coordinate={position}
              title={"Vous êtes ici	"}
            />
          </MapView>
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
            disabled={disableButton}
            width={150}
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
