import React from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "res/colors";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import { SharedElement } from "react-navigation-shared-element";

const PoiDetailScreen = ({ navigation, route }) => {
  const { item } = route?.params;
  return (
    <View style={{ flex: 1 }}>
      <SharedElement
        id={`item.${item.id}.cover`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <ImageBackground
          blurRadius={20}
          source={{ uri: item.cover }}
          resizeMethod="auto"
          resizeMode="cover"
          style={styles.background}
        >
          <Icon
            size={40}
            name="chevron-back-outline"
            onPress={navigation.goBack}
            style={{
              borderRadius: 20,
              backgroundColor: colors.deviderColor,
              width: 42,
              overflow: "hidden",
              marginLeft: 15,
            }}
          ></Icon>
        </ImageBackground>
      </SharedElement>
    </View>
  );
};

PoiDetailScreen.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.id}.cover`,
      animation: "move",
      resize: "auto",
      align: "auto",
    },
  ];
};

export default PoiDetailScreen;

const styles = StyleSheet.create({
  background: {
    height: Dimensions.get("screen").height,
    width: "100%",
    paddingTop: Constants.statusBarHeight,
  },
});
