import React from "react";
import {
  Text,
  SafeAreaView,
  Image,
  View,
  Switch,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { color, fontSize, WP } from "../../config";
import { IMAGES } from "../../config/assets";
import { BuprenorphineInitiationScreenStyles as styles } from "./beurophine-screen.styles";
import RNPickerSelect from "react-native-picker-select";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "react-native-custom-slider";
import { AndroidSelect } from "../../components";
import useAxios from "axios-hooks";
import { API_URL } from "../../config/constants";
import { AppContext } from "../../contexts/app-context/app-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  navigation: any;
};

export const BuprenorphineInitiationScreen: React.FC<Props> = ({
  navigation,
}) => {
  const {
    switchFlag,
    setSwitchFlag,
    disorderFlag,
    setDisorderFlag,
    withdrawalSeverity,
    setWithdrawalSeverity,
    readinessFlag,
    setreadinessFlag,
    fetching,
    clearAssessment,
    setClearAssessment,
  } = React.useContext(AppContext);

  const [selectedItem, setSelectedItem] = React.useState("select");
  const [label, setLabel] = React.useState("More information needed");
  const [items, setItems] = React.useState<any[]>([]);
  const [deviceToken, setDeviceToken] = React.useState("");

  const [{ loading }, getPathways] = useAxios(
    {
      url: `${API_URL}/getPathways`,
      method: "GET",
    },
    { manual: true }
  );

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

  React.useEffect(() => {
    _getDeviceToken();
    _getPathways();
  }, [switchFlag, disorderFlag, withdrawal, readinessFlag]);

  const _getDeviceToken = async () => {
    const token = await AsyncStorage.getItem("@device");
    if (token) {
      setDeviceToken(token);
    }
  };

  const _getPathways = async () => {
    try {
      if (clearAssessment) {
        setItems([])
      } else {
        const params: any = {};
        if (disorderFlag) {
          params.use_disorder = disorderFlag === "yes" ? 1 : 0;
          params.withdrawal = withdrawal;
          if (readinessFlag) {
            params.patient_ready = readinessFlag === "yes" ? 1 : 0;
          }
        }
        if (Object.keys(params).length === 0) {
          setItems([]);
          return;
        }
        params.wavier = switchFlag ? 1 : 0;
        params.deviceId = deviceToken;

        const pathways = await getPathways({
          params,
        });

        let pathwaysTemp: any = [];
        if (pathways.data) {
          pathways.data.pathways.forEach((item: any) => {
            let tempItem = {
              label: item.optionText,
              value: `${item.id}`,
              description: item.description
                ? JSON.parse(item.description)
                : null,
            };
            pathwaysTemp.push(tempItem);
          });

          setItems(pathwaysTemp);
          if (pathwaysTemp.length === 1) setSelectedItem(pathwaysTemp[0].value);
        }
      }
    } catch (e) {
      console.log("Error", e.message);
    }
  };
  return (
    <>
      <StatusBar backgroundColor="black" />
      {fetching ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator color={color.darkBlue} />
        </View>
      ) : (
        <SafeAreaView>
          <ScrollView bounces={false} contentContainerStyle={styles.CONTAINER}>
            <Text style={styles.TITLE}>Buprenorphine Initiation</Text>
            <Text style={styles.SUBTITLE}>
              Use the optional tools to help determine the best care pathway
              treatment for the patient.
            </Text>

            <View style={styles.PRESCRIBEROW}>
              <Text style={styles.PRESCRIBEROWTEXT}>Prescription Waiver</Text>
              <Switch
                value={switchFlag}
                disabled={loading}
                onValueChange={() => {
                  setSwitchFlag((prev) => !prev);
                  setClearAssessment(false)
                }}
              />
            </View>

            <View style={styles.CARD}>
              <Text style={styles.CARD_TITLE}>Opioid Use Disorder</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("opioid")}
                style={styles.CARD_CHILD_VIEW}
              >
                <Image
                  resizeMode="contain"
                  style={styles.IMAGE}
                  source={IMAGES.checkList}
                />
                <Text style={styles.CARD_TEXT}>
                  Opioid Use Disorder Assessment
                </Text>
              </TouchableOpacity>

              <Text style={styles.CARD_SMALL_TEXT}>
                Does the patient have an Opioid use disorder?
              </Text>

              <View style={styles.CARD_BUTTONS_VIEW}>
                <TouchableOpacity
                  style={{
                    ...styles.CARD_BUTTON_LEFT,
                    borderRadius: disorderFlag === "no" ? WP(15) : 0,
                    height: disorderFlag === "no" ? "85%" : "100%",
                    marginLeft: disorderFlag === "no" ? 2 : 0,
                    backgroundColor:
                      disorderFlag === "no" ? color.darkgreen : "white",
                  }}
                    onPress={() => {
                      setDisorderFlag("no")
                      setClearAssessment(false)
                    }}
                >
                  <Text
                    style={{
                      ...styles.CARD_BUTTON_TEXT,
                      color: disorderFlag === "no" ? "white" : color.primary,
                    }}
                  >
                    No
                  </Text>
                </TouchableOpacity>

                <View style={styles.CARD_BUTTON_DIVIDER} />

                <TouchableOpacity
                  style={{
                    ...styles.CARD_BUTTON_RIGHT,
                    borderRadius: disorderFlag === "yes" ? WP(15) : 0,
                    height: disorderFlag === "yes" ? "85%" : "100%",
                    marginRight: disorderFlag === "yes" ? 2 : 0,
                    backgroundColor:
                      disorderFlag === "yes" ? color.darkgreen : "white",
                  }}
                    onPress={() => {
                      setDisorderFlag("yes")
                      setClearAssessment(false);
                    }}
                >
                  <Text
                    style={{
                      ...styles.CARD_BUTTON_TEXT,
                      color: disorderFlag === "yes" ? "white" : color.primary,
                    }}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{ ...styles.CARD, height: WP(60), paddingVertical: 6 }}
            >
              <Text style={styles.CARD_TITLE}>Opioid Withdrawal</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("opioidWidthrawal")}
                style={{
                  ...styles.CARD_CHILD_VIEW,
                  backgroundColor: color.lightBlue,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ ...styles.IMAGE, tintColor: color.darkBlue }}
                  source={IMAGES.checkList}
                />
                <Text style={{ ...styles.CARD_TEXT, color: color.darkBlue }}>
                  Opioid Withdrawal Assessment
                </Text>
              </TouchableOpacity>

              <Text style={styles.CARD_SMALL_TEXT}>
                How severe is the patient's withdrawal?
              </Text>

              <View>
                <View>
                  <Slider
                    minimumValue={0}
                    maximumValue={300}
                    style={styles.SLIDER}
                    thumbTintColor={color.lightGrey}
                    customMinimumTrack={
                      <LinearGradient
                        start={{ x: 0.9, y: 0.26 }}
                        end={{ x: 0, y: 0.77 }}
                        colors={[
                          color.darkPink,
                          color.darkPurple,
                          color.darkBlue,
                        ]}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 2,
                        }}
                      />
                    }
                    value={withdrawalSeverity ? withdrawalSeverity : 0.1}
                    onSlidingComplete={(value: number) => {
                      setWithdrawalSeverity(value);
                      setClearAssessment(false);
                    }}
                    trackStyle={styles.TRACK_STYLE}
                  />
                </View>
                <View style={styles.ABSOULUTE_VIEW}>
                  <View style={styles.ABSOULUTE_VIEW_DIVIDER} />
                  <View style={styles.ABSOULUTE_VIEW_DIVIDER} />
                </View>
              </View>

              <View style={styles.SLIDER_CHILD_VIEW}>
                <View style={{ alignItems: "center", width: "33.33%" }}>
                  <Text style={styles.CARD_TINY_TEXT}>{`<8`}</Text>
                  <Text style={styles.CARD_TINY_TEXT}>None - Mild</Text>
                </View>
                <View style={{ alignItems: "center", width: "33.33%" }}>
                  <Text style={styles.CARD_TINY_TEXT}>{`8-12`}</Text>
                  <Text style={styles.CARD_TINY_TEXT}>Mild to Moderate</Text>
                </View>
                <View style={{ alignItems: "center", width: "33.33%" }}>
                  <Text style={styles.CARD_TINY_TEXT}>{`>12`}</Text>
                  <Text style={styles.CARD_TINY_TEXT}>Moderate to Severe</Text>
                </View>
              </View>

              <Text
                style={{
                  ...styles.CARD_SMALL_TEXT,
                  fontStyle: "italic",
                  fontSize: 10,
                }}
              >
                Do not prescribe if patient is currently intoxicated or has used
                opiates within the last 12-24 hours.
              </Text>
            </View>

            <View style={styles.CARD}>
              <Text style={styles.CARD_TITLE}>Motivate Readiness</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("opioidTreatment")}
                style={{
                  ...styles.CARD_CHILD_VIEW,
                  backgroundColor: color.lightPurple,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ ...styles.IMAGE, tintColor: color.darkPurple }}
                  source={IMAGES.checkList}
                />
                <Text style={{ ...styles.CARD_TEXT, color: color.darkPurple }}>
                  Opioid Treatment Assessment
                </Text>
              </TouchableOpacity>
              <Text style={styles.CARD_SMALL_TEXT}>
                Is the patient ready to start treatment with Buprenorphine
                today?
              </Text>
              <View style={styles.CARD_BUTTONS_VIEW}>
                <TouchableOpacity
                  style={{
                    ...styles.CARD_BUTTON_LEFT,
                    borderRadius: readinessFlag === "no" ? WP(15) : 0,
                    height: readinessFlag === "no" ? "85%" : "100%",
                    marginLeft: readinessFlag === "no" ? 2 : 0,
                    backgroundColor:
                      readinessFlag === "no" ? color.darkPurple : "white",
                  }}
                    onPress={() => {
                      setreadinessFlag("no")
                      setClearAssessment(false);
                    }}
                >
                  <Text
                    style={{
                      ...styles.CARD_BUTTON_TEXT,
                      color: readinessFlag === "no" ? "white" : color.primary,
                    }}
                  >
                    No
                  </Text>
                </TouchableOpacity>
                <View style={styles.CARD_BUTTON_DIVIDER} />
                <TouchableOpacity
                  style={{
                    ...styles.CARD_BUTTON_RIGHT,
                    borderRadius: readinessFlag === "yes" ? WP(15) : 0,
                    height: readinessFlag === "yes" ? "85%" : "100%",
                    marginRight: readinessFlag === "yes" ? 2 : 0,
                    backgroundColor:
                      readinessFlag === "yes" ? color.darkPurple : "white",
                  }}
                    onPress={() => {
                      setreadinessFlag("yes")
                      setClearAssessment(false);
                    }}
                >
                  <Text
                    style={{
                      ...styles.CARD_BUTTON_TEXT,
                      color: readinessFlag === "yes" ? "white" : color.primary,
                    }}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ ...styles.CARD, marginBottom: 15, height: WP(58) }}>
              <Text style={styles.CARD_TITLE}>Care Pathway</Text>

              <View style={styles.PATHWAH_CHILD_VIEW}>
                <Text style={styles.PINK_TEXT}>
                  Care Pathway Recommendation:
                </Text>
                <Text style={styles.CARD_MEDIUM_TEXT}>{label}</Text>
              </View>

              <Text style={styles.CARD_SMALL_TEXT}>
                Select a care pathway using the results above.
              </Text>

              {Platform.OS == "ios" ? (
                <View style={styles.DROP_DOWN_VIEW}>
                  <RNPickerSelect
                    style={{
                      inputIOS: {
                        paddingHorizontal: 20,
                        color: color.primary,
                      },
                    }}
                    placeholder={{
                      label: "Select Care Pathway",
                      value: "select",
                    }}
                    onValueChange={(value, index) => {
                      const item = items[index - 1];

                      if (item) {
                        setLabel(item.label);
                      } else {
                        setLabel("More information needed");
                      }
                      setSelectedItem(value);
                    }}
                    value={selectedItem}
                    items={items}
                  />
                </View>
              ) : (
                <AndroidSelect
                  onSelect={(item: any) => {
                    if (item.value === "select") {
                      setLabel("More information needed");
                    } else {
                      setLabel(item.label);
                    }
                    setSelectedItem(item.value);
                  }}
                  items={items}
                />
              )}

              <View
                style={{
                  ...styles.CARD_BUTTONS_VIEW,
                  backgroundColor: color.lightPink,
                  marginTop: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (selectedItem !== "select") {
                      const type = items.find(
                        (item) => item.value === selectedItem
                      );

                      navigation.navigate("carePathway", {
                        type,
                      });
                    }
                  }}
                  style={{
                    ...styles.CARD_BUTTON,
                    backgroundColor:
                      label !== "More information needed"
                        ? color.darkPink
                        : color.unselectedPink,
                  }}
                >
                  <Text
                    style={{
                      ...styles.CARD_BUTTON_TEXT,
                      color: "white",
                      fontWeight: "500",
                      width: WP(100),
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    Continue To Pathway
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};
