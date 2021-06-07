import React from "react";
import {
  Text,
  SafeAreaView,
  Image,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { color, spacing, WP } from "../../config";
import { IMAGES } from "../../config/assets";
import { OpioidTreatmentScreenStyles as styles } from "./opioid-treatment-screen.styles";
import Slider from "react-native-custom-slider";
import { LinearGradient } from "expo-linear-gradient";
import useAxios from "axios-hooks";
import { API_URL } from "../../config/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../contexts/app-context/app-context";

type Props = {
  navigation: any;
};

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const itemsCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const OpioidTreatmentScreen: React.FC<Props> = ({ navigation }) => {
  const { setreadinessFlag, intialTreatment, setintialTreatment } = React.useContext(AppContext);
  const [selected, setSelected] = React.useState("");
  const [deviceToken, setDeviceToken] = React.useState("");
  const [value, setValue] = React.useState(0);

  const [{ data, loading }, getTreatment] = useAxios(
    {
      url: `${API_URL}/assessment/getTreatment`,
      method: "GET",
    },
    { manual: true }
  );

  const [, fetchTreatment] = useAxios(
    {
      url: `${API_URL}/assessment/treatment`,
      method: "POST",
    },
    { manual: true }
  );

  React.useEffect(() => {
    _getDeviceToken();
  }, []);

  const _getDeviceToken = async () => {
    const deviceToken = await AsyncStorage.getItem("@device");
    if (deviceToken) {
      setDeviceToken(deviceToken);
      if (!intialTreatment) {
        _getTreatment(deviceToken);
      }
    }
  };

  const _fetchTreatment = async () => {
    try {
      const treatment = await fetchTreatment({
        params: {
          readinessScale: value,
          deviceId: deviceToken,
        },
      });
      if (treatment.data) {
        if (treatment.data.message) {
          Alert.alert("Error", treatment.data.message);
        } else {
          setintialTreatment(false)
          if (value > 0) {
            setreadinessFlag("yes");
          } else {
            setreadinessFlag("no");
          }
          Alert.alert("Success", "Data Saved Successfully.", [
            {
              text: "OK",
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
        }
      }
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const _getTreatment = async (token: string) => {
    try {
      const { data } = await getTreatment({
        params: {
          deviceId: token,
        },
      });
      if (data) {
        if (data.message) {
          // Alert.alert("Error", data.message);
        } else {
          if (data.readinessScale > 0) {
            setValue(data.readinessScale);
            setreadinessFlag("yes");
          } else {
            setreadinessFlag("no");
          }
        }
      }
    } catch (e) {
      // Alert.alert("Error", e.message);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="black" />
      <SafeAreaView style={{ backgroundColor: color.bg }}>
        <View style={styles.TITLE_VIEW}>
          <TouchableOpacity
            style={{ paddingVertical: 15, paddingRight: 5 }}
            onPress={() => navigation.goBack()}
          >
            <Image style={styles.BACK} source={IMAGES.back} />
          </TouchableOpacity>
          <Text style={styles.TITLE}>Opioid Treatment Assessment</Text>
        </View>

        <ScrollView bounces={false} contentContainerStyle={styles.CONTAINER}>
          <View style={styles.CARD}>
            <Text style={styles.CARD_TITLE}>Brief Negotiation Interview</Text>
            <Text
              style={{
                ...styles.CARD_TITLE,
                fontSize: 12,
                fontWeight: undefined,
              }}
            >
              Use the following techniques to motivate the patient to accept
              treatment.Treatment should be offered regardless of the patient’s
              current readiness to accept it.
            </Text>

            {loading ? (
              <View style={{ paddingVertical: 200 }}>
                <ActivityIndicator color={color.darkBlue} />
              </View>
            ) : (
              <>
                <Text
                  style={{
                    ...styles.CARD_TITLE,
                    fontSize: 14,
                    fontWeight: undefined,
                    textAlign: "left",
                  }}
                >
                  1. Readiness Assessment
                </Text>

                <Text
                  style={{
                    ...styles.CARD_TITLE,
                    fontSize: 14,
                    fontWeight: undefined,
                    textAlign: "left",
                  }}
                >
                  Ask the patient to answer the following to determine their
                  readiness to begin treatment with buprenorphine:
                </Text>

                <Text
                  style={{
                    ...styles.CARD_TITLE,
                    fontSize: 14,
                    fontWeight: undefined,
                    textAlign: "left",
                  }}
                >
                  {`On a scale of 1 to 10, `}
                  <Text
                    style={{
                      ...styles.CARD_TITLE,
                      fontSize: 14,
                      fontWeight: "600",
                      textAlign: "left",
                    }}
                  >
                    {`with 1 being not ready at all and 10 being totally ready, `}
                  </Text>
                  how ready do you feel about starting treatment with
                  buprenorphine today?
                </Text>
                <View style={styles.SLIDER_TOP_VIEW}>
                  <Text style={styles.CARD_SMALL_TEXT}>Not Ready At All</Text>
                  <Text style={styles.CARD_SMALL_TEXT}>Totally Ready</Text>
                </View>

                <View>
                  <View>
                    <Slider
                      value={value}
                      onValueChange={(value) => setValue(value)}
                      minimumValue={0}
                      maximumValue={10}
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
                      trackStyle={styles.TRACK_STYLE}
                    />
                  </View>

                  <View style={styles.ABSOULUTE_VIEW}>
                    {items.map((item) => (
                      <View style={styles.ABSOULUTE_VIEW_DIVIDER} />
                    ))}
                  </View>

                  <View style={styles.SLIDER_CHILD_VIEW}>
                    {itemsCount.map((item) => (
                      <View style={{ alignItems: "center", width: "10%" }}>
                        <Text style={styles.CARD_TINY_TEXT}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <Text
                  style={{
                    ...styles.CARD_TITLE,
                    fontSize: 14,
                    fontWeight: undefined,
                    textAlign: "left",
                  }}
                >
                  2. Questions to Motivate
                </Text>

                <Text
                  style={{
                    ...styles.CARD_TITLE,
                    fontSize: 14,
                    fontWeight: undefined,
                    textAlign: "left",
                  }}
                >
                  Ask questions that reflect on the patient’s previous answers,
                  use reflective listening to help frame your questions and
                  reiterate motivating factors to help encourage starting
                  treatment.
                </Text>

                {selected === "1" ? (
                  <View
                    style={{
                      ...styles.BUTTON,
                      height: 460,
                      width: "90%",
                      borderRadius: 20,
                      backgroundColor: color.darkPurple,
                      marginBottom: spacing.small,
                      paddingHorizontal: spacing.medium,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.BUTTON_TEXT,
                          color: "white",
                          fontWeight: "600",
                          // width: WP(100),
                          textAlign: "center",
                          fontSize: 14,
                        }}
                      >
                        Questions If 1 Is Selected
                      </Text>
                      <TouchableOpacity
                        style={{ paddingVertical: 15 }}
                        onPress={() => setSelected("")}
                      >
                        <Image
                          style={{
                            height: 10,
                            width: 10,
                            tintColor: "white",
                            transform: [{ rotate: "90deg" }],
                          }}
                          source={IMAGES.back}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text
                      style={{
                        ...styles.CARD_TITLE,
                        fontSize: 14,
                        fontWeight: "600",
                        color: "white",
                        textAlign: "left",
                        paddingHorizontal: 0,
                      }}
                    >
                      Some questions to consider asking if the patient selected
                      1 on the readiness scale:
                    </Text>

                    <Text
                      style={{
                        ...styles.CARD_TITLE,
                        fontSize: 14,
                        fontWeight: "400",
                        color: "white",
                        textAlign: "left",
                        paddingHorizontal: 0,
                      }}
                    >
                      What would it take for you to make that number a 2?
                    </Text>

                    <Text
                      style={{
                        ...styles.CARD_TITLE,
                        fontSize: 14,
                        fontWeight: "400",
                        color: "white",
                        textAlign: "left",
                        paddingHorizontal: 0,
                      }}
                    >
                      Reflect back the response to “What would it take for you
                      to make that number a 2?” As “Wow, that would be bad if
                      ______ (e.g., I’d have to move out of my current housing
                      situation). I don’t want that to happen let’s work
                      together to make it not happen.”
                    </Text>

                    <Text
                      style={{
                        ...styles.CARD_TITLE,
                        fontSize: 14,
                        fontWeight: "400",
                        color: "white",
                        textAlign: "left",
                        paddingHorizontal: 0,
                      }}
                    >
                      Have you ever done anything you wish you hadn’t while
                      using drugs?
                    </Text>

                    <Text
                      style={{
                        ...styles.CARD_TITLE,
                        fontSize: 14,
                        fontWeight: "400",
                        color: "white",
                        textAlign: "left",
                        paddingHorizontal: 0,
                      }}
                    >
                      How important would it be to prevent that for happening
                      again?
                    </Text>

                    <Text
                      style={{
                        ...styles.CARD_TITLE,
                        fontSize: 14,
                        fontWeight: "400",
                        color: "white",
                        textAlign: "left",
                        paddingHorizontal: 0,
                      }}
                    >
                      How might bup help with preventing that?
                    </Text>

                    <Text
                      style={{
                        ...styles.CARD_TITLE,
                        fontSize: 14,
                        fontWeight: "400",
                        color: "white",
                        textAlign: "left",
                        paddingHorizontal: 0,
                        marginBottom: spacing.medium,
                      }}
                    >
                      What might be even a little good about considering
                      buprenorphine treatment in the next few days?
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => setSelected("1")}
                    style={{
                      ...styles.BUTTON,
                      backgroundColor: "white",
                      borderColor: color.lightGrey,
                      borderWidth: 1,
                      marginBottom: spacing.small,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: spacing.medium,
                    }}
                  >
                    <Text
                      style={{
                        ...styles.BUTTON_TEXT,
                        color: color.primary,
                        fontWeight: "400",
                        // width: WP(100),
                        textAlign: "center",
                        fontSize: 14,
                      }}
                    >
                      Questions If 1 Is Selected
                    </Text>
                    <Image
                      style={{
                        height: 10,
                        width: 10,
                        transform: [{ rotate: "270deg" }],
                      }}
                      source={IMAGES.back}
                    />
                  </TouchableOpacity>
                )}

                {selected === "2" ? (
                  <View
                    style={{
                      ...styles.BUTTON,
                      height: 412,
                      width: "90%",
                      backgroundColor: color.darkPurple,
                      marginBottom: spacing.small,
                      borderRadius: 20,
                      marginTop: 0,
                      paddingHorizontal: spacing.medium,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.BUTTON_TEXT,
                          color: "white",
                          fontWeight: "600",
                          // width: WP(100),
                          textAlign: "center",
                          fontSize: 14,
                        }}
                      >
                        Questions If 2-10 Is Selected
                      </Text>
                      <TouchableOpacity
                        style={{ paddingVertical: 15 }}
                        onPress={() => setSelected("")}
                      >
                        <Image
                          style={{
                            height: 13,
                            width: 13,
                            tintColor: "white",
                            transform: [{ rotate: "90deg" }],
                          }}
                          source={IMAGES.back}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text
                      style={{
                        ...styles.CARD_TITLE,
                        fontSize: 14,
                        fontWeight: "600",
                        color: "white",
                        textAlign: "left",
                        paddingHorizontal: 0,
                        marginTop: 0,
                      }}
                    >
                      Some questions to consider asking if the patient selected
                      2-10 on the readiness scale:
                    </Text>

                    <Text
                      style={{
                        ...styles.CARD_TITLE,
                        fontSize: 14,
                        fontWeight: "400",
                        color: "white",
                        textAlign: "left",
                        paddingHorizontal: 0,
                      }}
                    >
                      What made you choose that number and not a lower one?
                    </Text>

                    <Text
                      style={{
                        ...styles.CARD_TITLE,
                        fontSize: 14,
                        fontWeight: "400",
                        color: "white",
                        textAlign: "left",
                        paddingHorizontal: 0,
                      }}
                    >
                      What would be good about considering buprenorphine
                      treatment?
                    </Text>

                    <Text
                      style={{
                        ...styles.CARD_TITLE,
                        fontSize: 14,
                        fontWeight: "400",
                        color: "white",
                        textAlign: "left",
                        paddingHorizontal: 0,
                      }}
                    >
                      What are the benefits you’ve heard others talk about?
                    </Text>

                    <Text
                      style={{
                        ...styles.CARD_TITLE,
                        fontSize: 14,
                        fontWeight: "400",
                        color: "white",
                        textAlign: "left",
                        paddingHorizontal: 0,
                      }}
                    >
                      What might make you more motivated once you go home (or in
                      a few days from now)?
                    </Text>

                    <Text
                      style={{
                        ...styles.CARD_TITLE,
                        fontSize: 14,
                        fontWeight: "400",
                        color: "white",
                        textAlign: "left",
                        paddingHorizontal: 0,
                      }}
                    >
                      Have you ever done anything you wish you hadn’t while
                      using drugs?
                    </Text>

                    <Text
                      style={{
                        ...styles.CARD_TITLE,
                        fontSize: 14,
                        fontWeight: "400",
                        color: "white",
                        textAlign: "left",
                        paddingHorizontal: 0,
                        marginBottom: spacing.medium,
                      }}
                    >
                      How important would it be to prevent that for happening
                      again?
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => setSelected("2")}
                    style={{
                      ...styles.BUTTON,
                      backgroundColor: "white",
                      borderColor: color.lightGrey,
                      borderWidth: 1,
                      marginBottom: spacing.small,
                      marginTop: 0,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: spacing.medium,
                    }}
                  >
                    <Text
                      style={{
                        ...styles.BUTTON_TEXT,
                        color: color.primary,
                        fontWeight: "400",
                        // width: WP(100),
                        textAlign: "center",
                        fontSize: 14,
                      }}
                    >
                      Questions If 2-10 Is Selected
                    </Text>
                    <Image
                      style={{
                        height: 10,
                        width: 10,
                        transform: [{ rotate: "270deg" }],
                      }}
                      source={IMAGES.back}
                    />
                  </TouchableOpacity>
                )}

                <Text
                  style={{
                    ...styles.CARD_TITLE,
                    fontSize: 14,
                    fontWeight: undefined,
                    textAlign: "left",
                  }}
                >
                  3. Encourage Patient
                </Text>

                <Text
                  style={{
                    ...styles.CARD_TITLE,
                    fontSize: 14,
                    fontWeight: undefined,
                    textAlign: "left",
                  }}
                >
                  Allow the patient to explain their answers. Ask questions that
                  reflect on the previous answers, and use reflective listening
                  to reiterate motivating topics or factors to help encourage
                  starting treatment. 
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    _fetchTreatment();
                  }}
                  style={styles.BUTTON}
                >
                  <Text
                    style={{
                      ...styles.BUTTON_TEXT,
                      color: "white",
                      fontWeight: "600",
                      width: WP(100),
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    Apply Results
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
