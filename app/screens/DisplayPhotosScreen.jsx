import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

function Slide({ navigation, data }) {
  console.log("item", data);
  return (
    <View
      style={{
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: data.url }}
        resizeMode="contain"
        style={{ width: windowWidth, height: windowHeight * 0.9 }}
      ></Image>
    </View>
  );
}

const DisplayPhotosScreen = ({ navigation, route }) => {
  const imagesList = route?.params?.photo;
  return (
    <SafeAreaView style={styles.screenContainer}>
      <TouchableOpacity style={styles.backBtn}>
        <Icon
          size={30}
          name="chevron-back-outline"
          onPress={navigation.goBack}
          style={{
            borderRadius: 15,
            backgroundColor: "white",
            width: 32,
            height: 32,
            overflow: "hidden",
          }}
        ></Icon>
      </TouchableOpacity>
      <FlatList
        data={imagesList}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.alt}
        renderItem={({ item, navigation }) => {
          return <Slide navigation={navigation} data={item} />;
        }}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default DisplayPhotosScreen;

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: "gray" },
  backBtn: { marginLeft: 10, marginTop: 10 },
});
