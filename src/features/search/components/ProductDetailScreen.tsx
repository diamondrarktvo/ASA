import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import {
  Box,
  Button,
  Column,
  Icon,
  Image,
  MainScreen,
  RequestError,
  RequestLoader,
  Row,
  Text,
} from "_shared";
import { Constantes, formatDateToString } from "_utils";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@shopify/restyle";
import { Size, Theme } from "_theme";
import { annonceType } from "../types";
import { ScrollView } from "react-native-gesture-handler";
import { CategoryType } from "../../types";
import { useState } from "react";
import { useEffect } from "react";
import { Skeleton } from "@rneui/themed";
import { useGetOnAnnonceQuery } from "../searchApi";

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const idOfProduct = route.params?.idOfProduct;

  const {
    data: annonce,
    isError: isErrorAnnonce,
    isLoading: isAnnonceLoading,
    isFetching: isAnnonceFetching,
    refetch: refetchAnnonce,
    error: errorAnnonce,
  } = useGetOnAnnonceQuery(idOfProduct, {
    skip: !idOfProduct,
  });

  //effect
  console.log("annonce : ", annonce);

  //components
  const renderItemCriteria: ListRenderItem<CategoryType> = ({ item }) => {
    return (
      <Box
        key={item.id}
        marginRight={"xs"}
        height={80}
        width={130}
        borderRadius={"xxs"}
        alignItems={"flex-start"}
        justifyContent={"flex-end"}
      >
        <ImageBackground
          source={
            item.image ? { uri: item.image } : require("_images/logo.jpg")
          }
          blurRadius={8}
          style={{
            marginHorizontal: 4,
            height: 80,
            width: 130,
          }}
          imageStyle={{
            resizeMode: "cover",
            borderRadius: 6,
          }}
        >
          <Box
            style={[StyleSheet.absoluteFillObject, styles.maskImageCatg]}
          ></Box>
          <Text
            variant={"tertiary"}
            fontWeight={"bold"}
            color={"white"}
            paddingLeft={"m"}
            paddingBottom={"s"}
            style={{
              position: "absolute",
              bottom: 3,
              left: 3,
            }}
          >
            {item.name}
          </Text>
        </ImageBackground>
      </Box>
    );
  };

  return (
    <RequestLoader isLoading={isAnnonceLoading || isAnnonceFetching}>
      <RequestError
        isError={isErrorAnnonce}
        errorStatus={errorAnnonce?.status}
        onRefresh={() => refetchAnnonce()}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box>
            <Image
              source={
                /*
              item.pictures[0]
                ? { uri: item.pictures[0] }
                : */ require("_images/logo.jpg")
              }
              containerStyle={styles.imageAnnonce}
              PlaceholderContent={
                <ActivityIndicator
                  color="#2652AA"
                  style={styles.spinnerAnnonce}
                />
              }
            />
            <Row
              style={{ position: "absolute" }}
              justifyContent="space-between"
              width="100%"
              paddingHorizontal="s"
              paddingTop="s"
            >
              <Icon
                name="arrow-back"
                size={Size.ICON_MEDIUM}
                color={colors.black}
                containerStyle={{
                  backgroundColor: "white",
                  borderRadius: 50,
                  padding: 6,
                }}
                onPress={() => navigation.goBack()}
              />
              <Icon
                name="favorite-border"
                size={Size.ICON_MEDIUM}
                color={colors.black}
                containerStyle={{
                  backgroundColor: "white",
                  borderRadius: 50,
                  padding: 6,
                }}
              />
            </Row>
          </Box>

          <MainScreen typeOfScreen="stack">
            <Text variant={"primaryBold"}>{annonce?.name}</Text>
            <Text variant={"primary"}>{annonce?.price} Ar</Text>
            <Text variant={"tertiary"}>
              {" "}
              Publié le{" "}
              {annonce?.publication_date &&
                formatDateToString(annonce?.publication_date)}
            </Text>

            <Box mt={"s"}>
              <Text variant={"secondary"} fontWeight={"600"}>
                Critères
              </Text>
            </Box>
            <Box mt={"s"}>
              <Text variant={"secondary"} fontWeight={"600"}>
                Description
              </Text>
              <Text variant={"tertiary"}>{annonce?.description}</Text>
            </Box>

            <Box mt={"s"}>
              <Text variant={"secondary"} fontWeight={"600"}>
                Localisation
              </Text>
              <Text variant={"tertiary"}>{annonce?.location}</Text>
            </Box>

            <Box mt={"s"}>
              <Text variant={"secondary"} fontWeight={"600"}>
                Quantité
              </Text>
              <Text variant={"tertiary"}>{annonce?.quantity}</Text>
            </Box>

            <Box mt={"s"}>
              <Text variant={"secondary"} fontWeight={"600"}>
                Contact du vendeur
              </Text>
              <Text variant={"tertiary"}>{annonce?.phone_number_contact}</Text>
            </Box>
          </MainScreen>
        </ScrollView>
      </RequestError>
    </RequestLoader>
  );
}

const styles = StyleSheet.create({
  imageAnnonce: {
    borderRadius: 4,
    height: 280,
    width: "100%",
  },
  maskImageCatg: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 6,
    height: 80,
    width: 130,
  },
  spinnerAnnonce: {
    height: 100,
    width: 100,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  spinnerCatg: {
    height: 120,
    width: 140,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
});
