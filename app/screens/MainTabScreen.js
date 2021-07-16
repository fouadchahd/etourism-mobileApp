import React, { useContext } from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SupportScreen from "./SupportScreen";
import MapsScreen from "./MapsScreen";
import HomeScreen from "./HomeScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { IMLocalized } from "config/IMLocalized";
import AuthContext from "../contexts/AuthContext";
import colors from "res/colors";
import EditProfileRootStack from "./EditProfileRootStack";
import HomeStackScreen from "./HomeStackScreen";
const Tab = createBottomTabNavigator();
const createTabProfilItem = (focused, label, urlImage) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        top: 20,
      }}
    >
      <Image
        defaultSource={require("../assets/person_60px.png")}
        source={
          urlImage ? { uri: urlImage } : require("../assets/person_60px.png")
        }
        style={{
          backgroundColor: focused
            ? colors.activeTapIconColor
            : colors.underlayColor,
          width: 30,
          height: 30,
          resizeMode: "contain",
          borderRadius: 15,
          borderColor: focused ? colors.activeTapIconColor : colors.underlayColor,
          borderWidth: 1,
        }}
      />
      <Text
        style={{
          fontSize: 12,
          color: focused ? colors.activeTapIconColor : colors.softGray,
        }}
      ></Text>
    </View>
  );
};
const createTabItem = (focused, label, icon) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        top: 20,
      }}
    >
      <Icon
        name={icon}
        size={30}
        color={focused ? colors.activeTapIconColor : colors.softGray}
      />
      <Text
        style={{
          fontSize: 12,
          color: focused ? colors.activeTapIconColor : colors.softGray,
        }}
      >
        {false && IMLocalized(label)}
      </Text>
    </View>
  );
};
const MainTabScreen = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const pictureUri = authToken?.data?.profilePicture
    ? authToken.data.profilePicture
    : null;
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: Platform.OS==='ios' ?29:10,
          backgroundColor:colors.lightGreen,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 20,
          height: 70,
          borderColor: colors.inputOutlineColor2,
          borderWidth: 0.2,
          borderTopWidth: 0.3,
          borderTopColor: colors.inputPrimaryColor,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            createTabItem(focused, "drawerHomeLabel", "ios-home"),
        }}
      />
      <Tab.Screen
        name="Maps"
        component={MapsScreen}
        options={{
          tabBarIcon: ({ focused }) => createTabItem(focused, "", "earth"),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={SupportScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            createTabItem(focused, "drawerExploreLabel", "ios-search"),
        }}
      />
      <Tab.Screen
        name="EditProfilStack"
        component={EditProfileRootStack}
        options={{
          tabBarIcon: ({ focused }) =>
            createTabProfilItem(focused, "drawerProfilLabel", pictureUri),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.underlayColor,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.4,
    elevation: 4,
    opacity:0.8
  },
});
