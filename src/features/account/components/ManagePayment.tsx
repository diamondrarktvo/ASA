import {
  Box,
  Image,
  MainScreen,
  Text,
  Column,
  Input,
  Button,
  Row,
  TouchableOpacity,
  Icon,
  RequestLoader,
  HeaderStackNavNormal,
} from "_shared";
import { useMemo, useRef, useCallback, useState, useEffect } from "react";
import { Theme, Size } from "_theme";
import { useTheme } from "@shopify/restyle";
import { StyleSheet, ScrollView } from "react-native";
import { ScrollView as ScrollViewBottomSheet } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useAppDispatch, useAppSelector } from "_store";
import { formatDate, storeObjectDataToAsyncStorage } from "_utils";
import { RadioButton, Snackbar } from "react-native-paper";

export default function ManagePayment() {
  const theme = useTheme<Theme>();
  const dispatch = useAppDispatch();
  const { borderRadii, colors, spacing } = theme;
  const token = useAppSelector((state) => state.account.token);
  const [checkPayment, setCheckPayment] = useState<{
    mobileMoney: boolean;
    payPal: boolean;
    visa: boolean;
  }>({ mobileMoney: false, payPal: false, visa: false });

  //state data

  //bottomsheet
  const snapPoints = useMemo(() => [1, "80%"], []);

  const mobileMoneybottomSheetRef = useRef<BottomSheetModal | null>(null);
  const payPalbottomSheetRef = useRef<BottomSheetModal | null>(null);
  const visabottomSheetRef = useRef<BottomSheetModal | null>(null);

  const renderBackDrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} opacity={0.6} />
    ),
    [],
  );

  const openBottomSheet = (bottomSheetRef) => {
    if (bottomSheetRef !== null && bottomSheetRef.current !== null) {
      return bottomSheetRef.current.present();
    }
    return;
  };

  const closeBottomSheet = (bottomSheetRef) => {
    if (bottomSheetRef !== null && bottomSheetRef.current !== null) {
      return bottomSheetRef.current.close();
    }
    return;
  };

  //effect
  useEffect(() => {}, []);

  return (
    <MainScreen typeOfScreen="stack">
      <RequestLoader isLoading={false}>
        <HeaderStackNavNormal title={"Moyens de paiement"} />

        <Text variant={"secondary"} mt={"xs"}>
          Vous pouvez gérer ici vos identifiants pour le mode de payement en
          ligne
        </Text>

        <Box mt={"s"}>
          <Button
            variant={checkPayment.mobileMoney ? "primary" : "secondary"}
            label={"Mobile money"}
            onPress={() => openBottomSheet(mobileMoneybottomSheetRef)}
          />
          <Button
            variant={checkPayment.payPal ? "primary" : "secondary"}
            my={"s"}
            label={"Paypal"}
            onPress={() => openBottomSheet(payPalbottomSheetRef)}
          />
          <Button
            variant={checkPayment.visa ? "primary" : "secondary"}
            label={"VISA"}
            onPress={() => openBottomSheet(visabottomSheetRef)}
          />
        </Box>

        {/**Modal and snack bar */}
        <BottomSheetModal
          backdropComponent={renderBackDrop}
          ref={mobileMoneybottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          style={styles.bottomSheet_container}
        >
          <Row alignItems="center" width="90%" justifyContent="space-between">
            <TouchableOpacity
              onPress={() => closeBottomSheet(mobileMoneybottomSheetRef)}
            >
              <Icon name="close" size={Size.ICON_MEDIUM} color={colors.text} />
            </TouchableOpacity>
            <Text variant="primary" textAlign="center">
              Ajouter votre numéro téléphone mobile
            </Text>
          </Row>
        </BottomSheetModal>

        <BottomSheetModal
          backdropComponent={renderBackDrop}
          ref={payPalbottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          style={styles.bottomSheet_container}
        >
          <Row alignItems="center" width="90%" justifyContent="space-between">
            <TouchableOpacity
              onPress={() => closeBottomSheet(payPalbottomSheetRef)}
            >
              <Icon name="close" size={Size.ICON_MEDIUM} color={colors.text} />
            </TouchableOpacity>
            <Text variant="primary" textAlign="center">
              Ajouter votre compte Paypal
            </Text>
          </Row>
        </BottomSheetModal>

        <BottomSheetModal
          backdropComponent={renderBackDrop}
          ref={visabottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          style={styles.bottomSheet_container}
        >
          <Row alignItems="center" width="90%" justifyContent="space-between">
            <TouchableOpacity
              onPress={() => closeBottomSheet(visabottomSheetRef)}
            >
              <Icon name="close" size={Size.ICON_MEDIUM} color={colors.text} />
            </TouchableOpacity>
            <Text variant="primary" textAlign="center">
              Ajouter votre compte VISA
            </Text>
          </Row>
        </BottomSheetModal>
        <Snackbar
          visible={false}
          onDismiss={() => null}
          action={{
            label: "Ok",
            onPress: () => {
              // Do something
            },
          }}
        >
          {"Hello"}
        </Snackbar>
      </RequestLoader>
    </MainScreen>
  );
}

const styles = StyleSheet.create({
  box_with_shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomSheet_container: {
    paddingHorizontal: "4%",
  },
});
