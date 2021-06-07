import React from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { CarePathwayDescription } from "../../components/index";
import CustomActionSheet from "../../components/custom-modal/custom-action-sheet";
import { IMAGES } from "../../config/assets";
import { CarePathwayScreenStyles as styles } from "./care-pathway-screen.styles";
import useAxios from "axios-hooks";
import { API_URL } from "../../config/constants";
import Dialog from "react-native-dialog";
import { AppContext } from "../../contexts/app-context/app-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  navigation: any;
  route: any;
};

export const CarePathwayScreen: React.FC<Props> = ({ navigation, route }) => {
  const { type } = route.params;

  const {
    createDevice,
    setDisorderFlag,
    setWithdrawalSeverity,
    setreadinessFlag,
    setSwitchFlag,
    switchFlag,
    disorderFlag,
    withdrawalSeverity,
    readinessFlag,
    registering,
    setClearAssessment,
  } = React.useContext(AppContext);
  const [androidPrompt, setAndroidPrompt] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [deviceToken, setDeviceToken] = React.useState("");
  const [sending, setSending] = React.useState(false);

  React.useEffect(() => {
    _getDeviceToken();
    setClearAssessment(false)
  }, []);

  const _getDeviceToken = async () => {
    const token = await AsyncStorage.getItem("@device");
    if (token) {
      setDeviceToken(token);
    }
  };

  const withdrawal = React.useMemo(() => {
    if (withdrawalSeverity <= 100) {
      return Math.round((withdrawalSeverity * 8) / 100);
    }
    if (withdrawalSeverity > 100 && withdrawalSeverity <= 200) {
      return Math.round(8 + ((withdrawalSeverity - 100) * 4) / 100);
    }
    if (withdrawalSeverity > 200) {
      return Math.round(12 + ((withdrawalSeverity - 200) * 36) / 100);
    }
  }, [withdrawalSeverity]);
  

  const actionItems = [
    {
      id: 1,
      label: "Email a Copy",
      onPress: () => {
        if (!type.description) return;
        if (Platform.OS == "ios") {
          Alert.prompt("Enter email address", "", [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "OK",
              onPress: async (email) => {
                if (!email) return;
                setSending(true);
                try {
                  await sendEmail({
                    data: {
                      attrs: parseEmail(type.description),
                      email,
                    },
                  });
                  await addResults({
                    params: {
                      deviceId: deviceToken,
                      wavier: switchFlag,
                      useDisorder: disorderFlag === "yes" ? true : false,
                      withdrawal: withdrawal,
                      patientReady: readinessFlag === "yes" ? true : false,
                      carePathwayId: type.value,
                    },
                  });
                  Alert.alert("Email sent and data saved", "", [
                    {
                      text: "Ok",
                      onPress: () => closeActionSheet(),
                    },
                  ]);
                } catch (e) {
                  Alert.alert("Error", e.message);
                }
                setSending(false);
              },
            },
          ]);
        } else {
          setAndroidPrompt(true);
        }
      },
    },
    {
      id: 2,
      label: "Do Not Send",
      onPress: async () => {
        await addResults({
          params: {
            deviceId: deviceToken,
            wavier: switchFlag,
            useDisorder: disorderFlag === "yes" ? true : false,
            withdrawal: withdrawal,
            patientReady: readinessFlag === "yes" ? true : false,
            carePathwayId: type.value,
          },
        });
        Alert.alert("Success", "Data Saved Successfully.", [
          {
            text: "OK",
            onPress: () => {
              closeActionSheet();
            },
          },
        ]);
      },
    },
  ];
  const [actionSheet, setActionSheet] = React.useState(false);

  const closeActionSheet = () => setActionSheet(false);

  const [, sendEmail] = useAxios(
    {
      url: `${API_URL}/pathways/testemail`,
      method: "POST",
    },
    { manual: true }
  );

  const [, addResults] = useAxios(
    {
      url: `${API_URL}/assessment/results`,
      method: "POST",
    },
    { manual: true }
  );

  return (
    <>
      <StatusBar backgroundColor="black" />
      <SafeAreaView>
        <ScrollView bounces={false} contentContainerStyle={styles.CONTAINER}>
          <View style={styles.TITLE_VIEW}>
            <TouchableOpacity
              style={{ paddingVertical: 15, paddingRight: 5 }}
              onPress={() => navigation.goBack()}
            >
              <Image style={styles.BACK} source={IMAGES.back} />
            </TouchableOpacity>
            <Text
              style={{ ...styles.TITLE, textAlign: "center", marginRight: 30 }}
            >
              Care Pathway
            </Text>
          </View>

          <CarePathwayDescription
            description={type.description}
            onComplete={() => setActionSheet(true)}
            onClear={async () => {
              try {
                await createDevice();
                setClearAssessment(true);
                setSwitchFlag(false);
                setWithdrawalSeverity(0);
                setreadinessFlag("");
                setDisorderFlag("");
                Alert.alert("Assessment cleared", "", [
                  {
                    text: "Done",
                    onPress: () => {
                      navigation.goBack();
                    },
                  },
                ]);
              } catch (e) {
                console.log("Error", e.message);
              }
            }}
            sending={sending}
            registering={registering}
          />
        </ScrollView>

        <Modal
          isVisible={actionSheet}
          style={{
            margin: 0,
            justifyContent: "flex-end",
          }}
        >
          <CustomActionSheet
            actionItems={actionItems}
            onCancel={closeActionSheet}
            navigation={navigation}
          />
        </Modal>

        <Dialog.Container visible={androidPrompt}>
          <Dialog.Title>Enter email address</Dialog.Title>
          <Dialog.Input
            placeholder="Enter email address"
            onChangeText={(text) => setEmail(text)}
          />
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              setAndroidPrompt(false);
            }}
          />
          <Dialog.Button
            label="Ok"
            onPress={async () => {
              if (!email) return;
              try {
                await sendEmail({
                  data: {
                    deviceId :deviceToken,
                    attrs: parseEmail(type.description),
                    email,
                  },
                });
                await addResults({
                  params: {
                    deviceId: deviceToken,
                    wavier: switchFlag,
                    useDisorder: disorderFlag === "yes" ? true : false,
                    withdrawal: withdrawal,
                    patientReady: readinessFlag === "yes" ? true : false,
                    carePathwayId: type.value,
                  },
                });
                setAndroidPrompt(false);
                Alert.alert("Email sent and data saved.", "", [
                  {
                    text: "Ok",
                    onPress: () => closeActionSheet(),
                  },
                ]);
              } catch (e) {
                Alert.alert("Error", e.message);
              }
            }}
          />
        </Dialog.Container>
      </SafeAreaView>
    </>
  );
};

const parseEmail = (data: any) => {
  return {
    ...data,
    using_this_app: {
      ...data.using_this_app,
      header_message:
        typeof data.using_this_app.header_message === "string"
          ? data.using_this_app.header_message
          : data.using_this_app.header_message.map((m: any) => m.text).join(""),
      assessments: data.using_this_app.assessments.map((a: any) =>
        typeof a === "string" ? a : a.map((m: any) => m.text).join("")
      ),
    },
  };
};
