import { StyleSheet } from "react-native";
import { HP, WP, spacing, fontSize, lineHeight, color } from "../../config/index";

export const BuprenorphineInitiationScreenStyles = StyleSheet.create({
  CONTAINER: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: color.bg,
  },

  TITLE: {
    fontSize: 18,
    fontWeight: "500",
    width: WP(100),
    textAlign: "center",
    color: color.primary,
    marginTop: spacing.mediumPlus,
  },

  SUBTITLE: {
    fontSize: 11,
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
    height: WP(50),
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
    justifyContent: "space-evenly",
  },

  CARD_TITLE: {
    fontSize: 16,
    fontWeight: "500",
    width: WP(100),
    textAlign: "center",
    color: color.primary,
  },

  CARD_CHILD_VIEW: {
    width: WP(65),
    height: WP(8.5),
    borderRadius: WP(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.lightGreen,
  },

  IMAGE: {
    height: WP(5),
    width: WP(5),
  },

  CARD_TEXT: {
    fontSize: 14,
    color: color.darkgreen,
    fontWeight: "500",
    marginLeft: spacing.tiny,
  },

  CARD_TINY_TEXT: {
    fontSize: 9,
    color: color.primary,
    textAlign: "center",
  },

  CARD_SMALL_TEXT: {
    fontSize: 14,
    color: color.primary,
    textAlign: "center",
    paddingHorizontal: spacing.mediumPlus,
  },

  CARD_MEDIUM_TEXT: {
    fontSize: 16,
    color: color.primary,
    textAlign: "center",
    paddingHorizontal: spacing.mediumPlus,
  },

  CARD_BUTTONS_VIEW: {
    width: WP(70),
    height: WP(10),
    borderRadius: WP(15),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: color.lightGrey,
    alignItems: "center",
    justifyContent: "space-between",
  },

  CARD_BUTTON_LEFT: {
    width: "45%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: WP(15),
    borderBottomLeftRadius: WP(15),
  },

  CARD_BUTTON: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: WP(15),
  },

  CARD_BUTTON_RIGHT: {
    width: "45%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: WP(15),
    borderBottomRightRadius: WP(15),
  },

  CARD_BUTTON_DIVIDER: {
    height: "70%",
    width: 1,
    backgroundColor: color.lightWhite,
  },

  CARD_BUTTON_TEXT: {
    color: color.primary,
    fontSize: 14,
  },

  PINK_TEXT: {
    color: color.darkPink,
    fontWeight: "500",
    width: WP(100),
    textAlign: "center",
    fontSize: 16,
  },

  PATHWAH_CHILD_VIEW: {
    alignItems: "center",
  },

  DROP_DOWN_VIEW: {
    width: WP(70),
    height: WP(9),
    borderWidth: 1,
    borderColor: color.lightGrey,
    alignItems: "center",
    justifyContent: "center",
  },

  DROP_DOWN: {
    width: "100%",
    height: "100%",
    paddingHorizontal: spacing.small,
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
    width: WP(28),
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
});
