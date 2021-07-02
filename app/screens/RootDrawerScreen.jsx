import React from "react";
import MainTabScreen from "./MainTabScreen";
import SupportScreen from "./SupportScreen";
import SettingsScreen from "./SettingsScreen";
import DrawerContent from "../components/DrawerContent";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions } from "react-native";
import colors from "../res/colors";

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
      <Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
      <Drawer.Screen name="SupportScreen" component={SupportScreen} />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};
export default RootDrawerScreen;
