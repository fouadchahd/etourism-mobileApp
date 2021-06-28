import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Avatar, Title, Caption, Paragraph, Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AuthContext from "../contexts/AuthContext";
import { deleteCredentials } from "../services/credentials";
import colors from "res/colors";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { init, IMLocalized } from "config/IMLocalized";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function DrawerContent(props) {
  const { authToken, setAuthToken } = React.useContext(AuthContext);
  const userInfo = JSON.parse(authToken).data;
  return (
    <View style={{ flex: 1 }}>
      <View backgroundColor="white" style={{ flex: 1 }}>
        <View style={styles.drawerContent}>
          <LinearGradient
            style={[
              styles.userInfoSection,
              { paddingTop: Constants.statusBarHeight },
            ]}
            colors={[colors.greenGradientColorStart, colors.greenGradient2]}
          >
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={
                  userInfo.profilePicture
                    ? { uri: userInfo.profilePicture.url }
                    : require("../assets/male_user_50px.png")
                }
                size={50}
                style={{ backgroundColor: "transparent" }}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title
                  style={styles.title}
                >{`${userInfo.firstName} ${userInfo.lastName}`}</Title>
                <Caption
                  style={styles.caption}
                >{`@${userInfo.pseudo}`}</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Caption style={styles.caption}>
                  {IMLocalized("defaultBio")}
                </Caption>
              </View>
            </View>
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
                  props.navigation.navigate("Home");
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
                  props.navigation.navigate("EditProfile");
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
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    marginTop: 3,
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
