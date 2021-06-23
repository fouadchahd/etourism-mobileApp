import React from "react";
import AppNavigationContainer from "./app/components/AppNavigationContainer";
import { AuthProvider } from "./app/contexts/AuthContext";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <AppNavigationContainer />
      </PaperProvider>
    </AuthProvider>
  );
}
