import React, { useContext, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "res/colors";
import { IMLocalized } from "config/IMLocalized";
import Constants from "expo-constants";
import AuthContext from "../contexts/AuthContext";
import countries from "res/countries";
import { deleteCredentials } from "services/credentials";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";

const getCountryName = (code) => {
  let matchedCountry = countries.filter((country) => country.code === code);
  let matchedCode = matchedCountry[0].name;
  return matchedCode;
};
const EditProfile = ({ navigation, route }) => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const authInfo = authToken.data;
  const [somethingChanged, setSomethingChanged] = useState(false);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    console.log("EditProfileScreenIsOnFocused");
  }, [isFocused, route.params]);

  return (
    <View style={[styles.screen, { backgroundColor: "white" }]}>
      <ScrollView
        horizontal={false}
        bounces={true}
        style={{ backgroundColor: "white", marginBottom: 100 }}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.leftTitle}>
              {IMLocalized("profilePictureLabel")}
            </Text>
            <Text style={styles.rightTitle}>{}</Text>
          </View>
          <View style={styles.pictureContainer}>
            <Image
              defaultSource={require("../assets/person_120px.png")}
              source={
                authInfo.profilePicture
                  ? { uri: authInfo.profilePicture }
                  : require("../assets/person_120px.png")
              }
              style={{
                backgroundColor: colors.underlayColor,
                width: 180,
                height: 180,
                resizeMode: "contain",
                borderRadius: 90,
              }}
            />
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.leftTitle}>
              {IMLocalized("personalInfoLabel")}
            </Text>
            <Text style={styles.rightTitle}>{}</Text>
          </View>
          <View
            style={[
              styles.sectionContent,
              {
                width: Dimensions.get("screen").width,
                marginLeft: -15,
                paddingHorizontal: 0,
                marginBottom: 0,
                paddingBottom: 0,
              },
            ]}
          >
            <TouchableHighlight
              style={styles.editRow}
              underlayColor={colors.underlayColor}
              onPress={() =>
                navigation.navigate("EditPseudoScreen", {
                  pseudo: authInfo.pseudo,
                  firstName: authInfo.firstName,
                  lastName: authInfo.lastName,
                })
              }
            >
              <>
                <Text style={styles.menuBoldTitle} numberOfLines={1}>
                  {IMLocalized("pseudoLabel")}
                </Text>
                <View style={styles.menuRightView}>
                  <Text style={styles.meniInfoText}>
                    {authInfo?.pseudo ? `@${authInfo.pseudo}` : null}
                  </Text>
                  <Icon
                    style={{
                      padding: 0,
                      transform: [{ translateY: -2 }, { translateX: 8 }],
                    }}
                    color={colors.softGray}
                    size={25}
                    name="keyboard-arrow-right"
                  ></Icon>
                </View>
              </>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.editRow}
              underlayColor={colors.underlayColor}
              onPress={() =>
                navigation.navigate("EditFirstnameScreen", {
                  firstName: authInfo.firstName,
                })
              }
            >
              <>
                <Text style={styles.menuBoldTitle} numberOfLines={1}>
                  {IMLocalized("firstNameLabel")}
                </Text>
                <View style={styles.menuRightView}>
                  <Text style={styles.meniInfoText}>
                    {authInfo?.firstName ? authInfo.firstName : null}
                  </Text>
                  <Icon
                    style={{
                      padding: 0,
                      transform: [{ translateY: -2 }, { translateX: 8 }],
                    }}
                    color={colors.softGray}
                    size={25}
                    name="keyboard-arrow-right"
                  ></Icon>
                </View>
              </>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.editRow}
              underlayColor={colors.underlayColor}
              onPress={() =>
                navigation.navigate("EditLastnameScreen", {
                  lastName: authInfo.lastName,
                })
              }
            >
              <>
                <Text style={styles.menuBoldTitle} numberOfLines={1}>
                  {IMLocalized("lastNameLabel")}
                </Text>
                <View style={styles.menuRightView}>
                  <Text style={styles.meniInfoText}>
                    {authInfo?.lastName ? authInfo.lastName : null}
                  </Text>
                  <Icon
                    style={{
                      padding: 0,
                      transform: [{ translateY: -2 }, { translateX: 8 }],
                    }}
                    color={colors.softGray}
                    size={25}
                    name="keyboard-arrow-right"
                  ></Icon>
                </View>
              </>
            </TouchableHighlight>

            <TouchableWithoutFeedback
              style={[styles.editRow, { opacity: 0.5 }]}
              underlayColor={colors.underlayColor}
              onPress={() => alert(IMLocalized("unchangeableField"))}
            >
              <>
                <Text
                  style={[styles.menuBoldTitle, { color: colors.black }]}
                  numberOfLines={1}
                >
                  {IMLocalized("emailLabel")}
                </Text>
                <View style={styles.menuRightView}>
                  <Text style={styles.meniInfoText}>
                    {authInfo?.email ? authInfo.email : null}
                  </Text>
                  <Icon
                    style={{
                      padding: 0,
                      transform: [{ translateY: -2 }, { translateX: 8 }],
                    }}
                    color={colors.softGray}
                    size={25}
                    name="keyboard-arrow-right"
                  ></Icon>
                </View>
              </>
            </TouchableWithoutFeedback>

            <TouchableHighlight
              style={styles.editRow}
              underlayColor={colors.underlayColor}
              onPress={() =>
                navigation.navigate("EditNationalityScreen", {
                  nationality: authInfo.nationality,
                  countryName: getCountryName(authInfo.nationality),
                })
              }
            >
              <>
                <Text style={styles.menuBoldTitle} numberOfLines={1}>
                  {IMLocalized("countryLabel")}
                </Text>
                <View style={styles.menuRightView}>
                  <Text style={styles.meniInfoText}>
                    {authInfo?.nationality
                      ? getCountryName(authInfo.nationality)
                      : null}
                  </Text>
                  <Icon
                    style={{
                      padding: 0,
                      transform: [{ translateY: -2 }, { translateX: 8 }],
                    }}
                    color={colors.softGray}
                    size={25}
                    name="keyboard-arrow-right"
                  ></Icon>
                </View>
              </>
            </TouchableHighlight>
          </View>
        </View>
        <View style={[styles.section, { borderBottomWidth: 0 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.leftTitle}>{IMLocalized("bioLabel")}</Text>
            <Text style={styles.rightTitle}>{}</Text>
          </View>
          <View style={styles.sectionContent}>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("EditBioScreen", { bio: authInfo.bio })
              }
            >
              <Text
                style={styles.displayText}
                numberOfLines={4}
                ellipsizeMode={"tail"}
              >
                {authInfo?.bio
                  ? `" ${authInfo.bio} "`
                  : `" ${IMLocalized("defaultBio")} "`}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.section}>
          <TouchableHighlight
            style={[
              styles.editRow,
              { justifyContent: "center", alignItems: "center" },
              {
                width: Dimensions.get("screen").width,
                marginLeft: -15,
              },
            ]}
            underlayColor={colors.roseWhite}
            onPress={() => {
              deleteCredentials();
              setAuthToken(null);
            }}
          >
            <>
              <Text style={styles.logoutText}>
                {IMLocalized("drawerLogoutLabel")}
              </Text>
              <IconFontAwesome
                color={colors.red}
                size={22}
                name="sign-out"
              ></IconFontAwesome>
            </>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    height: 44.5 + Constants.statusBarHeight,
    borderBottomWidth: 0.3,
    borderBottomColor: colors.underlayColor,
    flexDirection: "row",
    flexWrap: "nowrap",
    //backgroundColor: colors.beij,
    backgroundColor: colors.pureWhite,
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
  editRow: {
    paddingVertical: 10,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: colors.deviderColor,
    borderTopWidth: 0.5,
    paddingHorizontal: 15,
  },
  menuBoldTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.black,
    opacity: 0.7,
  },
  menuRightView: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 0,
    justifyContent: "center",
  },
  meniInfoText: {
    color: colors.softGray,
    fontWeight: "500",
    transform: [{ translateX: 10 }],
  },
  pictureContainer: {
    alignSelf: "center",
    marginVertical: 16,
    shadowRadius: 5,
    shadowOpacity: 0.6,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: colors.skyblue,
  },
  logoutText: {
    color: colors.red,
    fontWeight: "700",
    marginRight: 4,
  },
});
