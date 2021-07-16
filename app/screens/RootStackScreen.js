import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./SplashScreen";
import { RegisterScreen } from "./RegisterScreen";
import { LoginScreen } from "./LoginScreen";
import GenderChoiceScreen from "./completeProfile/GenderChoiceScreen";
import NationalityPickerScreen from "./completeProfile/NationalityPickerScreen";
import ProfilePicturePickerScreen from "./completeProfile/ProfilePicturePickerScreen";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />

    <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
    <RootStack.Screen name="LoginScreen" component={LoginScreen} />
    <RootStack.Screen
      name="NationalityPickerScreen"
      component={NationalityPickerScreen}
    />
    <RootStack.Screen
      name="ProfilePicturePickerScreen"
      component={ProfilePicturePickerScreen}
    />
    <RootStack.Screen
      name="GenderChoiceScreen"
      component={GenderChoiceScreen}
    />
  </RootStack.Navigator>
);

export default RootStackScreen;
