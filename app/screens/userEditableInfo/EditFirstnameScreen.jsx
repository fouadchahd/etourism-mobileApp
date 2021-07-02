import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import colors from "res/colors";
import { IMLocalized } from "config/IMLocalized";

import AuthContext from "../../contexts/AuthContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { setCredentials } from "services/credentials";
import { updateFirstnameToDB } from "services/account.service";
const EditFirstnameScreen = ({ navigation, route }) => {
  let oldFirstname = route?.params?.firstName ? route.params.firstName : null;
  const [newFirstName, setNewFirstName] = useState(oldFirstname);
  const [hasUnsavedChanges, sethasUnsavedChanges] = useState(false);
  const [forcedToGoBack, setForcedToGoBack] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const { authToken, setAuthToken } = useContext(AuthContext);
  useEffect(() => {
    if (forcedToGoBack === true) navigation.goBack();
  }, [forcedToGoBack]);
  const updateAuthTokenFirstname = async () => {
    let newInfo = authToken.data;
    newInfo.firstName = newFirstName;
    setisLoading(true);
    let Ok = await setCredentials({ ...authToken, data: newInfo });
    let result = await updateFirstnameToDB(authToken.data.id, newFirstName);
    if (result.status === 200 && Ok === true) {
      setForcedToGoBack(true);
    }
    setisLoading(false);
  };
  const handlechange = (text) => {
    setNewFirstName(text);
    if (text !== oldFirstname && text.length > 0) {
      sethasUnsavedChanges(true);
    } else {
      sethasUnsavedChanges(false);
    }
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableWithoutFeedback onPress={updateAuthTokenFirstname}>
            {isLoading ? (
              <ActivityIndicator
                color="##999999"
                marginRight={20}
                size="small"
              />
            ) : (
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
            )}
          </TouchableWithoutFeedback>
        );
      },
    });
  }, [navigation, newFirstName, isLoading, hasUnsavedChanges]);
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
            },
          ]
        );
      }),
    [navigation, hasUnsavedChanges, forcedToGoBack]
  );
  return (
    <View style={{ padding: 20, flex: 1, backgroundColor: "white" }}>
      <Text style={{ fontWeight: "700", color: colors.black }}>
        {IMLocalized("newValue")} :
      </Text>
      <TextInput
        selectionColor={colors.softBlue}
        value={newFirstName}
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
        placeholder={IMLocalized("firstNameLabel")}
      ></TextInput>
    </View>
  );
};

export default EditFirstnameScreen;

const styles = StyleSheet.create({
  rightBtn: {
    fontSize: 17,
    fontWeight: "600",
    marginRight: 18,
  },
});
