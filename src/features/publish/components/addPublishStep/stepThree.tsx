import { Platform, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Icon,
  Input,
  MainScreen,
  RequestConnection,
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
import { reinitializeProduct, selectors, setProduct } from "../../publishSlice";
import { useEffect, useState } from "react";
import { useGetCriteriaQuery } from "../../../sharedApi";
import { RadioButton } from "react-native-paper";
import { isAllCriteriaRequiredSelected } from "../../utilsPublish";
import { verifyText } from "_utils";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function StepThree() {
  const navigation = useNavigation();
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
  const [currentIdOfInputDate, setCurrentIdOfInputDate] = useState(0);
  const [dateCurrentSelected, setDateCurrentSelected] = useState<Date>();

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

  const handleContinueStepper = () => {
    //console.log("valueForStepper step before dispatch : ", valueForStepper);
    dispatch(setProduct(valueForStepper));
    navigation.navigate("stepper_screen_4");
  };

  /**
   *
   * @param criteriaId
   * @param value
   *
   */
  const handleAddCriteriaForProduct = (
    criteriaId: number,
    value: string | number | Date,
    isNumberOnly?: boolean,
  ) => {
    if (!criteriaId) return;
    let criteriaNameAlreadySelected =
      criteriaSelected.length > 0
        ? criteriaSelected.map((criteriaItem) => criteriaItem.criteria)
        : [];
    if (criteriaNameAlreadySelected.includes(criteriaId)) {
      let criteriaSelectedUpdated = criteriaSelected.filter(
        (criteriaItem) => criteriaItem.criteria !== criteriaId,
      );
      if (value) {
        if (!isNumberOnly) {
          setCriteriaSelected([
            ...criteriaSelectedUpdated,
            { criteria: criteriaId, value: value },
          ]);
        } else {
          setCriteriaSelected([
            ...criteriaSelectedUpdated,
            { criteria: criteriaId, value: verifyText(value) ? value : "" },
          ]);
        }
      } else {
        setCriteriaSelected([...criteriaSelectedUpdated]);
      }
    } else {
      setCriteriaSelected([
        ...criteriaSelected,
        { criteria: criteriaId, value: value },
      ]);
    }
    setCurrentIdOfInputDate(0);
  };

  const cancelPublish = () => {
    dispatch(reinitializeProduct());
    navigation.navigate("main_tab", { screen: "publish_screen" });
  };

  console.log("criteriaSelected : ", criteriaSelected);

  useEffect(() => {
    if (allCriteria && allCriteria.length > 0) {
      setDisableButton(
        !isAllCriteriaRequiredSelected(allCriteria, criteriaSelected),
      );
    }
  }, [allCriteria, criteriaSelected]);

  useEffect(() => {
    if (criteriaSelected.length !== 0) {
      setValueForStepper((prevState) => ({
        ...prevState,
        product_criteria: criteriaSelected,
      }));
    }
  }, [criteriaSelected]);

  useEffect(() => {
    if (dateCurrentSelected) {
      handleAddCriteriaForProduct(currentIdOfInputDate, dateCurrentSelected);
    }
  }, [dateCurrentSelected]);

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Publication">
      <RequestConnection>
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
                          {(criteria.type === "text" ||
                            criteria.type === "date") && (
                            <Input
                              placeholder={criteria.name}
                              value={
                                criteriaSelected.find(
                                  (itemSelected) =>
                                    itemSelected.criteria === criteria.id,
                                )?.value as string
                              }
                              onChangeText={(text) =>
                                handleAddCriteriaForProduct(criteria.id, text)
                              }
                            />
                          )}
                          {criteria.type === "integer" && (
                            <Input
                              placeholder={criteria.name}
                              keyboardType="numeric"
                              value={
                                criteriaSelected.find(
                                  (itemSelected) =>
                                    itemSelected.criteria === criteria.id,
                                )?.value as string
                              }
                              onChangeText={(text) =>
                                handleAddCriteriaForProduct(
                                  criteria.id,
                                  text,
                                  true,
                                )
                              }
                            />
                          )}
                          {/*criteria.type === "date" && (
                          <>
                            <Button
                              height={50}
                              alignItems={"center"}
                              justifyContent={"center"}
                              width={150}
                              variant={"secondary"}
                              label={
                                criteriaSelected.find(
                                  (itemSelected) =>
                                    itemSelected.criteria === criteria.id,
                                )?.value
                                  ? criteriaSelected
                                      .find(
                                        (itemSelected) =>
                                          itemSelected.criteria === criteria.id,
                                      )
                                      ?.value?.toString()
                                      .slice(0, 10)
                                  : "Choisir une date"
                              }
                              onPress={() => {
                                setCurrentIdOfInputDate(criteria.id);
                              }}
                            />
                            {show && Platform.OS === "android" && (
                              <DateTimePicker
                                testID={criteria.id.toString()}
                                value={
                                  criteriaSelected.find(
                                    (itemSelected) =>
                                      itemSelected.criteria === criteria.id,
                                  )?.value
                                    ? (criteriaSelected.find(
                                        (itemSelected) =>
                                          itemSelected.criteria === criteria.id,
                                      )?.value as Date)
                                    : new Date()
                                }
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                  setDateCurrentSelected(selectedDate);
                                }}
                                style={{
                                  width: 200,
                                  position: "relative",
                                  left: -75,
                                  marginVertical: 5,
                                }}
                              />
                            )}
                            {Platform.OS === "ios" && (
                              <DateTimePicker
                                testID={criteria.id.toString()}
                                value={
                                  criteriaSelected.find(
                                    (itemSelected) =>
                                      itemSelected.criteria === criteria.id,
                                  )?.value
                                    ? (criteriaSelected.find(
                                        (itemSelected) =>
                                          itemSelected.criteria === criteria.id,
                                      )?.value as Date)
                                    : new Date()
                                }
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                  setDateCurrentSelected(selectedDate);
                                }}
                                style={{
                                  width: 200,
                                  position: "relative",
                                  left: -75,
                                  marginVertical: 5,
                                }}
                              />
                            )}
                          </>
                              )*/}
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
                                      criteria.id,
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
      </RequestConnection>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
