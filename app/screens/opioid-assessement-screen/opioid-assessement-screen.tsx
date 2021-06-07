import React from "react";
import {
  Text,
  SafeAreaView,
  Image,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Linking,
  Alert,
  StyleProp,
  ActivityIndicator,
} from "react-native";
import { color, spacing, WP } from "../../config";
import { IMAGES } from "../../config/assets";
import { OpioidAssessementScreenStyles as styles } from "./opioid-assessement-screen.styles";
import useAxios from "axios-hooks";
import { API_URL } from "../../config/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../contexts/app-context/app-context";

type Props = {
  navigation: any;
};

type StringIndexed<T = any> = { [x: string]: T };

export const OpioidAssessementScreen: React.FC<Props> = ({ navigation }) => {
  const { setDisorderFlag } = React.useContext(AppContext);
  const {initialDisorder, setinitialDisorder} = React.useContext(AppContext)
  const [questions, setQuestions] = React.useState<StringIndexed>({});

  const [condition, setCondition] = React.useState("No OUD");
  const [headColor, setHeadColor] = React.useState(color.blue);
  const [deviceToken, setDeviceToken] = React.useState("");

  const [reqfetchUseDisorder, fetchUseDisorder] = useAxios(
    {
      url: `${API_URL}/assessment/usedisorder`,
      method: "POST",
    },
    { manual: true }
  );

  const [reqGetUseDisorder, getUseDisorder] = useAxios(
    {
      url: `${API_URL}/assessment/getUsedisorder`,
      method: "GET",
    },
    { manual: true }
  );

  const [{ data: items, loading }, getUseDisorderQuestions] = useAxios(
    {
      url: `${API_URL}/assessment/getUseDisorderQuestions`,
      method: "GET",
    },
    { manual: true }
  );

  React.useEffect(() => {
    _getDeviceToken();
  }, []);

  const totalCount = React.useMemo(() => {
    let total = 0;
    items?.forEach?.((item: any) => {
      if (questions[item.question_id] === "yes") {
        total = total + 1;
      }
    });
    return total;
  }, [items, questions]);

  React.useEffect(() => {
    updateConditionAndHeadColor();
  }, [totalCount]);

  const _getDeviceToken = async () => {
    const token = await AsyncStorage.getItem("@device");
    if (token) {
      setDeviceToken(token);
      if (!initialDisorder) {
        _getInitialDisorder(token);
      }
      _getUseDisorderQuestions(token);
    }
  };

  const _getUseDisorderQuestions = async (token: string) => {
    try {
      await getUseDisorderQuestions({
        params: {
          deviceId: token,
        },
      });
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const _fetchUseDisorder = async () => {
    try {
      const questionsData: { questionId: any; answer: boolean }[] = [];
      items?.forEach?.((item: any) => {
        questionsData.push({
          questionId: item.question_id,
          answer: questions[item.question_id] === "yes",
        });
      });

      const useDisorders = await fetchUseDisorder({
        params: {
          deviceId: deviceToken,
        },
        data: {
          questions: questionsData,
        },
      });

      if (useDisorders.data) {
        if (useDisorders.data.message) {
          Alert.alert("Error", useDisorders.data.message);
        } else {
          if (useDisorders.data.result) {
            let flag = false;
            let total = 0;
            useDisorders.data.result.forEach((ans: any) => {
              if (ans.answer) {
                total = total +1
              }
            });
            if (total >= 4) {
              flag = true
            } else {
              flag = false
            }
            setDisorderFlag(flag ? "yes" : "no");
          }
        }
      }
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const updateConditionAndHeadColor = async () => {
    let condition = "";
    let headColor = "";

    if (totalCount >= 1 && totalCount < 5) {
      condition = "Mild OUD";
      headColor = color.blue;
    } else if (totalCount >= 5 && totalCount < 7) {
      condition = "Moderate OUD";
      headColor = color.darkPurple;
    } else if (totalCount >= 7 && totalCount < 9) {
      condition = "Moderately Severe OUD";
      headColor = color.purple;
    } else if (totalCount >= 9 && totalCount < 12) {
      condition = "Severe OUD";
      headColor = color.darkPink;
    } else {
      condition = "No OUD";
      headColor = color.blue;
    }

    setCondition(condition);
    setHeadColor(headColor);
  };

  const onAnswerChange = (question_id: string, answer: string) => {
    setQuestions({ ...questions, [question_id]: answer });
  };

  const _getInitialDisorder = async (token: any) => {
    try {
      const useDisorder = await getUseDisorder({
        params: { deviceId: token },
      });
      if (useDisorder.data) {
        const { data } = useDisorder;
        if (data.message) {
          Alert.alert("Error", data.message);
        } else {
          const findAnswer = (value?: number) => {
            if (value === 1) return "yes";
            if (value === 0) return "no";
            return "";
          };
          setQuestions({
            q1: findAnswer(data.q1),
            q2: findAnswer(data.q2),
            q3: findAnswer(data.q3),
            q4: findAnswer(data.q4),
            q5: findAnswer(data.q5),
            q6: findAnswer(data.q6),
            q7: findAnswer(data.q7),
            q8: findAnswer(data.q8),
            q9: findAnswer(data.q9),
            q10: findAnswer(data.q10),
            q11: findAnswer(data.q11),
          });
        }
      }
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="black" />
      <SafeAreaView>
        <View style={{ alignItems: "center" }}>
          <View style={styles.TITLE_VIEW}>
            <TouchableOpacity
              style={{ paddingVertical: 15, paddingRight: 5 }}
              onPress={() => navigation.goBack()}
            >
              <Image style={styles.BACK} source={IMAGES.back} />
            </TouchableOpacity>
            <Text style={styles.TITLE}>Opioid Use Disorder Assessment</Text>
          </View>

          <View style={{ ...styles.CARD_HEADER, backgroundColor: headColor }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ ...styles.HEADER_TEXT, marginLeft: spacing.medium }}
              >
                {`Total: ${totalCount}`}
              </Text>
              <Text
                style={{
                  ...styles.HEADER_TEXT,
                  fontWeight: "700",
                  marginRight: spacing.medium,
                }}
              >
                {condition}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          bounces={false}
          contentContainerStyle={styles.CONTAINER}
          // stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.CARD}>
            <Text style={styles.CARD_TITLE}>
              Opioid Use Disorder Assessment informed by DSM-5
            </Text>
            <Text
              style={{
                ...styles.CARD_TITLE,
                fontSize: 12,
                fontWeight: undefined,
              }}
            >
              Ask the patient the following questions about their opioid usage
              in the past 12 months to determine if they meet the criteria
              (score of 4 or more) for BUP treatment:
            </Text>

            {loading ? (
              <View style={{ paddingVertical: 200 }}>
                <ActivityIndicator color={color.darkBlue} />
              </View>
            ) : (
              <>
                {items?.map?.((item: any) => (
                  <Question
                    key={item.id}
                    item={item}
                    questions={questions}
                    onAnswerChange={onAnswerChange}
                  />
                ))}
              </>
            )}

            <TouchableOpacity
              onPress={async () => {
                await _fetchUseDisorder();
                setinitialDisorder(false)
                if (totalCount >= 4) {
                  setDisorderFlag("yes");
                } else {
                  setDisorderFlag("no");
                }
                Alert.alert("Success", "Data Saved Successfully.", [
                  {
                    text: "OK",
                    onPress: () => {
                      navigation.goBack();
                    },
                  },
                ]);
              }}
              style={styles.BUTTON}
            >
              <Text
                style={{
                  ...styles.BUTTON_TEXT,
                  color: "white",
                  fontWeight: "500",
                  width: WP(100),
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                Apply Results
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              ...styles.CARD_TITLE,
              fontSize: 11,
              fontWeight: undefined,
              textAlign: "left",
              marginTop: 0,
              width: WP(90),
              marginBottom: 140,
            }}
          >
            American Psychiatric Association. Substance-related addictive
            disorders. In: Diagnostic and Statistical Manual of Mental Disorders
            (5th ed.). Arlington, VA: 2013.
            <Text
              onPress={() =>
                Linking.openURL(
                  "https://doi.org/10.1176/appi.books.9780890425596.dsm16"
                )
              }
              style={{
                ...styles.CARD_TITLE,
                fontSize: 11,
                fontWeight: undefined,
                textAlign: "left",
                textDecorationLine: "underline",
                color: "#007AFF",
              }}
            >
              https://doi.org/10.1176/appi.books.9780890425596.dsm16
            </Text>
          </Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

type QuestionProps = {
  item: any;
  questions: StringIndexed;
  onAnswerChange: (question_id: string, answer: string) => void;
};

const Question: React.FC<QuestionProps> = ({
  item,
  questions,
  onAnswerChange,
}) => {
  const answer = questions[item.question_id];
  return (
    <>
      <Text
        style={{
          ...styles.CARD_TITLE,
          fontSize: 14,
          fontWeight: undefined,
          textAlign: "left",
        }}
      >
        {item.id}. {item.question}
      </Text>

      <View style={styles.BUTTONS_VIEW}>
        <AnswerButton
          style={styles.BUTTON_LEFT}
          onPress={() => onAnswerChange(item.question_id, "no")}
          isActive={answer === "no"}
        >
          No (0)
        </AnswerButton>
        <View style={styles.BUTTON_DIVIDER} />
        <AnswerButton
          style={styles.BUTTON_RIGHT}
          onPress={() => onAnswerChange(item.question_id, "yes")}
          isActive={answer === "yes"}
        >
          Yes (+1)
        </AnswerButton>
      </View>
    </>
  );
};

type AnswerButtonProps = {
  style: StyleProp<any>;
  onPress: () => void;
  isActive: boolean;
};

const AnswerButton: React.FC<AnswerButtonProps> = ({
  style,
  onPress,
  children,
  isActive,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...style,
        borderRadius: isActive ? WP(15) : 0,
        height: isActive ? "85%" : "100%",
        marginLeft: isActive ? 2 : 0,
        backgroundColor: isActive ? color.darkgreen : "white",
      }}
    >
      <Text
        style={{
          ...styles.BUTTON_TEXT,
          color: isActive ? "white" : color.primary,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
