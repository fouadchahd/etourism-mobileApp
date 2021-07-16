import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "../screens/RootStackScreen";
import RootDrawerScreen from "../screens/RootDrawerScreen";
import AuthContext from "../contexts/AuthContext";

const AppNavigationContainer = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authToken ? <RootStackScreen /> : <RootDrawerScreen />}
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
