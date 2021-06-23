import React from "react";
import MainTabScreen from "./MainTabScreen";
import SupportScreen from "./SupportScreen";
import SettingsScreen from "./SettingsScreen";
import DrawerContent from "../components/DrawerContent";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
const RootDrawerScreen = ({ navigation }) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
      <Drawer.Screen name="SupportScreen" component={SupportScreen} />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};
export default RootDrawerScreen;
