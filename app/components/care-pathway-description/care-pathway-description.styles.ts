import { StyleSheet } from "react-native";
import {
  HP,
  WP,
  spacing,
  fontSize,
  lineHeight,
  color,
} from "../../config/index";

export const CarePathWayDescriptionStyles = StyleSheet.create({
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
    flexDirection: "column",
    marginTop: spacing.small,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 1,
  },

  CARD_HEADER: {
    backgroundColor: color.darkPink,
    paddingVertical: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  HEADER_TEXT: {
    color: "white",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "700",
  },

  CARD_TITLE: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: color.primary,
  },

  CHILD_CARD: {
    marginHorizontal: WP(5.3),
    backgroundColor: color.lightestPink,
    borderRadius: 15,
    marginTop: spacing.small,
    marginBottom: spacing.medium,
  },

  BUTTON: {
    marginHorizontal: WP(5.3),
    height: WP(11),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: WP(15),
    backgroundColor: color.darkPink,
    marginBottom: spacing.medium,
  },

  BUTTON_TEXT: {
    color: color.primary,
    fontSize: 14,
  },
});
