import React from "react";
import {
  Text,
  SafeAreaView,
  Image,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import { color, spacing, WP } from "../../config";
import { IMAGES } from "../../config/assets";
import { AmbivalentAboutStyles as styles } from "./ambivalent-about.styles";
import { Recommendations } from '../recommendations/recommendations';
import CustomActionSheet from "../custom-modal/custom-action-sheet";
import Modal from "react-native-modal";

type Props = {
  navigation: any;
};

export const Ambivalent: React.FC<Props> = ({ navigation }) => {
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
            <Text
              style={{ ...styles.TITLE, textAlign: "center", marginRight: 30 }}
            >
              Care Pathway
            </Text>
          </View>

          <View style={styles.CARD}>
            <View style={styles.CARD_HEADER}>
              <Text style={styles.HEADER_TEXT}>
                Ambivalent About Addiction Treatment
              </Text>
            </View>

            <Text
              style={{
                ...styles.CARD_TITLE,
                fontSize: 12,
                lineHeight: 16,
                fontWeight: "400",
                marginTop: 15,
                marginHorizontal: WP(0.5),
              }}
            >
              I have used this app to assess this patient for opioid use
              disorder, opioid withdrawal and readiness for treatment.
            </Text>

            <View style={styles.CHILD_CARD}>
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: undefined,
                  textAlign: "left",
                  // width: "95%",
                  color: color.darkPink,
                  padding: 15,
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
                  patient does not meet the criteria for ED-initiated
                  buprenorphine or is ambivalent about receiving medication for
                  addiction treatment at this time. {"\n\n"}
                </Text>
                {"In addition, the patient is "}
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
                  {`unwilling to \naccept referral for addiction treatment \n`}
                  <Text
                    style={{
                      ...styles.CARD_TITLE,
                      fontSize: 14,
                      fontWeight: "400",
                      textAlign: "left",
                      color: color.darkPink,
                      // marginTop: spacing.mediumPlus,
                    }}
                  >
                    despite my attempt with a brief negotiation interview during
                    today’s ED visit.
                  </Text>
                </Text>
              </Text>
            </View>

            {/* <Recommendations /> */}

            <View style={{ ...styles.CHILD_CARD, padding: 15 }}>
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  lineHeight: 16,
                  fontWeight: Platform.OS === "ios" ? "500" : "700",
                  textAlign: "center",
                  color: color.darkPink,
                  marginBottom: 10,
                }}
              >
                Harm Reduction Strategies
              </Text>
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  lineHeight: 16,
                  fontWeight: Platform.OS === "ios" ? "500" : "700",
                  textAlign: "left",
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
                  lineHeight: 16,
                  fontWeight: "400",
                  textAlign: "left",
                  color: color.darkPink,
                  marginTop: spacing.medium,
                }}
              >
                Always use with a friend or let someone know (so they can check
                on you).
              </Text>
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  lineHeight: 16,
                  fontWeight: "400",
                  textAlign: "left",
                  color: color.darkPink,
                  marginTop: spacing.medium,
                }}
              >
                Leave door ajar or unlocked so someone can get to you easily.
              </Text>
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  lineHeight: 16,
                  fontWeight: "400",
                  textAlign: "left",
                  color: color.darkPink,
                  marginTop: spacing.medium,
                }}
              >
                Avoid mixing opioids with alcohol and other sedatives.
              </Text>
              <Text
                style={{
                  ...styles.CARD_TITLE,
                  fontSize: 14,
                  lineHeight: 16,
                  fontWeight: "400",
                  textAlign: "left",
                  color: color.darkPink,
                  marginTop: spacing.medium,
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
                  lineHeight: 16,
                  fontWeight: "400",
                  textAlign: "left",
                  color: color.darkPink,
                  marginTop: spacing.medium,
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
