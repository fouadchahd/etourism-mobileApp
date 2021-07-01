import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SupportScreen from "./SupportScreen";
import ProfileScreen from "./ProfileScreen";
import MapsScreen from "./MapsScreen";
import HomeScreen from "./HomeScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { IMLocalized } from "config/IMLocalized";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import colors from "res/colors";
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
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: "white",
          elevation: 0,
          borderRadius: 15,
          height: 70,
          borderColor: colors.grayWhite,
          borderWidth: 0.3,
          borderTopWidth: 0.3,
          borderTopColor: colors.grayWhite,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
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
        name="Profile"
        component={ProfileScreen}
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
    shadowColor: colors.buttonBackGroundPrimaryColor,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 3.5,
    shadowOpacity: 0.2,
    elevation: 5,
  },
});
