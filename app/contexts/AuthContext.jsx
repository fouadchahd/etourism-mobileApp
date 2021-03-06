import React, { useState, useEffect, createContext } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    async function getcrd() {
      try {
        const jwt_authString = await SecureStore.getItemAsync("jwt_auth");
        if (jwt_authString) {
          const jwt_auth = await JSON.parse(jwt_authString);
          if (jwt_auth) setAuthToken(jwt_auth);
        } else {
          setAuthToken(null);
        }
      } catch (error) {
        console.log("Error while fetching jwt_auth from secureStore", error);
        setAuthToken(null);
      }
    }
    getcrd();
  }, []);

  return (
    <AuthContext.Provider value={{ authToken: authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
