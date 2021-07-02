import React from "react";
import { StyleSheet } from "react-native";
import {
  EditFirstnameScreen,
  EditLastnameScreen,
  EditNationalityScreen,
  EditPseudoScreen,
  EditBioScreen,
} from "./userEditableInfo";
import EditProfile from "./EditProfile";
import { IMLocalized } from "config/IMLocalized";
import { createStackNavigator } from "@react-navigation/stack";

import HeaderEditProfil from "../components/HeaderEditProfil";
const EditProfileStack = createStackNavigator();

const EditProfileRootStack = ({ navigation }) => {
  return (
    <EditProfileStack.Navigator>
      <EditProfileStack.Screen
        options={{
          title: IMLocalized("drawerEditProfileLabel"),
          headerBackTitle: " ",
          headerTitle: () => <HeaderEditProfil navigation={navigation} />,
          headerBackAllowFontScaling: true,
        }}
        name="EditProfileScreen"
        component={EditProfile}
      />
      <EditProfileStack.Screen
        options={{ title: IMLocalized("bioLabel"), headerBackTitle: " " }}
        name="EditBioScreen"
        component={EditBioScreen}
      />
      <EditProfileStack.Screen
        options={{
          title: IMLocalized("firstNameLabel"),
          headerBackTitle: " ",
        }}
        name="EditFirstnameScreen"
        component={EditFirstnameScreen}
      />
      <EditProfileStack.Screen
        options={{ title: IMLocalized("lastNameLabel"), headerBackTitle: " " }}
        name="EditLastnameScreen"
        component={EditLastnameScreen}
      />
      <EditProfileStack.Screen
        options={{
          title: IMLocalized("nationalityLabel"),
          headerBackTitle: " ",
        }}
        name="EditNationalityScreen"
        component={EditNationalityScreen}
      />
      <EditProfileStack.Screen
        options={{ title: IMLocalized("pseudoLabel"), headerBackTitle: " " }}
        name="EditPseudoScreen"
        component={EditPseudoScreen}
      />
    </EditProfileStack.Navigator>
  );
};

export default EditProfileRootStack;

const styles = StyleSheet.create({});
