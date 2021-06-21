import React from "react";
import { init, IMLocalized } from "../config/IMLocalized";
import { Image, ImageBackground, Text, StyleSheet, View } from "react-native";
import images from "res/images";
const WelcomeScreen = () => {
  init();
  return element;
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  loginbtn: {
    height: 70,
    width: "100%",
    backgroundColor: "tomato",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  signupbtn: {
    height: 70,
    width: "100%",
    backgroundColor: "green",
  },
  logo: {
    backgroundColor: "black",
    height: 100,
    width: 100,
    position: "absolute",
    top: "10%",
  },
});
const element = (
  <ImageBackground
    blurRadius={10}
    resizeMode="cover"
    source={images.wallpaper}
    style={styles.background}
  >
    <Image style={styles.logo} source={images.splash} />
    <View style={styles.loginbtn}>
      <Text style={{ fontSize: 20, margin: "auto" }}>
        {IMLocalized("apptitle")}
      </Text>
    </View>
    <View style={styles.signupbtn}></View>
  </ImageBackground>
);
export default WelcomeScreen;
