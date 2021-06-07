import React from "react";
import { Text, View } from "react-native";
import { RecommendationsStyles as styles } from "./recommendations.style";

type Props = {
  data: any;
};

export const Recommendations: React.FC<Props> = ({ data }) => {
  if (!data) return null;
  return (
    <View style={styles.CONTAINER}>
      <Text style={styles.TITLE}>{data.title}</Text>

      {data.patient_recommendations?.visible && (
        <>
          <Text style={styles.HEADING}>
            {data.patient_recommendations.header_message}
          </Text>
          <View style={styles.ASSESSMENT_CONTAINER}>
            {data.patient_recommendations.assessments.map(
              (assessment: string, idx: number) => (
                <Text key={idx} style={[styles.TEXT, { marginBottom: 0 }]}>
                  <Text style={styles.HEADING}>({idx + 1})</Text>{" "}
                  {assessment.replace(/ *\([^)]*\) */, "")}
                </Text>
              )
            )}
          </View>
        </>
      )}

      {data.orders?.visible && (
        <Text style={styles.TEXT}>
          <Text style={styles.HEADING}>{data.orders.title}: </Text>
          <Text>{data.orders.message}</Text>
        </Text>
      )}

      {data.prescriptions?.visible && (
        <Text style={styles.TEXT}>
          <Text style={styles.HEADING}>{data.prescriptions.title}: </Text>
          <Text>{data.prescriptions.message}</Text>
        </Text>
      )}

      {data.avs_discharge_instructions?.visible && (
        <Text style={styles.TEXT}>
          <Text style={styles.HEADING}>
            {data.avs_discharge_instructions.title}:{" "}
          </Text>
          <Text>{data.avs_discharge_instructions.message}</Text>
        </Text>
      )}

      {data.referral_for_treatment?.visible && (
        <Text style={styles.TEXT}>
          <Text style={styles.HEADING}>
            {data.referral_for_treatment.title}:{" "}
          </Text>
          <Text>{data.referral_for_treatment.message}</Text>
        </Text>
      )}
    </View>
  );
};
