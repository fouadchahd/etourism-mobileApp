import React, { useState, useRef,useContext } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Toast from 'react-native-toast-message';
import Constants from "expo-constants";
import colors from "res/colors";
import { init, IMLocalized } from "config/IMLocalized";
import {login} from 'services/auth.service';
import {setCredentials} from 'services/credentials';
import AuthContext from "../contexts/AuthContext";
export const LoginScreen = ({ navigation ,route}) => {
  init();
  let init_email="";
  if(route&&route.params&&route.params.email){
    console.log("email",route.params.email);
    init_email=route.params.email;
  }
  const { authToken, setAuthToken}=useContext(AuthContext);
  const [email, setEmail] = useState(route?.params?.email?route.params.email:"");
  const [password, setPassword] = useState("");
  const passwordRef = useRef();
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [hidePassword, sethidePassword] = React.useState(true);
  const [isLoading, setisLoading] = useState(false)
  const formSubmited = () => {
    
    setInvalidCredentials(!isFormValid());
    isFormValid() && signIn(email,password);
  };
  const signIn= async (mail,pass)=>{
    setisLoading(true);
  await login(mail,pass)
  .then(({data})=>{
    setisLoading(false);
    console.log("SignIn Success",data);
    setCredentials(data);
    setAuthToken(data);
  })
  .catch((err)=>{
    //flush error message 
    setisLoading(false);
    Toast.show({
      type:"error",
      position:"bottom",
      visibilityTime: 3000,
      autoHide:true,
      bottomOffset:40,
      text1: IMLocalized("invalidCredentialsMessage"),
      text2: ''
    });
    console.log("SignIn Error... ")});

  }

  const isFormValid = () => {
    if (password.length < 8 || email.length === 0) {
      return false;
    }
    return true;
  };
  const toggleHidePassword = () => {
    sethidePassword(!hidePassword);
  };
  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const focusOnElement = (ref) => {
    ref && ref.current && ref.current.focus();
  };
  const theme = {
    colors: {
      placeholder: colors.placeholderTextColor,
      text: colors.inputTextColor,
      primary: colors.inputPrimaryColor,
    },
  };
  return (
    <ScrollView
      style={styles.screen}
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.BgHeader}>{IMLocalized("signInButtonText")}</Text>
        <Text style={styles.MdHeader}>{IMLocalized("SignInScreenTitle")}</Text>
        <Text style={styles.SmHeader}>
          {IMLocalized("SignInScreenSubTitle")}
        </Text>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{}</Text>
            <TextInput
              mode="outlined"
              value={email}
              placeholder={IMLocalized("emailLabel")}
              returnKeyType={IMLocalized("next")}
              outlineColor={colors.inputOutlineColor}
              theme={theme}
              textContentType="emailAddress"
              keyboardType={"email-address"}
              spellCheck={true}
              onChangeText={(text) => handleEmailChange(text)}
              onSubmitEditing={() => focusOnElement(passwordRef)}
              left={
                <TextInput.Icon
                  color={
                    invalidCredentials
                      ? colors.errorTextColor
                      : colors.appNameColor
                  }
                  name="mail"
                />
              }
              selectionColor={colors.inputSelectionColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{}</Text>
            <TextInput
              ref={passwordRef}
              mode="outlined"
              placeholder={IMLocalized("passwordLabel")}
              value={password}
              onChangeText={(text) => handlePasswordChange(text)}
              outlineColor={colors.inputOutlineColor}
              theme={theme}
              selectionColor={colors.inputSelectionColor}
              secureTextEntry={hidePassword ? true : false}
              textContentType="password"
              returnKeyType="done"
              left={
                <TextInput.Icon
                  color={
                    invalidCredentials
                      ? colors.errorTextColor
                      : colors.appNameColor
                  }
                  name="lock"
                />
              }
              right={
                <TextInput.Icon
                  onPress={toggleHidePassword}
                  name={hidePassword ? "eye-off" : "eye"}
                  color={colors.buttonPrimaryTextColor}
                />
              }
            />
            <Text style={styles.passwordErrorText}>
              {invalidCredentials && IMLocalized("invalidCredentialsErrorText")}
            </Text>
          </View>
          <View style={[styles.inputGroup, { marginTop: 30 }]}>
            <Button
              onPress={formSubmited}
              mode="contained"
              loading={isLoading}
              disabled={isLoading}
              uppercase={false}
              color={colors.buttonBackGroundPrimaryColor}
              contentStyle={{ height: 54 }}
            >
              <Text style={styles.primaryButtonText}>
                {isLoading?IMLocalized("signInButtonLoaderText"): IMLocalized("signInButtonText")}
              </Text>
            </Button>
          </View>
          <View style={styles.centredView}>
            <Text style={styles.smallCentredText}>
              {IMLocalized("noAccountText")}
              <Text
                onPress={() => navigation.navigate("GenderChoiceScreen")}
                style={{ fontWeight: "bold", color: "#343a40" }}
              >
                {IMLocalized("signUpHere")}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FFFCF5",
    paddingHorizontal: 10,
  },
  container: {
    paddingTop: 50,
  },
  BgHeader: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
  },
  MdHeader: {
    fontWeight: "400",
    fontSize: 26,
  },
  SmHeader: {
    marginTop: 8,
    fontSize: 19,
    letterSpacing: 1,
  },
  formContainer: {
    marginTop: 80,
  },
  inputGroup: {
    marginVertical: 8,
  },
  label: {
    fontWeight: "500",
    fontSize: 18,
    color: colors.inputOutlineColor,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.buttonPrimaryTextColor,
  },
  centredView: {
    marginTop: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  smallCentredText: {
    color: "gray",
    fontSize: 15,
  },
  passwordErrorText: {
    marginTop: 5,
    fontSize: 13,
    marginLeft: 1,
    textAlign: "justify",
    color: colors.errorTextColor,
  },
});
