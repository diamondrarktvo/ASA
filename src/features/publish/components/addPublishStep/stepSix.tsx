import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Icon, Input, MainScreen, Row, Text } from "_shared";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { stepper2NavigationTypes, stepper7NavigationTypes } from "../../types";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useGetLocation } from "_hooks";
import { useAppDispatch, useAppSelector } from "_store";
import { reinitializeProduct, selectors, setProduct } from "../../publishSlice";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { transformNameToGeocode } from "../../utilsPublish";

export default function StepSix() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const { position, setPosition, errorMsgLocation } = useGetLocation();
  const [disableButton, setDisableButton] = useState(true);
  const [cityName, setCityName] = useState("Antananarivo");
  const currentProduct = useAppSelector(selectors.selectProductToPublish);
  const [valueForStepper, setValueForStepper] = useState(currentProduct);
  const [isSearchingName, setIsSearchingName] = useState(false);

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

  const cancelPublish = () => {
    dispatch(reinitializeProduct());
    navigation.navigate("main_tab", { screen: "publish_screen" });
  };

  console.log("searchin ", isSearchingName);

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Publication">
      <ScrollView>
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
              iconRight={{
                name: "search",
                size: Size.ICON_MEDIUM,
                color: colors.text,
                onPress: () => {
                  if (cityName !== "") {
                    setIsSearchingName(true);
                    transformNameToGeocode(cityName)
                      .then((data) => {
                        setIsSearchingName(false);
                        setPosition(data);
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                        setIsSearchingName(false);
                      });
                  }
                },
              }}
            />
          </Box>
          <Box
            height={300}
            width={"100%"}
            marginBottom={"s"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {position.longitude && position.latitude && !isSearchingName ? (
              <MapView
                provider={PROVIDER_GOOGLE}
                style={[
                  StyleSheet.absoluteFillObject,
                  { width: "100%", height: 300 },
                ]}
                initialRegion={{
                  latitude: position.latitude,
                  longitude: position.longitude,
                  latitudeDelta: 0.04,
                  longitudeDelta: 0.05,
                }}
                showsUserLocation={true}
                userLocationAnnotationTitle="Vous êtes ici"
                followsUserLocation={true}
              >
                <Marker
                  draggable
                  key={"Vous êtes ici	"}
                  coordinate={position}
                  title={"Vous êtes ici	"}
                  onDragEnd={(e) => setPosition(e.nativeEvent.coordinate)}
                />
              </MapView>
            ) : (
              <Text variant={"tertiary"} textAlign={"center"}>
                Chargement de la carte du monde ...
              </Text>
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
              disabled={disableButton}
              width={150}
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
