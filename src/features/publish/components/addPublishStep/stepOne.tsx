import { useState } from "react";
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
import { useGetCategoryQuery } from "../../../sharedApi";

export default function StepOne() {
  const navigation = useNavigation<stepper2NavigationTypes>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const [typeProduct, setTypeProduct] = useState<"offer" | "search">("offer");
  const [selectCategorie, setSelectCategorie] = useState("");
  const {
    data,
    isError: isErrorCategory,
    isLoading: isCategoriesLoading,
    isFetching: isCategoriesFetching,
    refetch,
    error: errorCategory,
  } = useGetCategoryQuery(undefined);

  return (
    <RequestLoader isLoading={isCategoriesFetching || isCategoriesLoading}>
      <RequestError
        isError={isErrorCategory}
        errorStatus={errorCategory?.status}
        onRefresh={() => refetch()}
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
              placeholder="Nom"
              value="Kapa"
              iconLeft={{
                name: "info",
                size: Size.ICON_MEDIUM,
                color: colors.text,
              }}
            />
          </Box>
          <Box
            borderWidth={1}
            borderRadius={"xs"}
            marginBottom={"s"}
            borderColor={"secondary"}
          >
            <Picker
              selectedValue={selectCategorie}
              onValueChange={(itemValue, itemIndex) =>
                setSelectCategorie(itemValue)
              }
            >
              {!data ||
                data?.categories?.length === 0 ||
                (data?.categories === undefined && (
                  <Picker.Item
                    label={"Choisir"}
                    value={"Veuillez choisir vos types de ventes"}
                  />
                ))}
              {data &&
                data?.categories.map((category) => (
                  <Picker.Item
                    key={category.id}
                    label={category.name}
                    value={category.name}
                  />
                ))}
            </Picker>
          </Box>
          <Row justifyContent={"flex-start"} alignItems={"center"}>
            <RadioButton
              value="offer"
              color={colors.primary}
              status={typeProduct === "offer" ? "checked" : "unchecked"}
              onPress={() => setTypeProduct("offer")}
            />
            <Text variant="tertiary">Offre</Text>
            <RadioButton
              value="search"
              color={colors.primary}
              status={typeProduct === "search" ? "checked" : "unchecked"}
              onPress={() => setTypeProduct("search")}
            />
            <Text variant="tertiary">Recherche</Text>
          </Row>
          <Button
            variant={"secondary"}
            label="Continuer"
            onPress={() => navigation.navigate("stepper_screen_2")}
          />
        </Box>
      </RequestError>
    </RequestLoader>
  );
}

const styles = StyleSheet.create({});
