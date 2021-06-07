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
import { color, fontSize, spacing, WP } from "../../config";
import { IMAGES } from "../../config/assets";
import { OpioidWithdrawalScreenStyles as styles } from "./opioid-withdrawal-screen.styles";
import useAxios from "axios-hooks";
import { API_URL } from "../../config/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../contexts/app-context/app-context";

type Props = {
  navigation: any;
};

type StringIndexed<T = any> = { [x: string]: T };

export const OpioidWidthdrawalScreen: React.FC<Props> = ({ navigation }) => {
  const { setWithdrawalSeverity, initialWithrawal, setinitialWithrawal } = React.useContext(AppContext);
  const [questions, setQuestions] = React.useState<StringIndexed>({});

  const [condition, setCondition] = React.useState("No Active Withdrawal");
  const [headColor, setHeadColor] = React.useState(color.blue);

  const [deviceToken, setDeviceToken] = React.useState("");

  const [, fetchWithdrawal] = useAxios(
    {
      url: `${API_URL}/assessment/withdrawal`,
      method: "POST",
    },
    { manual: true }
  );

  const [, getWithdrawal] = useAxios(
    {
      url: `${API_URL}/assessment/getWithdrawal`,
      method: "GET",
    },
    { manual: true }
  );

  const [{ data: items, loading }, getWithdrawalQuestions] = useAxios(
    {
      url: `${API_URL}/assessment/getWithdrawalQuestions`,
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
      if (questions[item.question_id]) {
        const answers = JSON.parse(item.answers).answers;
        const answer = answers.find(
          (ans: any) => ans.id == questions[item.question_id]
        );
        const value = answer.value.replace("+", "");
        total += parseInt(value || 0);
      }
    });
    return total;
  }, [items, questions]);

  React.useEffect(() => {
    updateConditionAndHeadColor();
  }, [totalCount]);

  const _getDeviceToken = async () => {
    const deviceToken = await AsyncStorage.getItem("@device");
    if (deviceToken) {
      setDeviceToken(deviceToken);
      if (!initialWithrawal) {
        _getInitialWithdrawal(deviceToken);
      }
      _getWithdrawalQuestions(deviceToken);
    }
  };

  const _fetchWithdrawal = async () => {
    try {
      const questionsData: { questionId: any; answer: number }[] = [];
      items?.forEach?.((item: any) => {
        if (questions[item.question_id]) {
          const answers = JSON.parse(item.answers).answers;
          const answer = answers.find(
            (ans: any) => ans.id == questions[item.question_id]
          );
          questionsData.push({
            questionId: item.question_id,
            answer: answer.id,
          });
        }
      });

      const withdrawal = await fetchWithdrawal({
        params: {
          deviceId: deviceToken,
        },
        data: {
          questions: questionsData,
        },
      });
      if (withdrawal.data) {
        if (withdrawal.data.message) {
          Alert.alert("Error", withdrawal.data.message);
        }
      }
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const _getWithdrawalQuestions = async (token: string) => {
    try {
      await getWithdrawalQuestions({
        params: {
          deviceId: token,
        },
      });
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const _getInitialWithdrawal = async (token: any) => {
    try {
      const withdrawal = await getWithdrawal({
        params: { deviceId: token },
      });
      if (withdrawal.data) {
        const { data } = withdrawal;
        if (data.message) {
          Alert.alert("Error", data.message);
        } else {
          setQuestions({
            item1: data.item1,
            item2: data.item2,
            item3: data.item3,
            item4: data.item4,
            item5: data.item5,
            item6: data.item6,
            item7: data.item7,
            item8: data.item8,
            item9: data.item9,
            item10: data.item10,
            item11: data.item11,
          });
        }
      }
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const updateConditionAndHeadColor = async () => {
    if (totalCount >= 0 && totalCount < 5) {
      setCondition("No Active Withdrawal");
      setHeadColor(color.blue);
    } else if (totalCount >= 5 && totalCount < 8) {
      setCondition("Mild Withdrawal");
      setHeadColor(color.blue);
    } else if (totalCount >= 8 && totalCount < 21) {
      setCondition("Moderate Withdrawal");
      setHeadColor(color.purple);
    } else if (totalCount >= 21 && totalCount < 35) {
      setCondition("Moderate Severe Withdrawal");
      setHeadColor(color.darkPink);
    } else {
      setCondition("Severe Withdrawal");
      setHeadColor(color.darkPink);
    }
  };

  const onAnswerChange = (question_id: string, answer: any) => {
    setQuestions({ ...questions, [question_id]: answer.id });
    updateConditionAndHeadColor();
    // _fetchWithdrawal(question_id, parseInt(answer.id));
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
            <Text style={styles.TITLE}>Opioid Withdrawal Assessment</Text>
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
              Clinical Opiate Withdrawal Scale (COWS)
            </Text>
            <Text
              style={{
                ...styles.CARD_TITLE,
                fontSize: 12,
                fontWeight: undefined,
              }}
            >
              For each item, select the appropriate description of the patient’s
              signs or symptoms. Rate symptoms based on their apparent
              relationship to last opioid use. For example, you should not give
              points to an elevated pulse from infection or runny nose from a
              cold.
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
              onPress={() => {
                _fetchWithdrawal();
                let withdrawal = 0;
                if (totalCount <= 8) {
                  withdrawal = (totalCount * 100) / 8;
                }
                if (totalCount > 8 && totalCount <= 12) {
                  withdrawal = 100 + ((totalCount - 8) * 100) / 4;
                }
                if (totalCount > 12) {
                  withdrawal = 200 + ((totalCount - 12) * 100) / 36;
                }

                setWithdrawalSeverity(withdrawal);
                setinitialWithrawal(false)
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
            }}
          >
            Wesson DR, Ling W. The Clinical Opiate Withdrawal Scale (COWS) J
            Psychoactive Drugs.2003;35:253–259.
          </Text>

          <Text
            style={{
              ...styles.CARD_TITLE,
              fontSize: 11,
              fontWeight: undefined,
              textAlign: "left",
              marginTop: spacing.medium,
              marginBottom: 140,
            }}
          >
            Tompkins DA, Bigelow GE, Harrison JA, Johnson RE, Fudala PJ, Strain
            EC. Concurrent Validation of the Clinical Opiate Withdrawal Scale
            (COWS) and Single-Item Indices against the Clinical Institute
            Narcotic Assessment (CINA) Opioid Withdrawal Instrument. Drug and
            alcohol dependence 2009;105(1-2):154-159.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

type QuestionProps = {
  item: any;
  questions: StringIndexed;
  onAnswerChange: (question_id: string, answer: any) => void;
};

const Question: React.FC<QuestionProps> = ({
  item,
  questions,
  onAnswerChange,
}) => {
  const answers = JSON.parse(item.answers).answers;

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
        {answers.map((ans: any) => (
          <AnswerButton
            key={ans.id}
            name={ans.name}
            value={ans.value}
            onPress={() => onAnswerChange(item.question_id, ans)}
            isActive={questions[item.question_id] === ans.id}
          />
        ))}
      </View>
    </>
  );
};

type AnswerButtonProps = {
  onPress: () => void;
  name: string;
  value: string;
  isActive: boolean;
};

const AnswerButton: React.FC<AnswerButtonProps> = ({
  onPress,
  name,
  value,
  isActive,
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          ...styles.BUTTON_CENTER,
          marginTop: isActive ? 3 : 0,
          borderRadius: isActive ? WP(15) : WP(10),
          width: isActive ? "97%" : "100%",
          backgroundColor: isActive ? color.darkBlue : "white",
        }}
      >
        <Text
          style={{
            ...styles.BUTTON_TEXT,
            marginLeft: spacing.medium,
            color: isActive ? "white" : color.primary,
            fontWeight: isActive ? "600" : "400",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            ...styles.BUTTON_TEXT,
            marginRight: spacing.medium,
            color: isActive ? "white" : color.primary,
            fontWeight: isActive ? "600" : "400",
          }}
        >
          {value}
        </Text>
      </TouchableOpacity>
      <View style={styles.BUTTON_DIVIDER} />
    </>
  );
};
