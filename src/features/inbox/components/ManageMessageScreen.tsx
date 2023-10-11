import { StyleSheet } from "react-native";
import { useMemo, useRef, useCallback, useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import {
  MainScreen,
  Text,
  Box,
  TouchableOpacity,
  Row,
  Icon,
  HeaderStackNavNormal,
  RequestLoader,
  RequestError,
  Button,
} from "_shared";
import { StackParamList } from "src/navigations/Types";
import { useTheme } from "@shopify/restyle";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { Size, Theme } from "_theme";
import { useAppDispatch, useAppSelector } from "_store";
import {
  useGetMessageInConversationQuery,
  useStartConversationMutation,
} from "../chatApi";
import { removeAccount } from "../../account/accountSlice";
import { GiftedChat, Send } from "react-native-gifted-chat";
import AnimatedLottieView from "lottie-react-native";

export default function ManageMessageScreen() {
  //const navigation = useNavigation<>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;
  const dispatch = useAppDispatch();
  const accountUser = useAppSelector((state) => state.account);
  const [messages, setMessages] = useState<any[]>([]);
  const [isMessageAlreadyStart, setIsMessageAlreadyStart] = useState(false);
  const { nickName, id } =
    useRoute<RouteProp<StackParamList, "manage_message">>()?.params.emetteur;
  const {
    data: allMessage,
    isError: isMessageError,
    isLoading: isMessageLoading,
    isFetching: isMessageFetching,
    refetch: refetchMessage,
    error: errorMessage,
  } = useGetMessageInConversationQuery(
    {
      token: accountUser.token ? accountUser.token : undefined,
      id_conversation: 1,
    },
    {
      skip: !accountUser.token,
    },
  );

  const [
    startConversation,
    {
      isError: isErrorStartConversation,
      isLoading: isLoadingStartConversation,
      status: statusStartConversation,
      error: errorStartConversation,
    },
  ] = useStartConversationMutation();

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
      return bottomSheetRef.current.close();
    }
    return;
  };

  const handleFetchError = (error: any) => {
    if (error?.data?.detail?.includes("Invalid token")) {
      return dispatch(removeAccount());
    }
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const handleStartConversation = () => {
    startConversation({
      token: accountUser.token ? accountUser.token : undefined,
      seller_id: id,
    })
      .unwrap()
      .then((res) => {
        console.log("start conv res", res);
        setIsMessageAlreadyStart(true);
      })
      .catch((e) => {
        console.log("error start :", e);
        setIsMessageAlreadyStart(false);
      });
  };

  //all effect
  useEffect(() => {
    handleFetchError(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Bienvenue sur l'application Atsika Samy Atsika.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: require("_images/logoASA.jpeg"),
        },
      },
    ]);
  }, []);

  console.log("allMessage", allMessage);

  return (
    <MainScreen typeOfScreen="stack">
      <RequestError
        isError={isMessageError}
        errorStatus={errorMessage?.status}
        onRefresh={() => refetchMessage()}
      >
        <HeaderStackNavNormal
          title={nickName}
          subTitle="Délai de réponse : 30 minutes"
          iconRight="more-vert"
          iconRightOnPress={() => openBottomSheet()}
        />
        {isMessageAlreadyStart ? (
          <Box flex={1}>
            <GiftedChat
              messages={messages}
              placeholder="Ecrivez un message ici..."
              onSend={(messages) => onSend(messages)}
              user={{
                _id: 1,
              }}
              isLoadingEarlier={isMessageLoading || isMessageFetching}
              renderLoading={() => (
                <Box flex={1} justifyContent={"center"} alignItems="center">
                  <Text variant="primary">Chargement...</Text>
                </Box>
              )}
              renderSend={(props) => (
                <Send {...props}>
                  <Box mb={"m"} mr={"s"}>
                    <Icon
                      name="send"
                      size={Size.ICON_LARGE}
                      color={colors.primary}
                    />
                  </Box>
                </Send>
              )}
            />
          </Box>
        ) : (
          <Box flex={1} justifyContent={"center"} alignItems={"center"}>
            <AnimatedLottieView
              source={require("_images/conversation.json")}
              autoPlay
              loop
              style={styles.lottieImg}
            />
            <Text variant="primary" textAlign="center">
              Cliquez sur la flèche pour démarrer votre conversation
            </Text>
            <Icon
              name="arrow-forward"
              size={Size.ICON_LARGE}
              color={colors.white}
              style={{
                marginTop: 8,
                backgroundColor: colors.blue,
                width: 50,
                height: 50,
                borderRadius: 25,
                textAlign: "center",
                padding: 8,
                color: colors.white,
              }}
              onPress={() => handleStartConversation()}
            />
          </Box>
        )}

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
              <Icon
                name="delete"
                size={Size.ICON_MEDIUM}
                color={colors.error}
              />
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
      </RequestError>
    </MainScreen>
  );
}

const styles = StyleSheet.create({
  bottomSheet_container: {
    paddingHorizontal: "4%",
  },
  lottieImg: {
    height: 250,
  },
});
