import { StyleSheet } from "react-native";
import {
  HP,
  WP,
  spacing,
  fontSize,
  lineHeight,
  color,
} from "../../config/index";

export const OpioidTreatmentScreenStyles = StyleSheet.create({
  CONTAINER: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: color.bg,
  },

  BACK: {
    width: 25,
    height: 15,
    tintColor: color.primary,
    alignSelf: "center",
    marginLeft: spacing.small,
  },

  TITLE_VIEW: {
    flexDirection: "row",
    width: WP(100),
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: spacing.mediumPlus,
  },

  TITLE: {
    fontSize: 18,
    fontWeight: "500",
    width: WP(80),
    textAlign: "center",
    color: color.primary,
    // marginLeft: spacing.medium,
  },

  SUBTITLE: {
    fontSize: fontSize.smaller,
    textAlign: "center",
    width: WP(80),
    lineHeight: lineHeight.small,
    marginHorizontal: spacing.mediumPlus,
    color: color.primary,
    marginTop: spacing.medium,
  },

  PRESCRIBEROW: {
    width: WP(100),
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.large,
    flexDirection: "row",
    marginTop: spacing.medium,
  },

  PRESCRIBEROWTEXT: {
    fontSize: 16,
    color: color.primary,
  },

  CARD: {
    width: WP(90),
    // height: WP(50),
    marginTop: spacing.medium,
    backgroundColor: "white",
    borderRadius: 15,
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 140,
  },

  CARD_HEADER: {
    backgroundColor: color.darkPink,
    width: "100%",
    height: WP(13),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  HEADER_TEXT: {
    color: "white",
    fontSize: 16,
  },

  CARD_TITLE: {
    fontSize: 16,
    fontWeight: "500",
    width: "100%",
    textAlign: "center",
    color: color.primary,
    paddingHorizontal: spacing.medium,
    marginTop: spacing.small,
  },

  CHILD_CARD: {
    width: "90%",
    height: 229,
    backgroundColor: color.lightestPink,
    borderRadius: 15,
    marginTop: spacing.small,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.medium,
  },

  BUTTON: {
    width: "90%",
    height: WP(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: WP(15),
    backgroundColor: color.darkPurple,
    marginBottom: spacing.medium,
    marginTop: spacing.medium
  },

  BUTTON_TEXT: {
    color: color.primary,
    fontSize: 14,
  },

  SLIDER: {
    width: WP(80),
    // height: 40,
  },

  SLIDER_CHILD_VIEW: {
    width: WP(80),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  TRACK_STYLE: {
    height: 6,
  },

  ABSOULUTE_VIEW: {
    position: "absolute",
    flexDirection: "row",
    width: WP(65),
    height: 5,
    bottom: 17.5,
    top: 17.5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },

  ABSOULUTE_VIEW_DIVIDER: {
    height: "100%",
    width: 2,
    backgroundColor: color.lightGrey,
  },

  CARD_TINY_TEXT: {
    fontSize: 9,
    color: color.lightGrey,
    textAlign: "center",
  },

  CARD_SMALL_TEXT: {
    fontSize: 10,
    color: color.primary,
    textAlign: "center",
  },

  SLIDER_TOP_VIEW: {
    width: "85%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: spacing.medium
  },
});
