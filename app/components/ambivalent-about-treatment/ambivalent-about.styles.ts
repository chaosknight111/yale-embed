import { StyleSheet } from "react-native";
import {
  HP,
  WP,
  spacing,
  fontSize,
  lineHeight,
  color,
} from "../../config/index";

export const AmbivalentAboutStyles = StyleSheet.create({
  CONTAINER: {
    flexGrow: 1,
    // alignItems: "center",
    paddingHorizontal: WP(5),
    paddingBottom: 21,
    backgroundColor: color.bg,
  },

  BACK: {
    width: 25,
    height: 15,
    tintColor: color.primary,
    alignSelf: "center",
    // marginLeft: spacing.small,
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
    // width: WP(75),
    flex: 1,
    textAlign: "left",
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
    flexDirection: 'column',
    // width: WP(90),
    // height: WP(50),
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
    // alignItems: "center",
    // justifyContent: "flex-start",
    // marginBottom: spacing.medium,
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
    // width: "100%",
    textAlign: "center",
    color: color.primary,
    // paddingHorizontal: spacing.medium,
    // marginTop: spacing.small,
  },

  CHILD_CARD: {
    // width: "90%",
    // height: 229,
    marginHorizontal: WP(5.3),
    backgroundColor: color.lightestPink,
    borderRadius: 15,
    marginTop: spacing.small,
    // alignItems: "center",
    // justifyContent: "center",
    marginBottom: spacing.medium,
  },

  BUTTON: {
    // width: "80%",
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
