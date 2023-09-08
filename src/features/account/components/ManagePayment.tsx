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
  RequestError,
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
import {
  useAddPaymentMethodMutation,
  useGetAllPaymentMethodQuery,
} from "../paymentMethodApi";
import { paymentMethodState, setPaymentMethod } from "../paymentMethodeSlice";
import { useNavigation } from "@react-navigation/native";

export default function ManagePayment() {
  const theme = useTheme<Theme>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { borderRadii, colors, spacing } = theme;
  const token = useAppSelector((state) => state.account.token);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [messageForSnackbar, setMessageForSnackbar] = useState("");
  const [checkPayment, setCheckPayment] = useState<{
    mobileMoney: boolean;
    payPal: boolean;
    visa: boolean;
  }>({ mobileMoney: false, payPal: false, visa: false });
  const [valueForMobileMoney, setValueForMobileMoney] = useState({
    phone: "",
    name: "MobileMoney",
    token: token,
  });

  const [
    addPaymentMethod,
    {
      isError: isMobileMoneyError,
      isLoading: isMobileMoneyLoading,
      status,
      error,
    },
  ] = useAddPaymentMethodMutation();

  const {
    data: allPaymentMethod,
    isError: isErrorGetAllPaymentMethod,
    isLoading: isGetAllPaymentMethodLoading,
    isFetching: isGetAllPaymentFetching,
    refetch: refetchGetAllPaymentMethod,
    error: errorGetAllPaymentMethod,
  } = useGetAllPaymentMethodQuery(token);

  //all logic
  const handleAddPaymentMethod = async () => {
    addPaymentMethod(valueForMobileMoney)
      .unwrap()
      .then((res) => {
        console.log("resAPI : ", res);
        dispatch(setPaymentMethod(res));
        setCheckPayment((prevState) => ({
          ...prevState,
          mobileMoney: true,
        }));
        setVisibleSnackbar(true);
        setMessageForSnackbar("Le numéro de téléphone a été enregistré");
      })
      .catch((e) => {
        setMessageForSnackbar(e.data?.detail);
        console.log("e for method payment : ", e);
        setVisibleSnackbar(true);
      });
  };

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
  //TODO: de-comment it if update is OK
  /*useEffect(() => {
    if (allPaymentMethod && allPaymentMethod.length !== 0) {
      allPaymentMethod.map((item: paymentMethodState) => {
        if (item.name === "MobileMoney") {
          setCheckPayment((prevState) => ({
            ...prevState,
            mobileMoney: true,
          }));
        }
        if (item.name === "Paypal") {
          setCheckPayment((prevState) => ({
            ...prevState,
            payPal: true,
          }));
        }
        if (item.name === "VISA") {
          setCheckPayment((prevState) => ({
            ...prevState,
            visa: true,
          }));
        }
      });
    }
  }, [allPaymentMethod]);*/

  useEffect(() => {
    if (visibleSnackbar) {
      setTimeout(() => {
        setVisibleSnackbar(false);
      }, 3000);
    }
  }, [visibleSnackbar]);

  return (
    <MainScreen typeOfScreen="stack">
      <RequestLoader
        isLoading={
          isMobileMoneyLoading ||
          isGetAllPaymentMethodLoading ||
          isGetAllPaymentFetching
        }
      >
        <RequestError
          isError={isMobileMoneyError || isErrorGetAllPaymentMethod}
          errorStatus={error?.status || errorGetAllPaymentMethod?.status}
          onRefresh={() => navigation.goBack()}
        >
          <HeaderStackNavNormal title={"Méthodes de paiement"} />

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
                <Icon
                  name="close"
                  size={Size.ICON_MEDIUM}
                  color={colors.text}
                />
              </TouchableOpacity>
              <Text variant="primary" textAlign="center">
                {checkPayment.mobileMoney ? "Modifier " : "Ajouter"} votre
                numéro téléphone mobile
              </Text>
            </Row>

            <Box>
              <Text variant="secondary" mt="s">
                Numéro de téléphone
              </Text>
              <Input
                placeholder="Numéro de téléphone"
                value={valueForMobileMoney.phone}
                keyboardType="numeric"
                onChangeText={(text) =>
                  setValueForMobileMoney((prevState) => ({
                    ...prevState,
                    phone: text,
                  }))
                }
                mt={"s"}
              />
              <Button
                variant={"primary"}
                my={"s"}
                label={checkPayment.mobileMoney ? "Enregistrer" : "Ajouter"}
                onPress={() => handleAddPaymentMethod()}
              />
            </Box>
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
                <Icon
                  name="close"
                  size={Size.ICON_MEDIUM}
                  color={colors.text}
                />
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
                <Icon
                  name="close"
                  size={Size.ICON_MEDIUM}
                  color={colors.text}
                />
              </TouchableOpacity>
              <Text variant="primary" textAlign="center">
                Ajouter votre compte VISA
              </Text>
            </Row>
          </BottomSheetModal>
          <Snackbar
            visible={visibleSnackbar}
            onDismiss={() => null}
            action={{
              label: "Ok",
              onPress: () => null,
            }}
          >
            {messageForSnackbar}
          </Snackbar>
        </RequestError>
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
