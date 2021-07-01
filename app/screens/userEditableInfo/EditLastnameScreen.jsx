import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import colors from "res/colors";
import { IMLocalized } from "config/IMLocalized";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { setCredentials } from "services/credentials";
const EditLastnameScreen = ({ navigation, route }) => {
  let oldLastname = route?.params?.lastName ? route.params.lastName : null;
  const [newLastName, setNewLastName] = useState(oldLastname);
  const [hasUnsavedChanges, sethasUnsavedChanges] = useState(false);
  const [forcedToGoBack, setForcedToGoBack] = useState(false);
  const { authToken, setAuthToken } = useContext(AuthContext);
  useEffect(() => {
    if (forcedToGoBack === true) navigation.goBack();
  }, [forcedToGoBack]);
  //let forcedToGoBack = false;
  const updateAuthTokenLastname = async () => {
    let newInfo = authToken.data;
    newInfo.lastName = newLastName;

    let result = await setCredentials({ ...authToken, data: newInfo });
    if (result === true) {
      setForcedToGoBack(true);
    }
  };
  const handlechange = (text) => {
    setNewLastName(text);
    if (text !== oldLastname && text.length > 0) {
      sethasUnsavedChanges(true);
    } else {
      sethasUnsavedChanges(false);
    }
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableWithoutFeedback onPress={updateAuthTokenLastname}>
          <Text
            style={[
              styles.rightBtn,
              {
                color: hasUnsavedChanges
                  ? colors.skyblue
                  : colors.underlayColor,
              },
            ]}
          >
            Done
          </Text>
        </TouchableWithoutFeedback>
      ),
    });
  }, [navigation, newLastName, hasUnsavedChanges]);
  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!hasUnsavedChanges || (hasUnsavedChanges && forcedToGoBack)) {
          // If we don't have unsaved changes, then we don't need to do anything
          //forcedToGoBack means that we submited the new value before going back
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          IMLocalized("alertDiscardChangesTitle"),
          IMLocalized("alertDiscardChangesText"),
          [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Leave",
              style: "destructive",
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
              //              onPress: () => navigation.navigate("EditProfileScreen"),
            },
          ]
        );
      }),
    [navigation, hasUnsavedChanges, forcedToGoBack]
  );
  return (
    <View style={{ padding: 20, flex: 1, backgroundColor: "white" }}>
      <Text style={{ fontWeight: "700", color: colors.black }}>
        {IMLocalized("newValue")} :{" "}
      </Text>
      <TextInput
        value={newLastName}
        enablesReturnKeyAutomatically
        returnKeyType={"done"}
        onSubmitEditing={() =>
          console.log("submited", Boolean(hasUnsavedChanges))
        }
        onChangeText={handlechange}
        numberOfLines={1}
        maxLength={255}
        style={{
          height: 40,
          borderBottomWidth: 0.5,
          borderBottomColor: "gray",
          color: colors.facebookColor,
          opacity: 0.8,
          fontSize: 15,
        }}
        placeholder={IMLocalized("lastNameLabel")}
      ></TextInput>
    </View>
  );
};

export default EditLastnameScreen;

const styles = StyleSheet.create({
  rightBtn: {
    fontSize: 17,
    fontWeight: "600",
    marginRight: 10,
  },
});
