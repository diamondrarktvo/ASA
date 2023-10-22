import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Icon,
  Input,
  MainScreen,
  RequestLoader,
  Row,
  Text,
} from "_shared";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { stepper4NavigationTypes } from "../../types";
import { CheckBox } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "_store";
import { selectors, setProduct } from "../../publishSlice";
import { useState } from "react";
import { useGetCriteriaQuery } from "../../../sharedApi";
import { RadioButton } from "react-native-paper";

export default function StepThree() {
  const navigation = useNavigation<stepper4NavigationTypes>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const currentProduct = useAppSelector(selectors.selectProductToPublish);
  const [valueForStepper, setValueForStepper] = useState(currentProduct);
  const currentSubCategorySelected = useAppSelector(
    selectors.getCurrentSubCategorySelected,
  );
  const dispatch = useAppDispatch();
  const [disableButton, setDisableButton] = useState(true);
  const {
    data: allCriteria,
    isError: isErrorCriteria,
    isLoading: isCriteriaLoading,
    isFetching: isCriteriaFetching,
    refetch,
    error: errorCriteria,
  } = useGetCriteriaQuery(currentSubCategorySelected, {
    skip: currentSubCategorySelected === 0,
  });

  console.log("currentSubCategorySelected : ", currentSubCategorySelected);

  console.log("allCriteria e : ", allCriteria);
  console.log("valueForStepper : ", valueForStepper);

  const handleContinueStepper = () => {
    if (true) {
      //console.log("valueForStepper step before dispatch : ", valueForStepper);
      dispatch(setProduct(valueForStepper));
      navigation.navigate("stepper_screen_4");
    }
  };

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Publication">
      <RequestLoader isLoading={isCriteriaFetching || isCriteriaLoading}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box marginTop={"m"}>
            <Text
              variant={"primary"}
              color={"blue"}
              textDecorationLine={"underline"}
              marginBottom={"xs"}
            >
              Etape 3:
            </Text>
            <Text variant={"title"} color="black">
              Les critères de votre produit ?
            </Text>
            <Text variant={"tertiary"} color={"error"}>
              NB: Veuillez cocher vos critères!
            </Text>
            <Box marginVertical={"s"}>
              <Text variant={"primary"}>
                {valueForStepper.sub_category_name}
              </Text>
              {allCriteria &&
                allCriteria.length !== 0 &&
                allCriteria.map((criteria) => (
                  <>
                    <Box key={criteria.id}>
                      <Text variant={"tertiary"}>
                        {criteria.id} {criteria.name}
                      </Text>
                      <Box flexDirection={"row"} flexWrap={"wrap"}>
                        {criteria.type === "text" && (
                          <Input placeholder={criteria.name} />
                        )}
                        {criteria.type === "choice" &&
                          criteria.response?.length > 0 &&
                          criteria.response?.map((response, index) => (
                            <Box
                              flexDirection={"row"}
                              alignItems={"center"}
                              key={index}
                            >
                              <RadioButton
                                value={response.value}
                                color={colors.primary}
                                status={"unchecked"}
                                onPress={() => console.log("pressed")}
                              />
                              <Text variant="tertiary">{response.value}</Text>
                            </Box>
                          ))}
                      </Box>
                    </Box>
                  </>
                ))}
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
                disabled={disableButton}
                onPress={() => handleContinueStepper()}
              />
            </Row>
          </Box>
        </ScrollView>
      </RequestLoader>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
