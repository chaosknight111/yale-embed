import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { color, spacing, WP } from "../../config";
import { CarePathWayDescriptionStyles as styles } from "./care-pathway-description.styles";
import { Recommendations } from "../recommendations/recommendations";

type Props = {
  description: any;
  onComplete?: () => void;
  onClear?: () => void;
  sending: boolean;
  registering: boolean;
};

const HEADER_COLORS: any = {
  "Does Not Meet Diagnostic Criteria for BUP": color.darkPink,
  "Not Ready for Addiction Treatment": color.darkPink,
  "Care Pathway 1: Not Ready for BUP": color.darkPink,
  "Care Pathway 2: Hold in ED": color.purple,
  "Care Pathway 2: BUP RX for Home": color.purple,
  "Care Pathway 3: 4mg of BUP (2x)": color.purple,
  "Care Pathway 4: 8 mg of BUP": color.darkBlue,
};

export const CarePathwayDescription: React.FC<Props> = ({
  description,
  onComplete,
  onClear,
  sending,
  registering,
}) => {
  if (!description) return null;
  const headerColor = HEADER_COLORS[description.title] || color.darkPink;
  return (
    <>
      <View style={styles.CARD}>
        <View style={{ ...styles.CARD_HEADER, backgroundColor: headerColor }}>
          <Text
            style={{
              ...styles.HEADER_TEXT,
              fontWeight: "700",
              width: "100%",
              textAlign: "center",
            }}
          >
            {description.title}
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
          {description.intro?.message}
        </Text>

        {description.using_this_app ? (
          <View style={styles.CHILD_CARD}>
            <CompoundText
              style={{
                padding: 15,
                paddingBottom: description.using_this_app.assessments?.length
                  ? 2
                  : 15,
              }}
              value={description.using_this_app.header_message}
            />
            {description.using_this_app.assessments?.length ? (
              <View
                style={{ paddingRight: 15, paddingLeft: 30, paddingBottom: 15 }}
              >
                {description.using_this_app.assessments.map(
                  (assessment: any, idx: number) => (
                    <CompoundText
                      key={idx}
                      style={{ marginBottom: 2 }}
                      value={assessment}
                    />
                  )
                )}
              </View>
            ) : null}
          </View>
        ) : null}

        <Recommendations data={description.treatment_recommendations} />

        {description.harmful_reduction_strategies?.visible && (
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
              {description.harmful_reduction_strategies.title}
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
              {description.harmful_reduction_strategies.sub_title}
            </Text>

            {description.harmful_reduction_strategies.strategies.map(
              (strategy: string, idx: number) => (
                <Text
                  key={idx}
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
                  {strategy}
                </Text>
              )
            )}
          </View>
        )}

        <TouchableOpacity
          onPress={onComplete}
          style={styles.BUTTON}
          disabled={sending}
        >
          {sending ? (
            <ActivityIndicator color={color.white} />
          ) : (
            <Text
              style={{
                ...styles.BUTTON_TEXT,
                color: "white",
                fontWeight: "500",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Send Assessment
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onClear}
          style={styles.BUTTON}
          disabled={registering}
        >
          {registering ? (
            <ActivityIndicator color={color.white} />
          ) : (
            <Text
              style={{
                ...styles.BUTTON_TEXT,
                color: "white",
                fontWeight: "500",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Clear Assessment
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

const CompoundText: React.FC<{ value: string | any; style?: any }> = ({
  value,
  style = {},
}) => {
  if (typeof value === "string") {
    return (
      <Text
        style={{
          ...styles.CARD_TITLE,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: undefined,
          textAlign: "left",
          color: color.darkPink,
          ...style,
        }}
      >
        {value}
      </Text>
    );
  }

  return (
    <Text style={style}>
      {value.map((part: any, idx: number) => (
        <Text
          key={idx}
          style={{
            ...styles.CARD_TITLE,
            fontSize: 14,
            lineHeight: 20,
            textAlign: "left",
            color: color.darkPink,
            fontWeight: part.style === "bold" ? "bold" : undefined,
          }}
        >
          {part.text}
        </Text>
      ))}
    </Text>
  );
};
