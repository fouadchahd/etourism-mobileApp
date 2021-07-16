import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import Constants from "expo-constants";
import colors from "res/colors";
import { init, IMLocalized } from "config/IMLocalized";
import { registerUser } from "services/auth.service";
import * as SecureStore from "expo-secure-store";
import { storage } from '../firebase';


import Toast from "react-native-toast-message";
import { login } from "../services/auth.service";
export const RegisterScreen = ({ navigation,route }) => {
/*React.useEffect( ()=>{
  async function clearStorage(){
      const ok =await SecureStore.deleteItemAsync("jwt_auth");
      console.log('registerScreen state',ok)
  }clearStorage();
} 
);*/
  let gender = null;
  let profilePicture = null;
  let nationality=null;
  if (route && route.params) {
    if (route.params.gender){ gender = route.params.gender;}
    if (route.params.profilePicture){ profilePicture = route.params.profilePicture;}
    if (route.params.selectedCountryCode){ nationality = route.params.selectedCountryCode;}
  }
  init();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef();
  const [firstName, setFirstName] = useState("");
  const lastnameRef = useRef();
  const [lastName, setLastName] = useState("");
  const emailRef = useRef();
  const [hidePassword, sethidePassword] = React.useState(true);
  const [passwordError, setPasswordError] = useState([]);
  const [enabledKB, setenabledKB] = useState(false);
  const [profilePictureUrl,setProfilePictureUrl]=React.useState(null);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  React.useEffect(() => {
    async function getcrdt() {
      try {
        const jwt = await SecureStore.getItemAsync("jwt_auth");
        if (jwt) {
          console.log("datat stored", jwt);
        }
      } catch (e) {
        console.log("error while fetching secure store");
      }
    }
    getcrdt();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const checkPassword = (pwd) => {
    setPasswordError([]);
    if (pwd.length < 8) {
      setPasswordError([IMLocalized("passwordLengthError")]);
    }
  };

  const toggleHidePassword = () => {
    sethidePassword(!hidePassword);
  };
  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
    checkPassword(text);
  };
  const focusOnElement = (ref) => {
    ref && ref.current && ref.current.focus();
  };
  const cleardata = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setErrors("");
    setPasswordError("");
  };
  const uploadSinglePicture = async (picture) => {
    if (picture) {
      var now = new Date();
      const res = await fetch(picture.uri);
      const blob = await res.blob();
      const uploadTask = storage
        .ref(`profilePhotos/${lastName}_${now.getTime()}`)
        .put(blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("image progress " + progress);
        },
        (error) => {
          console.log("err", error);
          setIsLoading(false);
          Toast.show({
            type: "error",
            position: "bottom",
            text2: "",
            text1: IMLocalized("invalidRegisteringMessage"),
            visibilityTime: 3000,
            autoHide: true,
            bottomOffset: 40,
          });        },
        () => {
          storage
            .ref("profilePhotos")
            .child(`${lastName}_${now.getTime()}`)
            .getDownloadURL()
            .then((url) => {
              console.log("image url", url);
              setProfilePictureUrl(url);
              sendDataToDb(url);
            });
        }
      );
    }
  };
  const signUpButtonPressed = async () => {
    setIsLoading(true);
    if (
      email.length === 0 &&
      password.length === 0 &&
      firstName.length === 0 &&
      lastName.length === 0
    ) {
      setIsLoading(false);
      Toast.show({
        type: "error",
        position: "bottom",
        text2: "",
        text1: IMLocalized("fillAllFieldErrorMessage"),
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 40,
      });
    } else {
       uploadSinglePicture(profilePicture);
    }
  };
  const sendDataToDb=(vprofilePictureUrl)=>{
    if(vprofilePictureUrl!==null){
      console.log("profilePictureUrl",vprofilePictureUrl);
      registerUser(firstName.trim(), lastName.trim(), email, password,gender,nationality,vprofilePictureUrl)
      .then(({ data }) => {
        console.log("tousrist data",data);
        setIsLoading(false);
        Toast.show({
          type: "success",
          position: "bottom",
          text2: "",
          text1: IMLocalized("validRegisteringMessage"),
          visibilityTime: 4000,
          autoHide: true,
          bottomOffset: 40,
        });
      }).then(()=>{
          navigation.navigate("LoginScreen",{email});
          //cleardata();
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoading(false);
        Toast.show({
          type: "error",
          position: "bottom",
          text2: "",
          text1: IMLocalized("invalidRegisteringMessage"),
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 40,
        });
      });
    }
   }
  const theme = {
    colors: {
      placeholder: colors.placeholderTextColor,
      text: colors.inputTextColor,
      primary: colors.inputPrimaryColor,
      background: colors.lightblue,
    },
  };
  return (
    <KeyboardAvoidingView
      behavior={"position"}
      style={styles.screen}
      enabled={enabledKB}
    >
      <ScrollView bounces={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.BgHeader}>{IMLocalized("welcomeText")}</Text>
          <Text style={styles.MdHeader}>
            {IMLocalized("registerForFreeInText")}
            <Text style={{ color: "#1e6091", fontWeight: "700" }}>
              {IMLocalized("appName")}
            </Text>{" "}
          </Text>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{}</Text>
              <TextInput
                mode="outlined"
                value={firstName}
                returnKeyType={IMLocalized("next")}
                placeholder={IMLocalized("firstNameLabel")}
                outlineColor={colors.inputOutlineColor}
                theme={theme}
                textContentType="givenName"
                onChangeText={(text) => setFirstName(text)}
                onFocus={() => setenabledKB(false)}
                onSubmitEditing={() => focusOnElement(lastnameRef)}
                left={
                  <TextInput.Icon
                    color={colors.appNameColor}
                    name="card-account-details"
                  />
                }
                selectionColor={colors.inputSelectionColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{}</Text>
              <TextInput
                ref={lastnameRef}
                placeholder={IMLocalized("lastNameLabel")}
                mode="outlined"
                textContentType="familyName"
                returnKeyLabel={IMLocalized("next")}
                value={lastName}
                outlineColor={colors.inputOutlineColor}
                theme={theme}
                onChangeText={(text) => setLastName(text)}
                onFocus={() => setenabledKB(false)}
                onSubmitEditing={() => focusOnElement(emailRef)}
                left={
                  <TextInput.Icon
                    color={colors.appNameColor}
                    name="card-account-details-outline"
                  />
                }
                selectionColor={colors.inputSelectionColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{}</Text>
              <TextInput
                ref={emailRef}
                mode="outlined"
                value={email}
                placeholder={IMLocalized("emailLabel")}
                returnKeyType={IMLocalized("next")}
                outlineColor={colors.inputOutlineColor}
                theme={theme}
                textContentType="emailAddress"
                keyboardType={"email-address"}
                onChangeText={(text) => handleEmailChange(text)}
                onSubmitEditing={() => focusOnElement(passwordRef)}
                left={
                  <TextInput.Icon color={colors.appNameColor} name="mail" />
                }
                selectionColor={colors.inputSelectionColor}
                onFocus={() => setenabledKB(false)}
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
                onFocus={() => setenabledKB(true)}
                returnKeyType="done"
                left={
                  <TextInput.Icon
                    color={
                      passwordError.length > 0
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
                    color={"#457b9d"}
                  />
                }
              />
              <Text style={styles.passwordErrorText}>
                {passwordError.length > 0 && passwordError.map((err) => err)}
              </Text>
            </View>
            <View style={[styles.inputGroup, { marginTop: 30 }]}>
              <Button
                loading={isLoading}
                disabled={isLoading}
                onPress={signUpButtonPressed}
                mode="contained"
                uppercase={false}
                color={colors.buttonBackGroundPrimaryColor}
                contentStyle={{ height: 54 }}
              >
                <Text style={styles.primaryButtonText}>
                  {isLoading
                    ? IMLocalized("signUpButtonLoaderText")
                    : IMLocalized("signUpButtonText")}
                </Text>
              </Button>
            </View>
            <View style={styles.centredView}>
              <Text style={styles.smallCentredText}>
                {IMLocalized("alreadyHaveAccount")}
                <Text
                  onPress={() => navigation.navigate("LoginScreen")}
                  style={{ fontWeight: "bold", color: "#343a40" }}
                >
                  {IMLocalized("signInHere")}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    fontSize: 26,
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
    fontSize: 15,
    marginLeft: 1,
    color: colors.errorTextColor,
  },
});
