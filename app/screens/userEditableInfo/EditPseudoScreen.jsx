import React from "react";
import { StyleSheet, Text, View } from "react-native";
import palettes from "res/palettes";
const EditPseudoScreen = () => {
  return (
    <View style={[palettes.screen, { flex: 1, backgroundColor: "white" }]}>
      <Text>EditPseudoScreen</Text>
    </View>
  );
};

export default EditPseudoScreen;

const styles = StyleSheet.create({});
