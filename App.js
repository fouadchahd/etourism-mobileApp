import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "./app/screens/RootStackScreen";
export default function App() {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
}
