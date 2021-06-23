import React, { useState, useEffect, createContext } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    try {
      const jwt_auth = SecureStore.getItemAsync("jwt_auth");
      if (jwt_auth) setAuthToken(jwt_auth);
    } catch (error) {
      console.log("Error while fetching jwt_auth from secureStore", error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken: authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
