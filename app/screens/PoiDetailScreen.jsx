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
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { SharedElement } from "react-navigation-shared-element";

const { width, height } = Dimensions.get("screen");
const UPPER_IMAGE_WIDTH = width;
const UPPER_IMAGE_HEIGHT = width * 0.9;

const PoiDetailScreen = ({ navigation, route }) => {
  const { item } = route?.params;
  return (
    <ScrollView>
      <View>
        <Image source={{ uri: item?.photo[0]?.url }}></Image>
      </View>
      <View style={styles.stickyHeader}>
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
        <MaterialIcon size={40} name={"favorite"}></MaterialIcon>
      </View>
    </ScrollView>
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
  stickyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "12",
  },
});
