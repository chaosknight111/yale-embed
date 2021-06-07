import { StyleSheet } from "react-native";
import {
  HP,
  WP,
  spacing,
  fontSize,
  lineHeight,
  color,
} from "../../config/index";

export const CarePathwayScreenStyles = StyleSheet.create({
  CONTAINER: {
    flexGrow: 1,
    paddingHorizontal: WP(5),
    paddingBottom: 21,
    backgroundColor: color.bg,
  },

  BACK: {
    width: 25,
    height: 15,
    tintColor: color.primary,
    alignSelf: "center",
  },

  TITLE_VIEW: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: spacing.mediumPlus,
  },

  TITLE: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
    textAlign: "left",
    color: color.primary,
  },
});
