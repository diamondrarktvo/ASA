import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Icon,
  Input,
  RequestError,
  RequestLoader,
  Row,
  Text,
} from "_shared";
import { RadioButton } from "react-native-paper";
import { Size, Theme } from "_theme";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@shopify/restyle";
import { CheckBox } from "@rneui/themed";
import { stepper2NavigationTypes } from "../../types";
import {
  useGetCategoryQuery,
  useGetSubCategoryQuery,
} from "../../../sharedApi";
import { useAppDispatch, useAppSelector } from "_store";
import { selectors, setProduct } from "../../publishSlice";

export default function StepOne() {
  const navigation = useNavigation<stepper2NavigationTypes>();
  const currentProduct = useAppSelector(selectors.selectProductToPublish);
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const {
    data,
    isError: isErrorCategory,
    isLoading: isCategoriesLoading,
    isFetching: isCategoriesFetching,
    refetch: refetchCategories,
    error: errorCategory,
  } = useGetCategoryQuery(undefined);
  const [selectCategorie, setSelectCategorie] = useState(
    data?.categories[0].id,
  );
  const {
    data: allSubCategories,
    isError: isErrorSubCategory,
    isLoading: isSubCategoriesLoading,
    isFetching: isSubCategoriesFetching,
    refetch: refetchSubCategories,
    error: errorSubCategory,
  } = useGetSubCategoryQuery(selectCategorie, {
    skip: selectCategorie === 0,
  });

  const [selectSubCategorie, setSelectSubCategorie] = useState(
    allSubCategories &&
      allSubCategories.length &&
      allSubCategories[0]?.id !== undefined
      ? allSubCategories[0]?.id
      : 0,
  );
  const [selectSubCategorieName, setSelectSubCategorieName] = useState(
    allSubCategories &&
      allSubCategories.length &&
      allSubCategories[0]?.nom !== undefined
      ? allSubCategories[0]?.nom
      : "",
  );
  const [productName, setProductName] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [typeProduct, setTypeProduct] = useState<"Offre" | "Recherche">(
    "Offre",
  );
  const [valueForStepper, setValueForStepper] = useState(currentProduct);

  const handleContinueStepper = () => {
    if (productName !== "") {
      dispatch(setProduct(valueForStepper));
      navigation.navigate("stepper_screen_2");
    }
  };

  //all effects
  useEffect(() => {
    setValueForStepper((prevState) => ({
      ...prevState,
      type: typeProduct,
      name: productName,
      sub_category_id: selectSubCategorie,
      sub_category_name: selectSubCategorieName,
    }));
    if (productName !== "" && selectSubCategorie !== 0) {
      setDisableButton(false);
    }
  }, [typeProduct, productName, selectSubCategorie]);

  useEffect(() => {
    refetchSubCategories();
    if (
      allSubCategories &&
      allSubCategories.length !== 0 &&
      allSubCategories[0]?.id &&
      allSubCategories[0]?.nom
    ) {
      setSelectSubCategorie(allSubCategories[0]?.id);
      setSelectSubCategorieName(allSubCategories[0]?.nom);
    } else if (
      allSubCategories === undefined ||
      allSubCategories.length === 0
    ) {
      setSelectSubCategorie(0);
      setSelectSubCategorieName("");
    }
  }, [selectCategorie, allSubCategories]);

  return (
    <RequestLoader
      isLoading={
        isCategoriesFetching ||
        isCategoriesLoading ||
        isSubCategoriesLoading ||
        isSubCategoriesFetching
      }
    >
      <RequestError
        isError={isErrorCategory}
        errorStatus={errorCategory?.status}
        onRefresh={() => refetchCategories()}
      >
        <Box marginTop={"m"}>
          <Text
            variant={"primary"}
            color={"blue"}
            textDecorationLine={"underline"}
            marginBottom={"xs"}
          >
            Etape 1:
          </Text>
          <Text variant={"title"} color="black">
            Quel produit voulez-vous publier ?
          </Text>
          <Text variant={"tertiary"} color={"error"}>
            NB: Veuillez remplir chaque étape afin de procéder à votre
            publication!
          </Text>
          <Box marginVertical={"xs"}>
            <Input
              placeholder="Nom du produit"
              value={productName}
              onChangeText={(text) => setProductName(text)}
              iconLeft={{
                name: "info",
                size: Size.ICON_MEDIUM,
                color: colors.text,
              }}
            />
          </Box>
          <Text variant={"secondary"} color={"text"}>
            Catégorie
          </Text>
          <Box
            borderWidth={1}
            borderRadius={"xs"}
            marginBottom={"s"}
            borderColor={"secondary"}
          >
            <Picker
              selectedValue={selectCategorie}
              onValueChange={(itemValue, itemIndex) => {
                if (itemValue !== 0) {
                  setSelectCategorie(itemValue);
                }
              }}
            >
              <Picker.Item label={"Categorie"} value={0} />
              {data &&
                data?.categories.map((category) => (
                  <Picker.Item
                    key={category.id}
                    label={category.name}
                    value={category.id}
                  />
                ))}
            </Picker>
          </Box>
          <Text variant={"secondary"} color={"text"}>
            Sous-catégorie
          </Text>
          <Box
            borderWidth={1}
            borderRadius={"xs"}
            marginBottom={"s"}
            borderColor={"secondary"}
          >
            <Picker
              selectedValue={selectSubCategorie}
              onValueChange={(itemValue, itemIndex) => {
                if (itemValue !== 0) {
                  setSelectSubCategorie(itemValue);
                }
              }}
            >
              <Picker.Item label={"Sous-catégorie"} value={0} />
              {allSubCategories &&
                allSubCategories?.length !== 0 &&
                allSubCategories?.map((subCategory) => (
                  <Picker.Item
                    key={subCategory?.id}
                    label={subCategory?.nom}
                    value={subCategory?.id}
                  />
                ))}
            </Picker>
          </Box>
          <Row justifyContent={"flex-start"} alignItems={"center"}>
            <RadioButton
              value="offer"
              color={colors.primary}
              status={typeProduct === "Offre" ? "checked" : "unchecked"}
              onPress={() => setTypeProduct("Offre")}
            />
            <Text variant="tertiary">Offre</Text>
            <RadioButton
              value="search"
              color={colors.primary}
              status={typeProduct === "Recherche" ? "checked" : "unchecked"}
              onPress={() => setTypeProduct("Recherche")}
            />
            <Text variant="tertiary">Recherche</Text>
          </Row>
          <Button
            disabled={disableButton}
            variant={"secondary"}
            label="Continuer"
            onPress={() => handleContinueStepper()}
          />
        </Box>
      </RequestError>
    </RequestLoader>
  );
}

const styles = StyleSheet.create({});
