import { StyleSheet } from "react-native";
import {
  HP,
  WP,
  spacing,
  fontSize,
  lineHeight,
  color,
} from "../../config/index";

export const OpioidWithdrawalScreenStyles = StyleSheet.create({
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

  BUTTONS_VIEW: {
    width: WP(80),
    borderRadius: WP(5),
    borderWidth: 1,
    borderColor: color.lightGrey,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.small,
  },

  BUTTON_CENTER: {
    width: "100%",
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "space-between",
    borderTopLeftRadius: WP(15),
    borderBottomLeftRadius: WP(15),
    flexDirection: "row",
  },

  BUTTON: {
    width: "80%",
    height: WP(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: WP(15),
    backgroundColor: color.darkBlue,
    marginVertical: spacing.mediumPlus,
  },

  BUTTON_RIGHT: {
    width: "45%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: WP(15),
    borderBottomRightRadius: WP(15),
  },

  BUTTON_DIVIDER: {
    height: 1,
    width: "100%",
    backgroundColor: color.lightWhite,
  },

  BUTTON_TEXT: {
    color: color.primary,
    fontSize: 14,
  },

  CARD: {
    width: WP(90),
    marginBottom: spacing.medium,
    backgroundColor: "white",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 1,
    alignItems: "center",
    // justifyContent: "space-evenly",
  },

  CARD_HEADER: {
    backgroundColor: color.blue,
    width: WP(91),
    height: WP(13),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 1,
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
    paddingHorizontal: spacing.mediumPlus,
    marginTop: spacing.medium,
  },
});
