import React from "react";
import {
  Text,
  SafeAreaView,
  Image,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { color, lineHeight, spacing, WP } from "../../config";
import { IMAGES } from "../../config/assets";
import { DoesNotMeetStyles as styles } from "./does-not-meet.styles";
import CustomActionSheet from "../custom-modal/custom-action-sheet";
import Modal from 'react-native-modal'

type Props = {
  navigation: any;
};

export const DoesNotMeet: React.FC<Props> = ({ navigation }) => {
  const actionItems = [
    {
      id: 1,
      label: "Email a Copy",
      onPress: () => {},
    },
    {
      id: 2,
      label: "Text a Copy",
      onPress: () => {},
    },
    {
      id: 3,
      label: "Do Not Send",
      onPress: () => {},
    }
  ];
  const [actionSheet, setActionSheet] = React.useState(false);

  const closeActionSheet = () => setActionSheet(false);
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
            <Text style={{ ...styles.TITLE, textAlign: "center" }}>
              Care Pathway
            </Text>
          </View>

          <View style={styles.CARD}>
            <View style={styles.CARD_HEADER}>
              <Text
                style={{
                  ...styles.HEADER_TEXT,
                  fontWeight: "700",
                  // marginRight: spacing.medium,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Does Not Meet Diagnostic Criteria for BUP
              </Text>
            </View>

            <Text
              style={{ ...styles.CARD_TITLE, fontSize: 12, fontWeight: "400" }}
            >
              I have used this app to assess this patient for opioid use
              disorder, opioid withdrawal and readiness for treatment.
            </Text>

            <View style={styles.CHILD_CARD}>
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: undefined,
                  textAlign: "left",
                  width: "95%",
                  color: color.darkPink,
                  lineHeight: 20,
                }}
              >
                {`Using this app, I determined that this \n`}
                <Text
                  style={{
                    ...styles.CARD_TITLE,
                    fontSize: 14,
                    fontWeight: "bold",
                    textAlign: "left",
                    color: color.darkPink,
                  }}
                >
                  patient does not meet the DSM 5 diagnostic criteria for opioid
                  use disorder.
                </Text>
              </Text>

              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "left",
                  width: "95%",
                  color: color.darkPink,
                  marginTop: spacing.mediumPlus,
                  lineHeight: 20,
                }}
              >
                {"Therefore, I "}
                <Text
                  style={{
                    ...styles.CARD_TITLE,
                    fontSize: 14,
                    fontWeight: "bold",
                    textAlign: "left",
                    color: color.darkPink,
                    marginTop: spacing.mediumPlus,
                  }}
                >
                  {`did not initiate treatment or place a referral for ongoing treatment`}
                  <Text
                    style={{
                      ...styles.CARD_TITLE,
                      fontSize: 14,
                      fontWeight: "400",
                      textAlign: "left",
                      color: color.darkPink,
                      marginTop: spacing.mediumPlus,
                    }}
                  ></Text>
                </Text>
              </Text>
            </View>

            <Text style={styles.TITLE}>Treatment Recommendations:</Text>

            <Text
              style={{
                ...styles.CARD_TITLE,
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "left",
                width: "95%",
                color: color.primary,
                marginBottom: spacing.small,
              }}
            >
              {`Orders: `}
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "left",
                  color: color.primary,
                }}
              >
                No orders recommended at this time
              </Text>
            </Text>

            <Text
              style={{
                ...styles.CARD_TITLE,
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "left",
                width: "95%",
                color: color.primary,
                marginBottom: spacing.small,
              }}
            >
              {`Prescriptions: `}
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "left",
                  color: color.primary,
                }}
              >
                Consider prescribing naloxone
              </Text>
            </Text>

            <Text
              style={{
                ...styles.CARD_TITLE,
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "left",
                width: "95%",
                color: color.primary,
                marginBottom: spacing.small,
              }}
            >
              {`Instructions: `}
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "left",
                  color: color.primary,
                }}
              >
                Opioid Use Disorder, Naloxone (nasal spray), Harm Reduction
                Strategies
              </Text>
            </Text>

            <Text
              style={{
                ...styles.CARD_TITLE,
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "left",
                width: "95%",
                color: color.primary,
                marginBottom: spacing.tiny,
              }}
            >
              {`Referral for Treatment: `}
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "left",
                  color: color.primary,
                }}
              >
                Refer to PMD for re-evaluation
              </Text>
            </Text>

            <View style={{ ...styles.CHILD_CARD, height: 288 }}>
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "95%",
                  color: color.darkPink,
                }}
              >
                Harm Reduction Strategies
              </Text>
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "left",
                  width: "95%",
                  color: color.darkPink,
                }}
              >
                Please consider using these harm reduction strategies if you
                choose to use opioids again:
              </Text>
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "left",
                  width: "95%",
                  color: color.darkPink,
                  marginTop: spacing.small,
                }}
              >
                Avoid using unknown substances or pills.
              </Text>
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "left",
                  width: "95%",
                  color: color.darkPink,
                  marginTop: spacing.small,
                }}
              >
                Avoid mixing opioids with alcohol and other sedatives.
              </Text>
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "left",
                  width: "95%",
                  color: color.darkPink,
                  marginTop: spacing.small,
                }}
              >
                Always keep naloxone (Narcan) with you at all times.
              </Text>
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "left",
                  width: "95%",
                  color: color.darkPink,
                  marginTop: spacing.small,
                }}
              >
                Tell a friend that you have naloxone with you before you start
                using.
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setActionSheet(true)
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
                Complete Assessment
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          isVisible={actionSheet}
          style={{
            margin: 0,
            justifyContent: "flex-end",
          }}
        >
          <CustomActionSheet actionItems={actionItems} onCancel={closeActionSheet} navigation={navigation}/>
        </Modal>
      </SafeAreaView>
    </>
  );
};
