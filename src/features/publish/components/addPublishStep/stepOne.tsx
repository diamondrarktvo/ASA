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
          <Row justifyContent="space-around">
            <CheckBox
              containerStyle={{ backgroundColor: colors.mainBackground }}
              checkedColor={colors.primary}
              checked={false}
              title="Recherche"
            />
            <CheckBox
              containerStyle={{ backgroundColor: colors.mainBackground }}
              checkedColor={colors.primary}
              checked={true}
              title="Offre"
            />
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
