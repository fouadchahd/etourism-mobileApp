import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import images from "res/images";
import { IMLocalized, init } from "../config/IMLocalized";

const SplashScreen = ({ navigation }) => {
  init();
  const { colors } = useTheme();

  return (
    <LinearGradient style={styles.container} colors={["#99d98c", "#52b69a"]}>
      <StatusBar backgroundColor="#009387" barStyle="dark-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="2500"
          source={images.plan_ur_trip}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig"
      >
        <View>
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            {IMLocalized("SplashScreenTitle")}
            <Text style={{ marginLeft: 2, color: "#1e6091" }}>
              {IMLocalized("appName")}
            </Text>
          </Text>
          <Text style={styles.text}>{IMLocalized("mediumLorem")}</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <LinearGradient
              colors={["#99d98c", "#52b69a"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>
                {IMLocalized("getStartedText")}
              </Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </LinearGradient>
  );
};

export default SplashScreen;

const { height, width } = Dimensions.get("screen");
const height_logo = height * 0.28;
const width_logo = width * 0.88;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#99d98c",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: width_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 33,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
  },
  signIn: {
    width: 150,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  textSign: {
    color: "#d8f3dc",
    fontSize: 16,
    fontWeight: "bold",
  },
});
