import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Avatar, Title, Caption, Paragraph, Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AuthContext from "../contexts/AuthContext";
import { deleteCredentials } from "../services/credentials";
import colors from "res/colors";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { IMLocalized } from "config/IMLocalized";

export default function DrawerContent(props) {
  const { authToken, setAuthToken } = React.useContext(AuthContext);

  let userInfo = authToken.data;
  return (
    <View style={{ flex: 1 }}>
      <View backgroundColor="white" style={{ flex: 1 }}>
        <View style={styles.drawerContent}>
          <LinearGradient
            style={[
              styles.userInfoSection,
              {
                paddingTop: Constants.statusBarHeight,
              },
            ]}
            colors={[colors.greenGradientColorStart, colors.greenGradient2]}
            start={[0, 0]}
            end={[0, 1]}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
              }}
            >
              <Image
                defaultSource={require("../assets/person_60px.png")}
                source={
                  userInfo?.profilePicture
                    ? { uri: userInfo.profilePicture }
                    : require("../assets/person_60px.png")
                }
                style={{
                  backgroundColor: colors.underlayColor,
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>
                  {!userInfo
                    ? ""
                    : `${userInfo.firstName} ${userInfo.lastName}`}
                </Title>
                <Caption style={styles.caption}>
                  {!userInfo ? "" : `@${userInfo.pseudo}`}
                </Caption>
              </View>
            </View>

            {false && (
              <View style={styles.row}>
                <View style={styles.section}>
                  <Caption style={styles.caption}>
                    {userInfo?.bio ? userInfo.bio : IMLocalized("defaultBio")}
                  </Caption>
                </View>
              </View>
            )}
          </LinearGradient>
          <DrawerContentScrollView
            backgroundColor={colors.grayWhite}
            style={{ paddingVertical: 0 }}
          >
            <Drawer.Section style={styles.drawerSection} paddingTop={20}>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="home-outline" color={color} size={size} />
                )}
                label={IMLocalized("drawerHomeLabel")}
                onPress={() => {
                  props.navigation.navigate("HomeStack");
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="account-outline"
                    color={color}
                    size={size}
                  />
                )}
                label={IMLocalized("drawerEditProfileLabel")}
                onPress={() => {
                  props.navigation.navigate("MainTabScreen", {
                    screen: "EditProfilStack",
                  });
                }}
              />

              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="settings-outline" color={color} size={size} />
                )}
                label={IMLocalized("drawerSettingsLabel")}
                onPress={() => {
                  props.navigation.navigate("SettingsScreen");
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="help-circle-outline" color={color} size={size} />
                )}
                label={IMLocalized("drawerSupportLabel")}
                onPress={() => {
                  props.navigation.navigate("SupportScreen");
                }}
              />
            </Drawer.Section>
            <Drawer.Section title="Preferences">
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="account-outline"
                    color={color}
                    size={size}
                  />
                )}
                label="FAQ"
                onPress={() => {
                  alert("not devloped yet!");
                }}
              />
            </Drawer.Section>
          </DrawerContentScrollView>
        </View>
      </View>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color={colors.red}
              size={size}
            />
          )}
          labelStyle={{ color: colors.primaryBlue, fontWeight: "700" }}
          label={IMLocalized("drawerLogoutLabel")}
          onPress={() => {
            deleteCredentials();
            setAuthToken(null);
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 18,
    marginTop: -2,
    fontWeight: "800",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: colors.primaryBlue,
    fontStyle: "italic",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: -51,
    // marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: colors.grayWhite,
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
