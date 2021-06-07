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
import { BupRxHomeStyles as styles } from "./bup-rx-home.styles";
import CustomActionSheet from "../custom-modal/custom-action-sheet";
import Modal from "react-native-modal";

type Props = {
  navigation: any;
};

export const BupRxHome: React.FC<Props> = ({ navigation }) => {
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
    },
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
                  marginRight: spacing.medium,
                }}
              >
                Care Pathway 2: BUP RX for Home
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
                  marginTop: undefined,
                }}
              >
                {`Using this app, I determined that this patient has \n`}
                <Text
                  style={{
                    ...styles.CARD_TITLE,
                    fontSize: 14,
                    fontWeight: "600",
                    textAlign: "left",
                    width: "80%",
                    color: color.darkPink,
                    lineHeight: 20,
                  }}
                >
                  {`  (1) moderate OR severe opioid use \n  disorder, `}
                  <Text
                    style={{
                      ...styles.CARD_TITLE,
                      fontSize: 14,
                      fontWeight: "400",
                      textAlign: "left",
                      color: color.darkPink,
                    }}
                  >
                    {`selected or left ambiguous, \n  based on use of DSM 5`}
                  </Text>
                </Text>
              </Text>

              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "500",
                  textAlign: "left",
                  width: "90%",
                  color: color.darkPink,
                  lineHeight: 20,
                  marginTop: 0,
                }}
              >
                {`(2) `}
                <Text
                  style={{
                    ...styles.CARD_TITLE,
                    fontSize: 14,
                    fontWeight: "400",
                    textAlign: "left",
                    color: color.darkPink,
                  }}
                >
                  {"a clinical opioid "}
                  <Text
                    style={{
                      ...styles.CARD_TITLE,
                      fontSize: 14,
                      fontWeight: "500",
                      textAlign: "left",
                      color: color.darkPink,
                    }}
                  >
                    {`withdrawal score less than 8, `}
                  </Text>
                  or specific value if COWS is done
                </Text>
              </Text>
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "500",
                  textAlign: "left",
                  width: "90%",
                  color: color.darkPink,
                  marginTop: 0,
                  lineHeight: 20,
                }}
              >
                {`(3) `}
                <Text
                  style={{
                    ...styles.CARD_TITLE,
                    fontSize: 14,
                    fontWeight: "400",
                    textAlign: "left",
                    color: color.darkPink,
                    lineHeight: 20,
                  }}
                >
                  {"has "}
                  <Text
                    style={{
                      ...styles.CARD_TITLE,
                      fontSize: 14,
                      fontWeight: "500",
                      textAlign: "left",
                      color: color.darkPink,
                      marginTop: 0,
                    }}
                  >
                    {`expressed readiness to begin treatment `}
                  </Text>
                  with buprenorphine
                </Text>
              </Text>
            </View>
            <Text style={styles.TITLE}>Treatment Recommendations:</Text>

            <Text
              style={{
                ...styles.CARD_TITLE,
                fontSize: 14,
                fontWeight: "600",
                textAlign: "left",
                width: "95%",
                color: color.primary,
                marginBottom: 0,
              }}
            >
              {`This patient should receive: \n`}
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "600",
                  textAlign: "left",
                  width: "95%",
                  color: color.primary,
                  marginBottom: 0,
                }}
              >
                {`    (1) `}

                <Text
                  style={{
                    ...styles.CARD_TITLE,
                    fontSize: 14,
                    fontWeight: "400",
                    textAlign: "left",
                    color: color.primary,
                  }}
                >
                  {`instructions for home induction of \n    buprenorphine`}
                </Text>
              </Text>
            </Text>

            <Text
              style={{
                ...styles.CARD_TITLE,
                fontSize: 14,
                fontWeight: "600",
                textAlign: "left",
                width: "95%",
                color: color.primary,
                marginBottom: 0,
                marginTop: spacing.tiny,
              }}
            >
              {`    (2) `}

              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "left",
                  color: color.primary,
                }}
              >
                {`a prescription for buprenorphine 16 mg \n    sublingual daily for 3-7 days or until first \n    addiction treatment appointment and a \n    prescription for naloxone nasal spray`}
              </Text>
            </Text>

            <Text
              style={{
                ...styles.CARD_TITLE,
                fontSize: 14,
                fontWeight: "600",
                textAlign: "left",
                width: "95%",
                color: color.primary,
                marginBottom: 0,
                marginTop: spacing.tiny,
              }}
            >
              {`    (3) `}

              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "left",
                  color: color.primary,
                }}
              >
                {`referral for treatment`}
              </Text>
            </Text>

            <Text
              style={{
                ...styles.CARD_TITLE,
                fontSize: 14,
                fontWeight: "600",
                textAlign: "left",
                width: "95%",
                color: color.primary,
                marginBottom: 0,
                marginTop: spacing.tiny,
              }}
            >
              {`    (4) `}

              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "left",
                  color: color.primary,
                }}
              >
                {`and educational material on opioid use \n    disorder, naloxone use`}
              </Text>
            </Text>

            <Text
              style={{
                ...styles.CARD_TITLE,
                fontSize: 14,
                fontWeight: "600",
                textAlign: "left",
                width: "95%",
                color: color.primary,
                marginBottom: spacing.smaller,
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
                fontWeight: "600",
                textAlign: "left",
                width: "95%",
                color: color.primary,
                marginBottom: spacing.smaller,
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
                Naloxone Nasal Spray 4 mg Buprenorphine-naloxone tablet 16 mg
              </Text>
            </Text>
            <Text
              style={{
                ...styles.CARD_TITLE,
                fontSize: 14,
                fontWeight: "600",
                textAlign: "left",
                width: "95%",
                color: color.primary,
                marginBottom: spacing.small,
              }}
            >
              {`AVS/Discharge Instructions: `}
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "left",
                  color: color.primary,
                }}
              >
                Opioid Use Disorder, Naloxone (nasal spray), Buprenorphine, Harm
                Reduction Strategies
              </Text>
            </Text>
            <Text
              style={{
                ...styles.CARD_TITLE,
                fontSize: 14,
                fontWeight: "600",
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
                Yes
              </Text>
            </Text>
            <View style={{ ...styles.CHILD_CARD, height: 447 }}>
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  fontWeight: "600",
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
                  fontWeight: "600",
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
                Prevent infections by using alcohol pads and sterile water, and
                avoid sharing or reusing supplies (needles, cookers, cotton).
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
                Always use with a friend or let someone know (so they can check
                on you).
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
                Leave door ajar or unlocked so someone can get to you easily.
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
                Start slowly or try a test dose, especially if it has been a
                while since your last use or if you are testing out a new
                supply.
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
            </View>
            <TouchableOpacity
              onPress={() => {
                setActionSheet(true);
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
          <CustomActionSheet
            actionItems={actionItems}
            onCancel={closeActionSheet}
            navigation={navigation}
          />
        </Modal>
      </SafeAreaView>
    </>
  );
};
