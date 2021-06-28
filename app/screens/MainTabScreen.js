import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SupportScreen from "./SupportScreen";
import ProfileScreen from "./ProfileScreen";
import HomeScreen from "./HomeScreen";
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const MainTabScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#694fad",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarColor: "#1f65ff",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Support"
        component={SupportScreen}
        options={{
          tabBarLabel: "Support",
          tabBarColor: "#d02860",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
