import React, { useState, useEffect } from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { IMLocalized } from "config/IMLocalized";
import { Avatar } from "react-native-paper";
import Constants from "expo-constants";
import colors from "res/colors";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
const ProfilePicturePickerScreen = ({ navigation, route }) => {
  let gender = null;
  gender = route.params ? route.params.gender : null;
  const [pictureFile, setPictureFile] = useState(null);
  const avatarPressed = () => {
    PickImage();
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(IMLocalized("accessDenied"));
        }
      }
    })();
  }, []);
  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.4,
    });
    console.log(result);

    if (!result.cancelled) {
      setPictureFile(result);
    }
  };

  const nextClicked = () => {
    if (pictureFile && pictureFile.uri) {
      navigation.navigate("NationalityPickerScreen", {
        profilePicture: pictureFile,
        gender,
      });
    }
  };
  const stepSkipped = () => {
    console.log("Picture Profile Step Was Skipped");
    navigation.navigate("NationalityPickerScreen", {
      profilePicture: null,
      gender,
    });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text onPress={stepSkipped} style={styles.headerText}>
          {IMLocalized("skip")}
        </Text>
      </View>
      <View style={styles.screenTitle}>
        <Text style={styles.screenTitleText}>
          {IMLocalized("editProfileHeaderTitle1")}
        </Text>
        <Text style={styles.screenTitleText}>
          {IMLocalized("editProfileHeaderTitle2")}
        </Text>
      </View>
      <TouchableWithoutFeedback onPress={avatarPressed}>
        <View style={styles.imageCard}>
          <Avatar.Image
            source={
              pictureFile
                ? { uri: pictureFile.uri }
                : gender === "FEMALE"
                ? require("../../assets/female_user_100px.png")
                : require("../../assets/male_user_100px.png")
            }
            style={styles.avatar}
            size={(3 * Dimensions.get("screen").width) / 5}
          />
          <LinearGradient
            style={styles.hint}
            colors={["#2667ff", "#87bfff"]}
            end={[0, 1]}
            start={[0, 0]}
          >
            <Text style={styles.hintText}>
              {pictureFile === null
                ? IMLocalized("tapBellow")
                : IMLocalized("nicePicture")}
            </Text>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
      {pictureFile && pictureFile.uri && (
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            position: "absolute",
            bottom: 50,
          }}
        >
          <TouchableWithoutFeedback onPress={nextClicked}>
            <LinearGradient
              style={{
                height: 64,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                shadowOpacity: 0.5,
                shadowRadius: 10,
                shadowOffset: {
                  height: 15,
                  width: 15,
                },
              }}
              colors={["#edf2f4", "#e5e5e5"]}
              end={[0, 0]}
              start={[0, 1]}
            >
              <Text style={[styles.textButton, { color: "#212529" }]}>
                {IMLocalized("continue")}
              </Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};

export default ProfilePicturePickerScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
  },
  header: {
    paddingVertical: 0,
  },
  headerText: {
    marginTop: 8,
    alignSelf: "flex-end",
    fontSize: 22,
    fontWeight: "500",
    color: colors.lightGray,
  },
  screenTitle: {
    marginTop: 10,
    marginLeft: 10,
  },
  screenTitleText: {
    fontWeight: "800",
    fontSize: 36,
  },
  imageCard: {
    marginTop: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: (4 * Dimensions.get("screen").width) / 5,
    width: (4 * Dimensions.get("screen").width) / 5,
    alignSelf: "center",
    borderRadius: 10,
    shadowRadius: 10,
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 0.2,
  },
  avatar: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 3,
  },
  hint: {
    position: "absolute",
    top: -20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "gray",
    borderRadius: 8,
  },
  hintText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.roseWhite,
  },
  textButton: {
    fontSize: 18,
    fontWeight: "700",
  },
});
