import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Icon,
  Input,
  MainScreen,
  RequestError,
  RequestLoader,
  Row,
  Text,
} from "_shared";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { criteriaSelected, stepper4NavigationTypes } from "../../types";
import { ScrollView } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "_store";
import { selectors, setProduct } from "../../publishSlice";
import { useEffect, useState } from "react";
import { useGetCriteriaQuery } from "../../../sharedApi";
import { RadioButton } from "react-native-paper";
import { isAllCriteriaRequiredSelected } from "../../utilsPublish";

export default function StepThree() {
  const navigation = useNavigation<stepper4NavigationTypes>();
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const currentProduct = useAppSelector(selectors.selectProductToPublish);
  const [valueForStepper, setValueForStepper] = useState(currentProduct);
  const currentSubCategorySelected = useAppSelector(
    selectors.getCurrentSubCategorySelected,
  );
  const [disableButton, setDisableButton] = useState(true);
  const [criteriaSelected, setCriteriaSelected] = useState<criteriaSelected[]>(
    [],
  );

  const {
    data: allCriteria,
    isError: isErrorCriteria,
    isLoading: isCriteriaLoading,
    isFetching: isCriteriaFetching,
    refetch: refetchCriteria,
    error: errorCriteria,
  } = useGetCriteriaQuery(currentSubCategorySelected, {
    skip: currentSubCategorySelected === 0,
  });

  console.log("criteriaSelected : ", criteriaSelected);

  const handleContinueStepper = () => {
    if (true) {
      //console.log("valueForStepper step before dispatch : ", valueForStepper);
      dispatch(setProduct(valueForStepper));
      navigation.navigate("stepper_screen_4");
    }
  };

  /**
   *
   * @param criteriaName
   * @param value
   *
   */
  const handleAddCriteriaForProduct = (
    criteriaName: string,
    value: string | number,
  ) => {
    if (!criteriaName || !value) return;
    let criteriaNameAlreadySelected =
      criteriaSelected.length > 0
        ? criteriaSelected.map((criteria) => criteria.name)
        : [];
    if (criteriaNameAlreadySelected.includes(criteriaName)) {
      let criteriaSelectedUpdated = criteriaSelected.filter(
        (criteria) => criteria.name !== criteriaName,
      );
      setCriteriaSelected([
        ...criteriaSelectedUpdated,
        { name: criteriaName, value: value },
      ]);
    } else {
      setCriteriaSelected([
        ...criteriaSelected,
        { name: criteriaName, value: value },
      ]);
    }
  };

  useEffect(() => {
    if (allCriteria && allCriteria.length > 0) {
      setDisableButton(
        !isAllCriteriaRequiredSelected(allCriteria, criteriaSelected),
      );
    }
  }, [allCriteria, criteriaSelected]);

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Publication">
      <RequestLoader isLoading={isCriteriaFetching || isCriteriaLoading}>
        <RequestError
          isError={isErrorCriteria}
          errorStatus={errorCriteria?.status}
          onRefresh={() => refetchCriteria()}
        >
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
                    <Box key={criteria.id}>
                      <Text variant={"tertiary"}>{criteria.name}</Text>
                      <Box flexDirection={"row"} flexWrap={"wrap"}>
                        {criteria.type === "text" && (
                          <Input
                            placeholder={criteria.name}
                            value={
                              criteriaSelected.find(
                                (item) => item.name === criteria.name,
                              )?.value as string
                            }
                            onChangeText={(text) =>
                              handleAddCriteriaForProduct(criteria.name, text)
                            }
                          />
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
                                status={
                                  //transform value found in criteriaSelected to boolean
                                  !!criteriaSelected.find(
                                    (item) => item.value === response.value,
                                  )
                                    ? "checked"
                                    : "unchecked"
                                }
                                onPress={() =>
                                  handleAddCriteriaForProduct(
                                    criteria.name,
                                    response.value,
                                  )
                                }
                              />
                              <Text variant="tertiary">{response.value}</Text>
                            </Box>
                          ))}
                      </Box>
                    </Box>
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
        </RequestError>
      </RequestLoader>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
