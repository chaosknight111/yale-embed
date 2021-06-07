import { Platform, StyleSheet } from "react-native";
import { WP, color } from "../../config";

export const RecommendationsStyles = StyleSheet.create({
  CONTAINER: {
    paddingHorizontal: WP(5.3),
  },

  TITLE: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: Platform.OS === "ios" ? "500" : "700",
    color: color.primary,
    marginBottom: 10,
  },

  TEXT: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: color.primary,
    marginBottom: 20,
  },

  HEADING: {
    fontWeight: Platform.OS === "ios" ? "500" : "700",
  },

  ASSESSMENT_CONTAINER: { marginBottom: 20, marginTop: 5, paddingLeft: 15 },
});
