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

  const bottomSheetRef = useRef(null);

  const renderBackDrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} opacity={0.6} />
    ),
    [],
  );

  const openBottomSheet = () => {
    if (bottomSheetRef !== null || bottomSheetRef !== undefined) {
      return bottomSheetRef.current.present();
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
          <TouchableOpacity onPress={() => bottomSheetRef.current.close()}>
            <Icon name="close" size={Size.ICON_LARGE} color={colors.text} />
          </TouchableOpacity>
        </Row>
        <TouchableOpacity onPress={() => bottomSheetRef.current.close()}>
          <Row
            alignItems="center"
            marginTop="m"
            width="70%"
            justifyContent="space-between"
          >
            <Icon name="delete" size={Size.ICON_LARGE} color={colors.error} />
            <Text variant="title" color="error">
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
