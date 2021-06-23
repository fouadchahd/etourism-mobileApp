import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "../screens/RootStackScreen";
import RootDrawerScreen from "../screens/RootDrawerScreen";
import AuthContext from "../contexts/AuthContext";

const AppNavigationContainer = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  console.log("authToken is", authToken);
  return (
    <NavigationContainer>
      {authToken ? <RootStackScreen /> : <RootStackScreen />}
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
