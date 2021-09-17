import { Dimensions, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { colors } from "../../../assets/styles/colors";

export const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  title: {
    color: colors.primary.lighter,
    fontSize: 16,
  },
  rightSpace: {
    width: 36,
  },
  //
  ButtonsGroup: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  GroupButton: {
    backgroundColor: "white",
    color: colors.primary.lighter,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 3,
    borderColor: colors.primary.lighter,
  },
  GroupButtonRight: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftWidth: 0,
  },
  GroupButtonLeft: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 0,
  },
  GroupButtonActive: {
    backgroundColor: colors.primary.lighter,
    color: "white",
  },
  //   Login Form
  loginForm: {
    // marginHorizontal: 10,
    // marginBottom: 10,
    marginVertical: Dimensions.get("window").height * 0.1,
  },
  loginInput: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  loginButton: {
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 50,
  },
  loginDivider: {
    color: "rgba(50,50,50,.3)",
    textAlign: "center",
  },
  registerText: {
    // color: "rgba(50,50,50,.3)",
    textAlign: "center",
    marginTop: 20,
  },
  registerLink: {
    color: colors.primary.lighter,
    // textAlign: "center",
  },
});
