import React, { useContext, useState } from "react";
import { StyleSheet, Text, Dimensions, View } from "react-native";
import colors from "res/colors";
import { IMLocalized } from "config/IMLocalized";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Constants from "expo-constants";
const HeaderEditProfil = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftView}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Text style={styles.leftText}>{IMLocalized("cancel")}</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.centerView}>
        <Text style={styles.centerText} numberOfLines={1} ellipsizeMode="tail">
          {IMLocalized("drawerEditProfileLabel")}
        </Text>
      </View>
      <View style={styles.rightView}>
        <Text
          style={[
            styles.rightText,
            false ? {} : { color: colors.softGray, opacity: 0.0 },
          ]}
        >
          {IMLocalized("save")}
        </Text>
      </View>
    </View>
  );
};

export default HeaderEditProfil;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftView: { marginLeft: 15 },
  leftText: { color: colors.skyblue, fontSize: 16 },
  rightView: { marginRight: 15 },
  rightText: { color: colors.skyblue, fontWeight: "700", fontSize: 16 },
  centerView: {
    alignSelf: "center",
  },
  centerText: {
    fontSize: 18,
    fontWeight: "500",
    overflow: "hidden",
    maxWidth: Dimensions.get("window").width - 200,
  },
  section: {
    margin: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.deviderColor,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  leftTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
    opacity: 0.7,
  },
  rightTitle: {
    color: colors.skyblue,
    fontSize: 16,
  },
  sectionContent: {
    padding: 10,
    marginBottom: 20,
  },
  displayText: {
    fontSize: 15,
    marginHorizontal: 20,
    color: colors.softBlack,
    opacity: 0.8,
    fontWeight: "400",
    lineHeight: 20,
  },
});
