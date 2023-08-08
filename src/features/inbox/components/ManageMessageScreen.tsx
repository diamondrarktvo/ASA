import { StyleSheet } from "react-native";
import { useMemo, useRef, useCallback } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import {
  MainScreen,
  Text,
  Box,
  TouchableOpacity,
  Row,
  Icon,
  HeaderStackNavNormal,
} from "_shared";
import { StackParamList } from "src/navigations/Types";
import { useTheme } from "@shopify/restyle";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { Size, Theme } from "_theme";

export default function ManageMessageScreen() {
  //const navigation = useNavigation<>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const { emetteur } =
    useRoute<RouteProp<StackParamList, "manage_message">>()?.params;

  //bottomsheet
  const snapPoints = useMemo(() => [1, "20%"], []);

  const bottomSheetRef = useRef<BottomSheetModal | null>(null);

  const renderBackDrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} opacity={0.6} />
    ),
    [],
  );

  const openBottomSheet = () => {
    if (bottomSheetRef !== null && bottomSheetRef.current !== null) {
      return bottomSheetRef.current.present();
    }
    return;
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef !== null && bottomSheetRef.current !== null) {
      return closeBottomSheet();
    }
    return;
  };

  return (
    <MainScreen typeOfScreen="stack">
      <HeaderStackNavNormal
        title={emetteur}
        subTitle="Délai de réponse : 5 heures"
        iconRight="more-vert"
        iconRightOnPress={() => openBottomSheet()}
      />
      <Box flex={1} justifyContent={"center"} alignItems="center">
        <Text variant="primary">
          Vos messages avec {emetteur} apparaissent ici.
        </Text>
      </Box>

      <BottomSheetModal
        backdropComponent={renderBackDrop}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        style={styles.bottomSheet_container}
      >
        <Row alignItems="center" justifyContent="flex-start">
          <TouchableOpacity onPress={() => closeBottomSheet()}>
            <Icon name="close" size={Size.ICON_MEDIUM} color={colors.text} />
          </TouchableOpacity>
        </Row>
        <TouchableOpacity onPress={() => closeBottomSheet()}>
          <Row alignItems="center" marginTop="m" justifyContent="flex-start">
            <Icon name="delete" size={Size.ICON_MEDIUM} color={colors.error} />
            <Text
              variant={"primary"}
              color="error"
              marginLeft={"s"}
              numberOfLines={1}
            >
              Supprimer ce message
            </Text>
          </Row>
        </TouchableOpacity>
      </BottomSheetModal>
    </MainScreen>
  );
}

const styles = StyleSheet.create({
  bottomSheet_container: {
    paddingHorizontal: "4%",
  },
});
