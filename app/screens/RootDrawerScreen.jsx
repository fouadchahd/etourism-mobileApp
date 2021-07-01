import React from "react";
import MainTabScreen from "./MainTabScreen";
import SupportScreen from "./SupportScreen";
import SettingsScreen from "./SettingsScreen";
import DrawerContent from "../components/DrawerContent";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions } from "react-native";
import { IMLocalized } from "config/IMLocalized";
import colors from "../res/colors";
import EditProfile from "./EditProfile";
import {
  EditFirstnameScreen,
  EditLastnameScreen,
  EditNationalityScreen,
  EditPseudoScreen,
  EditBioScreen,
} from "./userEditableInfo";
const Drawer = createDrawerNavigator();
const RootDrawerScreen = ({ navigation }) => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: colors.grayWhite,
        width: (3 * Dimensions.get("window").width) / 4,
      }}
      drawerContentOptions={{
        labelStyle: {
          fontWeight: "900",
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
      <Drawer.Screen name="SupportScreen" component={SupportScreen} />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfileRootStack} />
    </Drawer.Navigator>
  );
};
export default RootDrawerScreen;

const EditProfileStack = createStackNavigator();

function EditProfileRootStack({ navigation }) {
  return (
    <EditProfileStack.Navigator>
      <EditProfileStack.Screen
        options={{ headerShown: false }}
        name="EditProfileScreen"
        component={EditProfile}
      />
      <EditProfileStack.Screen
        options={{ title: IMLocalized("bioLabel"), headerBackTitle: " " }}
        name="EditBioScreen"
        component={EditBioScreen}
      />
      <EditProfileStack.Screen
        options={{ title: IMLocalized("firstNameLabel"), headerBackTitle: " " }}
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
}
