import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { IMLocalized } from "../../config/IMLocalized";
import colors from "res/colors";
import * as Animatable from "react-native-animatable";

const GenderChoiceScreen = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const maleSelected = () => {
    setSelectedGender("MALE");
  };
  const femaleSelected = () => {
    setSelectedGender("FEMALE");
  };
  const getGradient = () => {
    if (selectedGender == null) return ["#99d98c", "#52b69a"];
    if (selectedGender === "MALE") return ["#90e0ef", "#2f6690"];
    if (selectedGender === "FEMALE") return ["#ffafcc", "#ff5d8f"];
  };
  let view;
  const handleViewRef = (ref) => (view = ref);
  const shake = () =>
    view
      .shake(1000)
      .then((endState) =>
        console.log(endState.finished ? "shake finished" : "shake cancelled")
      );

  const nextClicked = () => {
    if (selectedGender === null) shake();
    else {
      navigation.navigate("ProfilePicturePickerScreen", {
        gender: selectedGender,
      });
    }
  };
  return (
    <LinearGradient style={styles.screen} colors={getGradient()}>
      <Animatable.View style={styles.container} ref={handleViewRef}>
        <TouchableOpacity
          style={
            selectedGender && selectedGender === "MALE"
              ? styles.selected_card
              : styles.card
          }
          onPress={maleSelected}
        >
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>👨‍🦱</Text>
            <Text style={styles.genderText}>{IMLocalized("genderMale")}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            selectedGender && selectedGender === "FEMALE"
              ? styles.selected_card
              : styles.card
          }
          onPress={femaleSelected}
        >
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>👩</Text>
            <Text style={styles.genderText}>{IMLocalized("genderFemale")}</Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
      <View style={{ width: "90%", position: "absolute", bottom: 50 }}>
        <TouchableWithoutFeedback onPress={nextClicked}>
          <LinearGradient
            style={{
              height: 64,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            colors={["#edf2f4", "#fffff9"]}
          >
            <Text
              style={[
                styles.textButton,
                { color: selectedGender == null ? "#adb5bd" : "#212529" },
              ]}
            >
              {IMLocalized("continue")}
            </Text>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
    </LinearGradient>
  );
};

export default GenderChoiceScreen;

const screen_horizontal_padding = 10;
const PADDIND_BETWEEN_CARDS = 10;
const CARD_WIDTH =
  (Dimensions.get("screen").width - screen_horizontal_padding * 2) / 2 -
  PADDIND_BETWEEN_CARDS;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingHorizontal: screen_horizontal_padding,
  },
  container: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    transform: [{ translateY: "-50%" }],
  },
  card: {
    height: CARD_WIDTH / 1.3,
    width: CARD_WIDTH / 1.3,
    justifyContent: "center",
    borderRadius: 7,
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  selected_card: {
    height: CARD_WIDTH / 1.3,
    width: CARD_WIDTH / 1.3,
    justifyContent: "center",
    borderRadius: 7,
    backgroundColor: "white",
    shadowColor: colors.primaryBlue,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    transform: [{ scale: 1.3 }],
  },
  emoji: {
    fontSize: 55,
    alignSelf: "center",
  },
  emojiContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  genderText: {
    marginTop: 8,
    fontSize: 25,
  },
  textButton: {
    fontSize: 18,
    fontWeight: "700",
  },
});
